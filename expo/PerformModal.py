from django.db import models

# name, date, buyerOrder, orderdate, Consignee, country, state, port, precarriage, vessel,
# receiptcarrier, salesBroker, currency, countryload, countrydis,conversion, bank, document, shipment, 
# shipmentterm, paymentterm,product,packages,material,
# quantity, price, totalPrice, unit, netweight, grossweight, packagetype, qualityspec

class Performa(models.Model):
    Pino = models.CharField(max_length=100,primary_key=True)
    Date = models.DateField()
    Buyerorder = models.CharField(max_length=256)
    Orderdate = models.DateTimeField()
    Consignee = models.CharField(max_length=256)
    Notify = models.CharField(max_length=256)
    Buyername = models.CharField(max_length=256)
    Country = models.CharField(max_length=30)
    State = models.CharField(max_length=30)
    PortName = models.CharField(max_length=100)
    PreCarriage = models.CharField(max_length=256)
    Vessel = models.CharField(max_length=256)
    ReceiptCarrier = models.CharField(max_length=256)
    SalesBroker = models.CharField(max_length=256)
    Currency = models.CharField(max_length=30)
    CountryLoad = models.CharField(max_length=30)
    CountryDis = models.CharField(max_length=30)
    Conversion = models.DecimalField(decimal_places=4, max_digits=8)
    Bank = models.CharField(max_length=256)
    DocumentName = models.CharField(max_length=100)
    ShipmentPeriod = models.CharField(max_length=100)
    shipmentname = models.CharField(max_length=100)
    paymentname = models.CharField(max_length=100)
    productname = models.CharField(max_length=100)
    packagename = models.CharField(max_length=100)
    materialname = models.CharField(max_length=100)
    Quantity = models.IntegerField()
    Price = models.FloatField()
    Totalprice = models.FloatField()
    Unit = models.CharField(max_length=100)
    NetWeight = models.FloatField()
    GrossWeight = models.FloatField()
    Packagetype = models.CharField(max_length=100)
    QualitySpecification = models.CharField(max_length=100)


    
    

