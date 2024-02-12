import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { Button } from 'react-bootstrap';

function Port_table(){
    const [port,setPort] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/expo/sendPortdata/')
        .then((response)=>{
            setPort(response.data);
            setLoading(false)
            console.log('-----------',port)
        })
        .catch((error)=>{
            setError(error);
            setLoading(false)
        })
    },[])
    if (loading){
        return <h3>Loading...</h3>;
    }
    if (error && port === null){
        return <div>Error:<h4>{error.message}</h4></div>;
    }
    if(!port){
        return null;
    }
    return (
        <Table striped bordered hover size="lg">
      <thead className="thead-dark">
        <tr>
          {
          Object.keys(port[0]).map((item, index) => (
            <th style={{textAlign:'center'}}>{item}</th>
          ))
          }
          <th style={{textAlign:'center'}}>Action</th>
        </tr>

      </thead>
      <tbody>
        {
       port.map((rowData, rowIndex) => (
        <tr style={{textAlign:'center'}} key={rowIndex}>
          <td style={{fontSize:'1.5rem'}}>{rowData.port}</td>
          <td style={{fontSize:'1.5rem'}}>{rowData.country}</td>
    
          <td  style={{display:"flex",justifyContent:"space-evenly"}}>
              
              <Link to={`/port/update/${rowData.Pino}`}><Button variant='primary'>Update</Button></Link>
              <Link to={`/port/delete/${rowData.port}`}><Button variant='danger'>Delete</Button></Link>
            </td>
        </tr>
        ))
      }
      </tbody>
    </Table>
    )
}

export default Port_table