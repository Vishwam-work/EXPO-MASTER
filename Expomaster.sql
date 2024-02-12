Create Database Expomaster;
show Databases;
USE expomaster;
show tables; 
SET SQL_SAFE_UPDATES =0;
-- Selection of the table  
select * from expo_port;
select * from expo_documents;
select * from expo_shipmentterms;
select * from expo_paymentterms;
select * from expo_porformadocument;
select * from expo_customer;	
select * from expo_consignee;
select * from expo_buyername;
select * from expo_notifyname; 
select * from expo_commonname;
select * from expo_material;
select * from expo_products;
select * from expo_analysis;
select * from expo_invoice;
select * from expo_purchaseorderdoc;
select * from expo_bldraft;
ALTER TABLE expo_purchaseorderdoc AUTO_INCREMENT  1;
DELETE FROM expo_purchaseorderdoc WHERE purno = 'SB 2023/59';
Drop table expo_purchaseorder;
ALTER TABLE expo_purchaseorder
drop column id;
-- ADD id  ;

Alter Table expo_porformadocument
Add Amount double;
ALTER TABLE expo_porformadocument
drop column Amount;

UPDATE expo_porformadocument SET Amount = 17700 WHERE porforno='PI202357486';


insert into expo_documents (DocumentName)
Values("Shipment Order") 
