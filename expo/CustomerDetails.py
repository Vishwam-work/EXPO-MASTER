from django.db import models

class Customer(models.Model):
    customer_name = models.CharField(max_length=255)
    customer_address = models.CharField(max_length=255)
    customer_bank = models.CharField(max_length=255)
    customer_country = models.CharField(max_length=255)