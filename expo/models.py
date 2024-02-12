from django.db import models

# Create your models here.


class Port(models.Model):
    PortName = models.CharField(max_length=100)
    CountryName = models.CharField(max_length=100)

class Documents(models.Model):
    DocumentName = models.CharField(max_length=200)

class ShipmentTerms(models.Model):
    shipmentname = models.CharField(max_length=200)
    term = models.CharField(max_length=500)

class PaymentTerms(models.Model):
    paymentname = models.CharField(max_length=200)
    term = models.CharField(max_length=500)

class Products(models.Model):
    productname = models.CharField(max_length=200)
    pro_term = models.CharField(max_length=500)
    
class Packages(models.Model):
    packagename = models.CharField(max_length=200)
    pack_term = models.CharField(max_length=500)

class Material(models.Model):
    materialname = models.CharField(max_length=200)
    mat_term = models.CharField(max_length=500)
    

class CommonName(models.Model):
    Names = models.CharField(max_length=200)