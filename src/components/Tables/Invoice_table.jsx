import React from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { Button } from 'react-bootstrap';
import { useState,useEffect } from 'react';
export default function Invoice_table() {
    const [invoice, setinvoice] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [showModal, setShowModal] = useState(false);
  const [selectedinvoice, setSelectedinvoice] = useState(null);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/expo/getinvoice/')
      .then((response) => {
        setinvoice(response.data);
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

  if (error && invoice==null) {
    return <div>Error: {error.message}</div>;
  }

  if (!invoice) {
    return null;
  }
  const handleViewClick = (rowData) => {
    setSelectedinvoice(rowData);
    setShowModal(true);
  };
  return (
    // <h1 style={{ color: "#3E4AB6", fontSize: "28px", marginBottom: "50px"}}>invoice table</h1>
    <Table striped bordered hover size="sm">
      <thead className="thead-dark">
        <tr>
         <th>invoiceno</th>
         <th>invociedate</th>
         <th>custname</th>
         <th>product</th>
         <th>Amount</th>
         




          <th>Action</th>
        </tr>

        



      </thead>
      <tbody>
        {
       invoice.map((rowData, rowIndex) => (
        <tr key={rowIndex}>
          <td>{rowData.invoiceno}</td>
          <td>{rowData.invociedate}</td>
          <td>{rowData.custname}</td>
          <td>{rowData.product}</td>
          <td>{rowData.Amount}</td>
          <td>
              {/* <Link to={`/view/${rowData.Pino}`}><Button variant='primary'>View</Button></Link> */}
              <Button variant='primary' onClick={() => handleViewClick(rowData)}>View</Button>
              {showModal && (
                <PorformaView porforma={selectedinvoice} onHide={() => setShowModal(false)} />
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
