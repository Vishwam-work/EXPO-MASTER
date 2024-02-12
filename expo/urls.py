from  django.urls import path
from . import views
urlpatterns=[

# counter


    path('countPurchase/', views.countPurchase, name='countPurchase'),
    path('countPorforma/', views.countPorforma, name='countPorforma'),
    path('countInvoice/', views.countInvoice, name='countInvoice'),
    path('countBLdraft/', views.countBLdraft, name='countBLdraft'),


# performa
    path('porformadoc/', views.porformadoc, name='porformadoc'),
    path('getperforma/', views.getperforma, name='getperforma'),
# purchase order
    path('purchase_order_doc/', views.purchase_order_doc, name='purchase_order_doc'),
    path('getpurchaseorder/', views.getpurchaseorder, name='getpurchaseorder'),
    path('prnoonly/', views.prnoonly, name='prnoonly'),
    
    
    path('purnoonly/', views.purnoonly, name='purnoonly'),
    path('invoiceonly/', views.invoiceonly, name='invoiceonly'),
    path('blonly/', views.blonly, name='blonly'),

# invoice
    path('invoicedoc/', views.invoicedoc, name='invoicedoc'),
    path('getinvoice/', views.getinvoice, name='getinvoice'),

#  bldraft
    path('bldraft/', views.bldraft, name='bldraft'),
    path('getbldraft/', views.getbldraft, name='getbldraft'),

    path('consigneeadd/', views.consigneeadd, name='consigneeadd'),
    path('buyernameadd/', views.buyernameadd, name='buyernameadd'),
    path('notifyadd/', views.notifyadd, name='notifyadd'),

    path('getconsigneenameonly/', views.getconsigneenameonly, name='getconsigneenameonly'),
    path('getbuyernameonly/', views.getbuyernameonly, name='getbuyernameonly'),
    path('getnotifynameonly/', views.getnotifynameonly, name='getnotifynameonly'),

    path('savecustomerdetail/', views.savecustomerdetail, name='savecustomerdetail'),
    path('customernameonly/', views.customernameonly, name='customernameonly'),
    path('get_customer_details/<str:customer_name>/', views.get_customer_details, name='get_customer_details'),
    path('get_purchase_details/<str:purno>/', views.get_purchase_details, name='get_purchase_details'),
    path('get_porforma_details/<str:porforno>/', views.get_porforma_details, name='get_porforma_details'),
    path('get_invocie_detail/<str:invoiceno>/', views.get_invocie_detail, name='get_invocie_detail'),
    path('get_all_details/<str:blno>/', views.get_all_details, name='get_all_details'),



    path('sendcommonname/', views.sendcommonname, name='sendcommonname'),

    path('port_add/', views.port_add, name='port_add'),
    path('sendPortdata/',views.sendPortdata,name='sendPortdata'),

    path('documentadd/',views.documentadd,name='documentadd'),
    path('sendDocdata/',views.sendDocdata,name='sendDocdata'),

    path('shipmentterm_add/',views.shipmentterm_add,name='shipmentterm_add'),
    path('sendshipmentTerm/',views.sendshipmentTerm,name='sendshipmentTerm'),

    path('paymentterm_add/',views.paymentterm_add,name='paymentterm_add'),
    path('sendpaymentTerm/',views.sendpaymentTerm,name='sendpaymentTerm'),

    path('product_add/',views.product_add,name='product_add'),
    path('sendproductname/',views.sendproductname,name='sendproductname'),

    path('package_add/',views.package_add,name='package_add'),
    path('sendpackagename/',views.sendpackagename,name='sendpackagename'),

    path('material_add/',views.material_add,name='material_add'),
    path('sendmaterialname/',views.sendmaterialname,name='sendmaterialname'),

    # analysis
    # path('get_analysis_data/<str:month>/<str:year>/',views.get_analysis_data,name='get_analysis_data'),
    path('get_analysis_data/',views.get_analysis_data,name='get_analysis_data'),



    
]