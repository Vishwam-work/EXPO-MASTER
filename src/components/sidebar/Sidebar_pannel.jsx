import React from 'react'
import '../../style/sidebar/sidebar.scss'
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Link ,useNavigate,useLocation,NavLink } from 'react-router-dom';

import { useState,useEffect } from 'react';
const Sidebar_pannel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');
  // useEffect(() => {
  //   // Extract the setting from the current route and update the selected option
  //   const setting = location.pathname.split('/setting/')[1];
  //   console.log('------------::::',setting)
  //   setSelectedOption(setting || '');
  // }, [location.pathname]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue || '');
    if (selectedValue) {
    navigate(`/setting/${selectedValue.toLowerCase()}`);
  };
}
  console.log(selectedOption)
  return (
    <div className='sidebar'>
      <div className="top">
      <Link to="/" style={{textDecoration:"none"}}>
        <span className='logo'>EXPOMASTER</span>
      </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <li className={location.pathname === '/' ? 'active-link' : ''}>
          <Link  to="/" style={{textDecoration:"none"}}  >

            <HomeIcon  className='icon'/>
            <span>Home</span>
          </Link>
          </li>
          <p className="title">Purchase Order</p>
          <li className={location.pathname === '/purchaseorder' ? 'active-link' : ''}>
          <Link  to="/purchaseorder" style={{textDecoration:"none"}}  >
            
            <ArticleIcon className='icon' />
            <span>Perchase Order</span>
          </Link>
          </li>
          <p className="title">Porforma</p>
          <li className={location.pathname === '/performa' ? 'active-link' : ''}>
          <Link  to="/performa" style={{textDecoration:"none"}}  >
            
            <RequestPageIcon className='icon' />
            <span>Porforma</span>
          </Link>
          </li>
          <p className="title">Invoice</p>
          <li className={location.pathname === '/invoice' ? 'active-link' : ''}>
          <Link  to="/invoice" style={{textDecoration:"none"}}  >
            
            <SummarizeIcon className='icon' />
            <span>Invoice</span>
          </Link>
          </li>

          <p className="title">BL Draft</p>
          <li className={location.pathname === '/bldraft' ? 'active-link' : ''}>
          <Link  to="/bldraft" style={{textDecoration:"none"}}  >
            
            <FilePresentIcon className='icon' />
            <span>BL Draft</span>
          </Link>
          </li>

          <p className="title">Packing List</p>
          <li className={location.pathname === '/packinglist' ? 'active-link' : ''}>
          <Link  to="/packinglist" style={{textDecoration:"none"}}  >
            
            <InventoryIcon className='icon' />
            <span>Packing List</span>
          </Link>
          </li>

          {/* <p className="title">User Pannel</p>
          <li>
            <PersonIcon className='icon' />
            <span>User</span>
          </li>
          <p className="title">Documentation</p>
          <li>
            <SummarizeIcon className='icon' />
            <span>Report</span>
          </li> */}
          <p className="title">Master Setting</p>

          <li>
            <SettingsIcon className='icon' />
            <select  className="form-control" name="master" value={selectedOption} onChange={handleSelectChange}>
              <option value=''disabled>Master Setting</option>
              <option value="Port">Port</option>
              <option value="Consignee">Consignee</option>
              <option value="Buyers">Buyers</option>
              <option value="Notify">Notify</option>
              <option value="Documents">Documents</option>
              <option value="Material">Material</option>
              <option value="Package">Package</option>
              <option value="PaymentTerms">PaymentTerms</option>
              <option value="ShipmentTerm">ShipmentTerm</option>
              <option value="Product">Product</option>
            </select>
          </li>
            {/* {
              selectedOption &&(
                <Link to={`/setting/${selectedOption.toLowerCase()}`} style={{ textDecoration: 'none' }} >
                  <span>Go</span>
                  </Link>
              )
            } */}
        </ul>
      </div>

      {/* Theme pannel */}
      {/* <div className="bottom">Theme</div> */}
    </div>

  )
}
export default Sidebar_pannel