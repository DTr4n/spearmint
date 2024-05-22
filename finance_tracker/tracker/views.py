from django.conf import settings
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import plaid
from plaid.api import plaid_api
from plaid.model.products import Products
from plaid.model.country_code import CountryCode
from plaid.model.link_token_create_request import LinkTokenCreateRequest
from plaid.model.link_token_create_request_user import LinkTokenCreateRequestUser


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

@csrf_exempt
def get_access_token(request):
    if request.method == 'POST':
        public_token = request.POST.get('public_token')
        exchange_response = client.Item.public_token.exchange(public_token)
        access_token = exchange_response['access_token']
        return JsonResponse({'access_token': access_token})
