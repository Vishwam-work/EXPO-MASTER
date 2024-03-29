import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { Button } from 'react-bootstrap';
import PorformaView from '../PageViewModal/PorformaView';
function Performa_table() {
  const [performa, setPerforma] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [showModal, setShowModal] = useState(false);
  const [selectedPerforma, setSelectedPerforma] = useState(null);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/expo/getperforma/')
      .then((response) => {
        setPerforma(response.data);
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

  if (error && performa==null) {
    return <div>Error: {error.message}</div>;
  }

  if (!performa) {
    return null;
  }
  const handleViewClick = (rowData) => {
    setSelectedPerforma(rowData);
    setShowModal(true);
  };
  return (
    // <h1 style={{ color: "#3E4AB6", fontSize: "28px", marginBottom: "50px"}}>Performa table</h1>
    <Table striped bordered hover size="sm">
      <thead className="thead-dark">
        <tr>
          {
          Object.keys(performa[0]).map((item, index) => (
            <th>{item}</th>
          ))
          }
          <th>Action</th>
        </tr>

      </thead>
      <tbody>
        {
       performa.map((rowData, rowIndex) => (
        <tr key={rowIndex}>
          <td>{rowData.porforno}</td>
          <td>{rowData.porfordate}</td>
          <td>{rowData.custname}</td>
          <td>{rowData.custcountry}</td>
          <td>{rowData.quantity}</td>
          <td>{rowData.product}</td>
          <td>
              {/* <Link to={`/view/${rowData.Pino}`}><Button variant='primary'>View</Button></Link> */}
              <Button variant='primary' onClick={() => handleViewClick(rowData)}>View</Button>
              {showModal && (
                <PorformaView porforma={selectedPerforma} onHide={() => setShowModal(false)} />
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
export default Performa_table