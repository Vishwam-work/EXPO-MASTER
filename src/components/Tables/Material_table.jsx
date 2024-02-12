import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { Button } from 'react-bootstrap';

function Material_table(){
    const [material,setmaterial] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/expo/sendmaterialname/')
        .then((response)=>{
            setmaterial(response.data);
            setLoading(false)
            console.log('-----------',material)
        })
        .catch((error)=>{
            setError(error);
            setLoading(false)
        })
    },[])
    if (loading){
        return <h3>Loading...</h3>;
    }
    if (error && material === null){
        return <div>Error:<h4>{error.message}</h4></div>;
    }
    if(!material){
        return null;
    }
    return (
        <Table striped bordered hover size="lg">
      <thead className="thead-dark">
        <tr>
          {
          Object.keys(material[0]).map((item, index) => (
            <th style={{textAlign:'center'}}>{item}</th>
          ))
          }
          <th style={{textAlign:'center'}}>Action</th>
        </tr>

      </thead>
      <tbody>
        {
       material.map((rowData, rowIndex) => (
        <tr style={{textAlign:'center'}} key={rowIndex}>
          <td style={{fontSize:'1.5rem'}}>{rowData.material}</td>
          <td style={{fontSize:'1.5rem'}}>{rowData.matterm}</td>
    
          <td  style={{display:"flex",justifyContent:"space-evenly"}}>
              <Link to={`/material/view/${rowData.material}`}><Button variant='primary'>View</Button></Link>
              {/* <Link to={`/update/${rowData.Pino}`}><Button variant='info'>Update</Button></Link> */}
              <Link to={`/material/delete/${rowData.material}`}><Button variant='danger'>Delete</Button></Link>
            </td>
        </tr>
        ))
      }
      </tbody>
    </Table>
    )
}

export default Material_table