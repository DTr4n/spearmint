from django.conf import settings
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
import plaid
from plaid.api import plaid_api
from plaid.model.products import Products
from plaid.model.country_code import CountryCode
from plaid.model.item_public_token_exchange_request import ItemPublicTokenExchangeRequest
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser
from plaid.model.transactions_sync_request import TransactionsSyncRequest
from .models import Account, Transaction


configuration = plaid.Configuration(
    host=plaid.Environment.Sandbox,
    api_key={
        'clientId': settings.PLAID_CLIENT_ID,
        'secret': settings.PLAID_SECRET,
    }
)

api_client = plaid.ApiClient(configuration)
client = plaid_api.PlaidApi(api_client)


def index(request):
    plaid_request = LinkTokenCreateRequest(
        products=[Products('transactions')],
        client_name="Spearmint",
        country_codes=[CountryCode('US')],
        language='en',
        user=LinkTokenCreateRequestUser(
            # This should correspond to a unique id for the current user.
            # Typically, this will be a user ID number from your application.
            # Personally identifiable information, such as an email address or phone number, should not be used here.
            # TODO: Come back to this
            client_user_id='unique_user_id'
        )
    )
    response = client.link_token_create(plaid_request)
    link_token = response['link_token']
    return render(request, 'tracker/index.html', {'link_token': link_token})

def get_access_token(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        public_token = data.get('public_token')
        if not public_token:
            return JsonResponse({'error': 'Public token is required'}, status=400)

        exchange_request = ItemPublicTokenExchangeRequest(public_token=public_token)
        exchange_response = client.item_public_token_exchange(exchange_request)
        access_token = exchange_response['access_token']
        # TODO: Save the access_token to the user's session or database??
        request.session['access_token'] = access_token
        return JsonResponse({'access_token': access_token})
    return JsonResponse({'error': 'Invalid request method'}, status=400)

def pretty_print_response(response):
    print(json.dumps(response, indent=2, sort_keys=True, default=str))

def get_transactions(request):
    # Set cursor to empty to receive all historical updates
    # TODO: Save the cursor
    cursor = ''

    # New transaction updates since "cursor"
    has_more = True
    try:
        # Iterate through each page of new transaction updates for item
        while has_more:
            sync_request = TransactionsSyncRequest(
                access_token=request.session.get('access_token'),
                cursor=cursor,
            )
            response = client.transactions_sync(sync_request).to_dict()

            # Save accounts
            for account in response['accounts']:
                Account.objects.update_or_create(
                    plaid_account_id=account['account_id'],
                    defaults={
                        'name': account['name'],
                        'type': account['type'],
                        # TODO: Keep track of available balance?
                        'balance': account['balances']['current'],
                    }
                )

            # Save transactions
            for transaction in response['added']:
                transaction_name = transaction['merchant_name']
                if not transaction['merchant_name']:
                    transaction_name = transaction['name']
                Transaction.objects.update_or_create(
                    plaid_transaction_id=transaction['transaction_id'],
                    defaults={
                        'account': Account.objects.get(plaid_account_id=transaction['account_id']),
                        'date': transaction['date'],
                        'name': transaction_name,
                        'amount': transaction['amount'],
                        'category': transaction['personal_finance_category']['primary'],
                    }
                )

            has_more = response['has_more']
            cursor = response['next_cursor']

        return JsonResponse({'message': 'Transactions and accounts fetched and saved successfully'})

    except plaid.ApiException as e:
    # TODO
    #     error_response = format_error(e)
    #     return jsonify(error_response)
        pass