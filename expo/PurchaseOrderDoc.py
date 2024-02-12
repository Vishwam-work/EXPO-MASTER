from django.db import models

class PurchaseOrderDoc(models.Model):
    "Purchase Order"
    purno = models.CharField(max_length=100,primary_key=True)
    ponodate = models.DateField(blank=True, null=True)
    custname = models.CharField(max_length=256)
    custadd = models.CharField(max_length=256)
    custbank = models.CharField(max_length=256)
    custcountry = models.CharField(max_length=256)
    currency = models.CharField(max_length=256)
    product = models.CharField(max_length=256)
    quantity= models.CharField(max_length=256)
    unit = models.CharField(max_length=256)
    rate = models.CharField(max_length=256)
    rateunit = models.CharField(max_length=256)
    shipmentterm = models.CharField(max_length=256)
    paymentterm = models.CharField(max_length=256)
    totalbag = models.IntegerField()
    documents= models.CharField(max_length=256)
    countryload = models.CharField(max_length=256)
    countrydis = models.CharField(max_length=256)
    portload = models.CharField(max_length=256)
    portdis= models.CharField(max_length=256)
    shipmentdate = models.CharField(max_length=256,blank=True)
    packaging = models.CharField(max_length=256,blank=True)
