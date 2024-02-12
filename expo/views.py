import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Port,Documents,ShipmentTerms,PaymentTerms,Products,Packages,Material,CommonName
from .NewPorforma import PorformaDocument
from django.views.decorators.http import require_GET

from .PurchaseOrderDoc import PurchaseOrderDoc
from .Bldraftmodal import Bldraft

from .InvoiceModal import Invoice
from .ConsigneeModal import Consignee
from .NotifyModal import NotifyName
from .BuyernameModal import Buyername

from .CustomerDetails import Customer

from .Analysis import Analysis

# Counter of each document

def countPurchase(request):
    purchase_count = PurchaseOrderDoc.objects.count()
    return JsonResponse({'purchase_count': purchase_count})
def countPorforma(request):
    porforma_count = PorformaDocument.objects.count()
    return JsonResponse({'porforma_count': porforma_count})
def countInvoice(request):
    invoicedoc_count = Invoice.objects.count()
    return JsonResponse({'INVOICE_COUNT': invoicedoc_count})
def countBLdraft(request):
    bldraft_doc = Bldraft.objects.count()
    return JsonResponse({'blcount': bldraft_doc})

# purchase Order
@csrf_exempt
def purchase_order_doc(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if(data):
            purchase=PurchaseOrderDoc(
                purno = data['pono'],
                ponodate = data['ponodate'],
                custname = data['customername'],
                custadd = data['customeradd'],
                custbank = data['customerbank'],
                custcountry = data['customercountry'],
                currency = data['currency'],
                product = data['product'],
                quantity = data['quantity'],
                unit = data['unit'],
                rate = data['rate'],
                rateunit = data['rateunit'],
                shipmentterm = data['shipmentterm'],
                paymentterm = data['paymentterm'],
                totalbag = data['totalbag'],
                documents = data['documents'],
                countryload = data['countryload'],
                countrydis = data['countrydis'],
                portload = data['portload'],
                portdis=data['portdis'],
                packaging=data['packaging'],
                shipmentdate=data['shipmentdate']
            )
            purchase.save()
            return JsonResponse({"status": "success"}, status=201)
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({'error':'No Data'}, status=406)
def getpurchaseorder(request):
    pur=PurchaseOrderDoc.objects.all()
    purchase_data=[{
        "purno":i.purno,
        "ponodate":i.ponodate,
        "custname":i.custname,
        "product":i.product,
        "quantity":i.quantity,
        "totalbag":i.totalbag
    } for i in pur ]
    return JsonResponse(purchase_data, safe=False)
 
# Performa
@csrf_exempt
def porformadoc(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if(data):
            porforma=PorformaDocument(
                porforno=data['porformano'],
                porfordate=data['pordate'],
                purno = data['pono'],
                ponodate = data['ponodate'],
                custname = data['customername'],
                custadd = data['customeradd'],
                custbank = data['customerbank'],
                custcountry = data['customercountry'],
                currency = data['currency'],
                product = data['product'],
                quantity = data['quantity'],
                unit = data['unit'],
                rate = data['rate'],
                rateunit = data['rateunit'],
                shipmentterm = data['shipmentterm'],
                paymentterm = data['paymentterm'],
                totalbag = data['totalbag'],
                documents = data['documents'],
                countryload = data['countryload'],
                countrydis = data['countrydis'],
                portload = data['portload'],
                portdis=data['portdis'],
                packaging=data['packaging'],
                shipmentdate=data['shipmentdate'],
                Consignee=data['Consignee'],
                Notify=data['notify'],
                NetWeight=data['netweight'],
                GrossWeight=data['grossweight'],
                PreCarriage=data['precarriage'],
                SalesBroker=data['salesBroker'],
                Amount = data['amount']
            )
            porforma.save()
            return JsonResponse({"status": "success"}, status=201)
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({'error':'No Data'}, status=406)

def getperforma(request):
    pur=PorformaDocument.objects.all()
    purchase_data=[{
        "porforno":i.porforno,
        "porfordate":i.porfordate,
        "custname":i.custname,
        "custcountry":i.custcountry,
        "quantity":i.quantity,
        "product":i.product
    } for i in pur ]
    return JsonResponse(purchase_data, safe=False)



def getinvoice(request):
    inv = Invoice.objects.all()
    invoice_data=[{
        "invoiceno": i.invoiceno,
        "invociedate": i.invociedate,
        "porforno": i.porforno,
        "porfordate": i.porfordate,
        "purno": i.purno,
        "ponodate": i.ponodate,
        "ponodate": i.ponodate,
        'custname' : i.custname,
        "product": i.product,
        "Amount": i.Amount
    } for i in inv]
    return JsonResponse(invoice_data, safe=False)
def getbldraft(request):
    bld = Bldraft.objects.all()
    bld_data=[{
        'blno':i.blno,
        'bldate':i.bldate,
        "invoiceno": i.invoiceno,
        "invociedate": i.invociedate,
        "porforno": i.porforno,
        "porfordate": i.porfordate,
        "purno": i.purno,
        "ponodate": i.ponodate,
        "ponodate": i.ponodate,
        'custname' : i.custname,
        "product": i.product,
        "Amount": i.Amount
    } for i in bld]
    return JsonResponse(bld_data, safe=False)
# invoice
@csrf_exempt
def invoicedoc(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if(data):
            invdoc = Invoice(
                invoiceno = data['invoiceno'], 
                invociedate = data['invoicedate'], 
                porforno = data['porformano'], 
                porfordate = data['pordate'], 
                purno = data['pono'], 
                ponodate = data['ponodate'], 
                custname = data['customername'], 
                custadd = data['customeradd'], 
                custbank = data['customerbank'], 
                custcountry = data['customercountry'], 
                Consignee = data['Consignee'], 
                Notify = data['notify'], 
                currency = data['currency'], 
                product = data['product'], 
                quantity= data['quantity'], 
                unit = data['unit'], 
                rate = data['rate'], 
                rateunit = data['rateunit'], 
                shipmentterm = data['shipmentterm'], 
                paymentterm = data['paymentterm'], 
                totalbag = data['totalbag'], 
                documents= data['documents'], 
                countryload = data['countryload'], 
                countrydis = data['countrydis'], 
                portload = data['portload'], 
                portdis= data['portdis'], 
                shipmentdate = data['shipmentdate'], 
                packaging = data['packaging'], 
                NetWeight = data['netweight'],
                GrossWeight = data['grossweight'],
                PreCarriage = data['precarriage'], 
                SalesBroker = data['salesBroker'], 
                Amount = data['amount'], 
                container = data['container'],  
                csseal= data['csseal'], 
                sb= data['sb'], 
                bl= data['bl'], 
                advamount= data['advamount'],
                remaamount= data['remaamount'],
            )
            invdoc.save()
            return JsonResponse({"status": "success"}, status=201)
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({'error':'No Data'}, status=406)

@csrf_exempt
def bldraft(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if(data):
            bldrafting = Bldraft(
                blno = data['blno'],
                bldate=data['bldate'],
                invoiceno = data['invoiceno'], 
                invociedate = data['invoicedate'], 
                porforno = data['porformano'], 
                porfordate = data['pordate'], 
                purno = data['pono'], 
                ponodate = data['ponodate'], 
                custname = data['customername'], 
                custadd = data['customeradd'], 
                custbank = data['customerbank'], 
                custcountry = data['customercountry'], 
                Consignee = data['Consignee'], 
                Notify = data['notify'], 
                currency = data['currency'], 
                product = data['product'], 
                quantity= data['quantity'], 
                unit = data['unit'], 
                rate = data['rate'], 
                rateunit = data['rateunit'], 
                shipmentterm = data['shipmentterm'], 
                paymentterm = data['paymentterm'], 
                totalbag = data['totalbag'], 
                documents = data['documents'], 
                countryload = data['countryload'], 
                countrydis = data['countrydis'], 
                portload = data['portload'], 
                portdis= data['portdis'], 
                shipmentdate = data['shipmentdate'], 
                packaging = data['packaging'], 
                NetWeight = data['netweight'],
                GrossWeight = data['grossweight'],
                PreCarriage = data['precarriage'], 
                SalesBroker = data['salesBroker'], 
                Amount = data['amount'], 
                container = data['container'],  
                csseal= data['csseal'], 
                sb= data['sb'], 
                bl= data['bl'], 
                advamount= data['advamount'],
                remaamount= data['remaamount'],
            )
            bldrafting.save()
            return JsonResponse({"status": "success"}, status=201)
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({'error':'No Data'}, status=406)


@csrf_exempt
def port_add(request):
    if(request.method=='POST'):
        data = json.loads(request.body)
        port_name = data['port']
        country_name = data['country']
        print(port_name)
        print(country_name)
        if(port_name and country_name):
            port = Port(PortName=port_name,CountryName=country_name)
            port.save()
            return JsonResponse({'message': 'Port added successfully'})
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({"Error": "Method not supported"},status=405)
def sendPortdata(request):
    ports=Port.objects.all()
    port_data=[{'port': port.PortName, 'country': port.CountryName} for port in ports]
    print(ports)
    return JsonResponse(port_data, safe=False)

@csrf_exempt
def consigneeadd(request):
    if(request.method=='POST'):
        data = json.loads(request.body)
        consignname = data['consignee']
        print(consignname)
        if(consignname):
            cons = Consignee(Con_Name=consignname)
            common = CommonName(Names = consignname)
            common.save()
            cons.save()
            return JsonResponse({'message': 'Consignee added successfully'})
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({"Error": "Method not supported"},status=405)
@csrf_exempt
def buyernameadd(request):
    if(request.method=='POST'):
        data = json.loads(request.body)
        buyername = data['buyer']
        print(buyername)
        if(buyername):
            buyer = Buyername(Buyer_name=buyername)
            common = CommonName(Names = buyername)
            common.save()
            buyer.save()
            return JsonResponse({'message': 'Buyername added successfully'})
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({"Error": "Method not supported"},status=405)
@csrf_exempt
def notifyadd(request):
    if(request.method=='POST'):
        data = json.loads(request.body)
        Notifyname = data['Notify']
        print(Notifyname)
        if(Notifyname):
            Noti = NotifyName(Notify_name=Notifyname)
            common = CommonName(Names = Notifyname)
            common.save()
            Noti.save()
            return JsonResponse({'message': 'Notifyname added successfully'})
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({"Error": "Method not supported"},status=405)


def sendcommonname(request):
    common=CommonName.objects.all()
    commonNames=[{'Names': c.Names} for c in common]
    print(commonNames)
    return JsonResponse(commonNames, safe=False)
@csrf_exempt
def documentadd(request):
    if(request.method=='POST'):
        data = json.loads(request.body)
        document_name = data['document']

        print(document_name)
    
        if(document_name):
            docs = Documents(DocumentName=document_name)
            docs.save()
            return JsonResponse({'message': 'Documents added successfully'})
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({"Error": "Method not supported"},status=405)
def sendDocdata(request):
    docs=Documents.objects.all()
    docs_data=[{'document': doc.DocumentName} for doc in docs]
    print(docs_data)
    return JsonResponse(docs_data, safe=False)

def getconsigneenameonly(request):
    consignee=Consignee.objects.all()
    consignee_data=[{'id': c.ConId,'name':c.Con_Name} for c in consignee]
    print(consignee_data)
    return JsonResponse(consignee_data, safe=False)

def getbuyernameonly(request):
    Buyer=Buyername.objects.all()
    Buyer_data=[{'id': c.BuyId,'name':c.Buyer_name} for c in Buyer]
    print(Buyer_data)
    return JsonResponse(Buyer_data, safe=False)

def getnotifynameonly(request):
    Notify=NotifyName.objects.all()
    Notify_data=[{'id': c.NotiKey,'name':c.Notify_name} for c in Notify]
    print(Notify_data)
    return JsonResponse(Notify_data, safe=False)



@csrf_exempt
def shipmentterm_add(request):
    if(request.method=='POST'):
        data = json.loads(request.body)
        shipment=data['shipment']
        message = data['message']
        print(shipment)
        print(message)
        
        if(shipment and message):
            shipmentTerm = ShipmentTerms(shipmentname=shipment,term=message)
            shipmentTerm.save()
            return JsonResponse({'message': 'Shipment Term added successfully'})
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({"Error": "Method not supported"},status=405)

def sendshipmentTerm(request):
    ship=ShipmentTerms.objects.all()
    ship_data=[{'shipment': s.shipmentname,'term':s.term} for s in ship]
    print(ship_data)
    return JsonResponse(ship_data, safe=False)

@csrf_exempt
def paymentterm_add(request):
    if(request.method=='POST'):
        data = json.loads(request.body)
        payment=data['payment']
        message = data['messagepay']
        print(payment)
        print(message)

        if(payment and message):
            payment_term = PaymentTerms(paymentname=payment,term=message)
            payment_term.save()
            return JsonResponse({'message': 'Shipment Term added successfully'})
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({"Error": "Method not supported"},status=405)
def sendpaymentTerm(request):
    pay=PaymentTerms.objects.all()
    pay_data=[{'payment': p.paymentname,'term':p.term} for p in pay]
    print(pay_data)
    return JsonResponse(pay_data, safe=False)

@csrf_exempt
def product_add(request):
    if(request.method=='POST'):
        data = json.loads(request.body)
        product=data['product']
        messagepro = data['messagepro']
        print(product)
        print(messagepro)

        if(product and messagepro):
            product_terms = Products(productname=product,pro_term=messagepro)
            product_terms.save()
            return JsonResponse({'message': 'product Term added successfully'})
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({"Error": "Method not supported"},status=405)
def sendproductname(request):
    pro=Products.objects.all()
    pro_data=[{'product': p.productname} for p in pro]
    print(pro_data)
    return JsonResponse(pro_data, safe=False)

@csrf_exempt
def package_add(request):
    if(request.method=='POST'):
        data = json.loads(request.body)
        packages=data['packages']
        messagepackage = data['messagepackage']
        print(packages)
        print(messagepackage)

        if(packages and messagepackage):
            packages_terms = Packages(packagename=packages,pack_term=messagepackage)
            packages_terms.save()
            return JsonResponse({'message': 'Package Term added successfully'})
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({"Error": "Method not supported"},status=405)
def sendpackagename(request):
    pack=Packages.objects.all()
    pack_data=[{'packages': p.packagename} for p in pack]
    print(pack_data)
    return JsonResponse(pack_data, safe=False)

@csrf_exempt
def material_add(request):
    if(request.method=='POST'):
        data = json.loads(request.body)
        material=data['material']
        messagematerial = data['messagematerial']
        print(material)
        print(messagematerial)

        if(material and messagematerial):
            material_term = Material(materialname=material,mat_term=messagematerial)
            material_term.save()
            return JsonResponse({'message': 'Material Term added successfully'})
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({"Error": "Method not supported"},status=405)
def sendmaterialname(request):
    mat=Material.objects.all()
    material_data=[{'material': p.materialname,'matterm':p.mat_term} for p in mat]
    print(material_data)
    return JsonResponse(material_data, safe=False)

@csrf_exempt
def savecustomerdetail(request):
    if(request.method=='POST'):
        data = json.loads(request.body)
        customername=data['customername']
        customeradd=data['customeradd']
        customercountry=data['customercountry']
        bankname=data['bankname']
        if(customeradd and customername and customercountry and bankname):
            customer_detail = Customer(
                customer_name=customername,
                customer_address=customeradd,
                customer_bank=bankname,
                customer_country=customercountry
            )
            customer_detail.save()
            return JsonResponse({'message': 'Customer Detail Term added successfully'})
        else:
            return JsonResponse({'error': 'Invalid data'}, status=400)
    else:
        return JsonResponse({"Error": "Method not supported"},status=405)

def customernameonly(request):
    mat=Customer.objects.all()
    customer_name=[{'customer_name': p.customer_name} for p in mat]
    print(customer_name)
    return JsonResponse(customer_name, safe=False)
def prnoonly(request):
    mat=PurchaseOrderDoc.objects.all()
    purnoo=[{'prno': p.purno} for p in mat]
    print(purnoo)
    return JsonResponse(purnoo, safe=False)


def purnoonly(request):
    mat=PorformaDocument.objects.all()
    porforno=[{'porforno': p.porforno} for p in mat]
    print(porforno)
    return JsonResponse(porforno, safe=False)
def invoiceonly(request):
    mat=Invoice.objects.all()
    invoiceno=[{'invoiceno': p.invoiceno} for p in mat]
    print(invoiceno)
    return JsonResponse(invoiceno, safe=False)
def blonly(request):
    mat=Bldraft.objects.all()
    blno_data=[{'blno': p.blno} for p in mat]
    print(blno_data)
    return JsonResponse(blno_data, safe=False)

@csrf_exempt
def get_customer_details(request, customer_name):
    try:
        customer = Customer.objects.get(customer_name=customer_name)
        data = {
            'customer_address': customer.customer_address,
            'customer_bank': customer.customer_bank,
            'customer_country': customer.customer_country,
        }
        print("Customer:",data)
        return JsonResponse(data,safe=False)
    except Customer.DoesNotExist:
        return JsonResponse({'error': 'Purchase Order not found'}, status=404)

   

# get_purchase_details
@csrf_exempt
def get_purchase_details(request,purno):
    try:
        purchase = PurchaseOrderDoc.objects.get(purno=purno)
    
        data = {
                "purno": purchase.purno ,
                "ponodate": purchase.ponodate ,
                "custname": purchase.custname ,
                "custadd": purchase.custadd ,
                "custbank": purchase.custbank ,
                "custcountr": purchase.custcountry,
                "currency": purchase.currency,
                "product": purchase.product,
                "quantity": purchase.quantity,
                "unit": purchase.unit,
                "rate": purchase.rate,
                "rateunit": purchase.rateunit,
                "shipmentte": purchase.shipmentterm,
                "paymentter": purchase.paymentterm,
                "totalbag": purchase.totalbag,
                "documents": purchase.documents,
                "countryloa": purchase.countryload,
                "countrydis": purchase.countrydis,
                "portload": purchase.portload,
                "portdi": purchase.portdis,
                'shipmentdate':purchase.shipmentdate,
                'packaging':purchase.packaging,
             
        }
        print("PurchaseDetails:",data)
        return JsonResponse(data,safe=False)
    except PurchaseOrderDoc.DoesNotExist:
        return JsonResponse({'error': 'Purchase Order not found'}, status=404)

@csrf_exempt
def get_porforma_details(request,porforno):
    try:
        porforma = PorformaDocument.objects.get(porforno=porforno)
    
        data = {
                "porforno": porforma.porforno,
                "porfordate": porforma.porfordate,
                "purno": porforma.purno,
                "ponodate": porforma.ponodate,
                "custname": porforma.custname,
                "custadd": porforma.custadd,
                "custbank": porforma.custbank,
                "custcountry": porforma.custcountry,
                "currency": porforma.currency,
                "product": porforma.product,
                "quantity": porforma.quantity,
                "unit": porforma.unit,
                "rate": porforma.rate,
                "rateunit": porforma.rateunit,
                "shipmentterm": porforma.shipmentterm,
                "paymentterm": porforma.paymentterm,
                "totalbag": porforma.totalbag,
                "document": porforma.documents,
                "countryload": porforma.countryload,
                "countrydis": porforma.countrydis,
                "portload": porforma.portload,
                "portdis": porforma.portdis,
                "packaging": porforma.packaging,
                "shipmentdate": porforma.shipmentdate,
                "Consignee": porforma.Consignee,
                "Notify": porforma.Notify,
                "NetWeight": porforma.NetWeight,
                "GrossWeight": porforma.GrossWeight,
                "PreCarriage": porforma.PreCarriage,
                "SalesBroker": porforma.SalesBroker,
                "Amount": porforma.Amount
                
             
        }
        print("porformaDetails:",data)
        return JsonResponse(data,safe=False)
    except PurchaseOrderDoc.DoesNotExist:
        return JsonResponse({'error': 'Purchase Order not found'}, status=404)



@csrf_exempt
def get_invocie_detail(request,invoiceno):
    try:
        invoice_detail = Invoice.objects.get(invoiceno=invoiceno)
    
        data = {
            "invoiceno" :invoice_detail.invoiceno,
            "invociedate" :invoice_detail.invociedate, 
            "porforno" :invoice_detail.porforno, 
            "porfordate" :invoice_detail.porfordate, 
            "purno" :invoice_detail.purno, 
            "ponodate" :invoice_detail.ponodate, 
            "custname" :invoice_detail.custname, 
            "custadd" :invoice_detail.custadd, 
            "custbank" :invoice_detail.custbank, 
            "custcountry" :invoice_detail.custcountry, 
            "Consignee" :invoice_detail.Consignee, 
            "Notify" :invoice_detail.Notify, 
            "currency" :invoice_detail.currency, 
            "product" :invoice_detail.product, 
            "quantity":invoice_detail.quantity, 
            "unit" :invoice_detail.unit, 
            "rate" :invoice_detail.rate, 
            "rateunit" :invoice_detail.rateunit, 
            "shipmentterm" :invoice_detail.shipmentterm, 
            "paymentterm" :invoice_detail.paymentterm, 
            "totalbag" :invoice_detail.totalbag, 
            "documents":invoice_detail.documents, 
            "countryload" :invoice_detail.countryload, 
            "countrydis" :invoice_detail.countrydis, 
            "portload" :invoice_detail.portload, 
            "portdis":invoice_detail.portdis, 
            "shipmentdate" :invoice_detail.shipmentdate, 
            "packaging" :invoice_detail.packaging, 
            "NetWeight" :invoice_detail.NetWeight,
            "GrossWeight" :invoice_detail.GrossWeight,
            "PreCarriage" :invoice_detail.PreCarriage, 
            "SalesBroker" :invoice_detail.SalesBroker, 
            "Amount" :invoice_detail.Amount, 
            "container" :invoice_detail.container,  
            "csseal":invoice_detail.csseal, 
            "sb":invoice_detail.sb, 
            "bl":invoice_detail.bl, 
            "advamount":invoice_detail.advamount,
            "remaamount":invoice_detail.remaamount,
               
                
             
        }
        print("invoicedetail:",data)
        return JsonResponse(data,safe=False)
    except Invoice.DoesNotExist:
        return JsonResponse({'error': 'Invoice not found'}, status=404)



 # Analysis

@csrf_exempt
def get_analysis_data(request):
    try:
        selected_month = request.GET.get('month')
        selected_year = request.GET.get('year')
        print(selected_month)
        print(selected_year)
        # Fetch data based on the selected month and year
        consignee_data = Analysis.objects.filter(Month=selected_month, YEAR=selected_year)

        # Calculate total amount for each consignee
        consignee_totals = {}
        for entry in consignee_data:
            consignee_name = entry.CONSIGNEE
            consignee_totals[consignee_name] = consignee_totals.get(consignee_name, 0) + entry.AMOUNT
        print(consignee_data)
        print(consignee_totals)
        return JsonResponse({'consignee_totals': consignee_totals})
    except Analysis.DoesNotExist:
        return JsonResponse({'error': 'Data not found'}, status=404)


@csrf_exempt
def get_all_details(request,blno):
    try:
        bld = Bldraft.objects.get(blno=blno)
        data = {
            "blno":bld.blno,
            "bldate":bld.bldate,
            "invoiceno" :bld.invoiceno,
            "invociedate" :bld.invociedate, 
            "porforno" :bld.porforno, 
            "porfordate" :bld.porfordate, 
            "purno" :bld.purno, 
            "ponodate" :bld.ponodate, 
            "custname" :bld.custname, 
            "custadd" :bld.custadd, 
            "custbank" :bld.custbank, 
            "custcountry" :bld.custcountry, 
            "Consignee" :bld.Consignee, 
            "Notify" :bld.Notify, 
            "currency" :bld.currency, 
            "product" :bld.product, 
            "quantity":bld.quantity, 
            "unit" :bld.unit, 
            "rate" :bld.rate, 
            "rateunit" :bld.rateunit, 
            "shipmentterm" :bld.shipmentterm, 
            "paymentterm" :bld.paymentterm, 
            "totalbag" :bld.totalbag, 
            "documents":bld.documents, 
            "countryload" :bld.countryload, 
            "countrydis" :bld.countrydis, 
            "portload" :bld.portload, 
            "portdis":bld.portdis, 
            "shipmentdate" :bld.shipmentdate, 
            "packaging" :bld.packaging, 
            "NetWeight" :bld.NetWeight,
            "GrossWeight" :bld.GrossWeight,
            "PreCarriage" :bld.PreCarriage, 
            "SalesBroker" :bld.SalesBroker, 
            "Amount" :bld.Amount, 
            "container" :bld.container,  
            "csseal":bld.csseal, 
            "sb":bld.sb, 
            "bl":bld.bl, 
            "advamount":bld.advamount,
            "remaamount":bld.remaamount,
               
                
             
        }
        print("bldraft:",data)
        return JsonResponse(data,safe=False)
    except Invoice.DoesNotExist:
        return JsonResponse({'error': 'Bldraft not found'}, status=404)
