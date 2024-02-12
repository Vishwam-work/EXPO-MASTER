import React from 'react'


import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/invocie/invoice.scss'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Sidebar_pannel from '../../components/sidebar/Sidebar_pannel'
import Navbar from '../../components/navbar/Navbar-screen'
import Performa_widgets from '../widgets/Performa_widgets';

import { Link } from 'react-router-dom';
import Bl_table from '../../components/Tables/Bl_table';



export default function Bldraft() {
  return (
    <div className='invoice-head'>
    <Sidebar_pannel />
    <div className="invoicecontainer">
      <Navbar />
      <div className="widget">
        <Performa_widgets type="Purchase_order" />
        <Performa_widgets type="Porforma" />
        <Performa_widgets type="Invoice" />
        <Performa_widgets type="BL_draft" />
      </div>
      <div className="maincontainer">
        <h1 style={{ color: "#3E4AB6", fontSize: "28px", marginBottom: "50px" }}>BL Draft</h1>
        <Link to="/bldraft/blform" style={{ textDecoration: "none" }}>
          {/* <span style={{ border: "2px solid #3E4AB6", padding: "5px", borderRadius: "10px", marginBottom: "50px", color: "white", background: "lightgreen", fontSize: "1.2rem", fontWeight: "600" }}>Add New</span> */}
        <Button variant='success'>Add New</Button>
        </Link>

      </div>
      <div className="tablecontainer">
      <Bl_table/>
     
      </div>
    </div>
  </div>
  )
}
