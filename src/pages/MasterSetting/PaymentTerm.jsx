import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/setting/setting.scss'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Sidebar_pannel from '../../components/sidebar/Sidebar_pannel'
import Navbar from '../../components/navbar/Navbar-screen'
import PaymentTermModal from '../../components/Modals/PaymentTermModal';
import PaymentTerm_table from '../../components/Tables/PaymentTerm_table';
const PaymentTerm=()=>{
    return(
    <div className='setting-head'>
      <Sidebar_pannel />
      <div className="settingcontainer">
        <Navbar />
        <div className="maincontainer">
        <h1 style={{ color: "#3E4AB6", fontSize: "28px", marginBottom: "20px" }}>PaymentTerm</h1>
        <div style={{marginBottom: "50px" }}>

        <span style={{ color: "#3E4AB6", fontSize: "28px", }}>Add PaymentTerm : <PaymentTermModal/></span>
        </div>
        <div className="tablecontainer">
      
          <PaymentTerm_table />
        </div>
        </div>
        </div>
       
    </div>
    )
}
export default PaymentTerm