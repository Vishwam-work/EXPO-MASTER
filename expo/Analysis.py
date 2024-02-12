from django.db import models

class Analysis(models.Model):
    """A model representing an analysis."""
    CONSIGNEE = models.CharField(max_length=255)
    Country=models.CharField(max_length=255)
    Port=models.CharField(max_length=255) 	
    Product=models.CharField(max_length=255) 	
    INVOICEDATE= models.DateField()
    Month=models.CharField(max_length=255) 	
    YEAR= models.IntegerField()
    TotalWeight	= models.FloatField()
    AMOUNT= models.FloatField()
 



