import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { Button } from 'react-bootstrap';
import PorformaView from '../PageViewModal/PorformaView';
function PurchaseOrderTable() {
  const [purchaseOrder, setpurchaseOrder] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [showModal, setShowModal] = useState(false);
  const [selectedpurchaseOrder, setSelectedpurchaseOrder] = useState(null);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/expo/getpurchaseorder/')
      .then((response) => {
        setpurchaseOrder(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading ) {
    return <div>Loading...</div>;
  }

  if (error && purchaseOrder==null) {
    return <div>Error: {error.message}</div>;
  }

  if (!purchaseOrder) {
    return null;
  }
  const handleViewClick = (rowData) => {
    setSelectedpurchaseOrder(rowData);
    setShowModal(true);
  };
  return (
    // <h1 style={{ color: "#3E4AB6", fontSize: "28px", marginBottom: "50px"}}>purchaseOrder table</h1>
    <Table striped bordered hover size="sm">
      <thead className="thead-dark">
        <tr>
          {
          Object.keys(purchaseOrder[0]).map((item, index) => (
            <th>{item}</th>
          ))
          }
          <th>Action</th>
        </tr>

      </thead>
      <tbody>
        {
       purchaseOrder.map((rowData, rowIndex) => (
        <tr key={rowIndex}>
          <td>{rowData.purno}</td>
          <td>{rowData.ponodate}</td>
          <td>{rowData.custname}</td>
          <td>{rowData.product}</td>
          <td>{rowData.quantity}</td>
          <td>{rowData.totalbag}</td>
         
          <td>
              {/* <Link to={`/view/${rowData.Pino}`}><Button variant='primary'>View</Button></Link> */}
              <Button variant='primary' onClick={() => handleViewClick(rowData)}>View</Button>
              {showModal && (
                <PorformaView porforma={selectedpurchaseOrder} onHide={() => setShowModal(false)} />
              )}
              <Link to={`/update/${rowData.Pino}`}><Button variant='success'>Pass</Button></Link>
              <Link to={`/delete/${rowData.Pino}`}><Button variant='danger'>Remove</Button></Link>
            </td>
        </tr>
        ))
      }
      </tbody>
    </Table>
  )
}
export default PurchaseOrderTable