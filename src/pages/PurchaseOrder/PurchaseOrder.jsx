import React from "react";
import Sidebar_pannel from "../../components/sidebar/Sidebar_pannel";

import '../../style/purchaseorrder/purchaseorder.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "../../components/navbar/Navbar-screen";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Link} from 'react-router-dom'
import PurchaseOrderTable from "../../components/Tables/PurchaseOrderTable";
import Performa_widgets from "../widgets/Performa_widgets";
function PurchaseOrder() {
  return (
    <div className="purchase-head">
       <Sidebar_pannel />
      <div className="purchasecontainer">
        <Navbar />
        <div className="widget">
        <Performa_widgets type="Purchase_order" />
          <Performa_widgets type="Porforma" />
          <Performa_widgets type="Invoice" />
          <Performa_widgets type="BL_draft" />
        </div>
        <div className="maincontainer">
          <h1 style={{ color: "#3E4AB6", fontSize: "28px", marginBottom: "50px" }}>Purchase Order</h1>
          <Link to="/purchaseorder/purchaseform" style={{ textDecoration: "none" }}>
            {/* <span style={{ border: "2px solid #3E4AB6", padding: "5px", borderRadius: "10px", marginBottom: "50px", color: "white", background: "lightgreen", fontSize: "1.2rem", fontWeight: "600" }}>Add New</span> */}
          <Button variant='success'>Add New</Button>
          </Link>

        </div>
        <div className="tablecontainer">
      
          <PurchaseOrderTable />
        </div>
      </div>
    </div>
  );
}
export default PurchaseOrder;
