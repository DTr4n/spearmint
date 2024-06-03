from django.db import models


class Account(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    plaid_account_id = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Transaction(models.Model):
    account = models.ForeignKey(Account, related_name='transactions', on_delete=models.CASCADE)
    date = models.DateField()
    name = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100)
    plaid_transaction_id = models.CharField(max_length=100)
    # TODO: Notes field
    # TODO: Pending transactions in the future

    def __str__(self):
        return f"{self.name} - {self.amount}"