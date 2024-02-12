import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { Button } from 'react-bootstrap';

function Consignee_table(){
    const [Consignee,setConsignee] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/expo/getconsigneenameonly/')
        .then((response)=>{
            setConsignee(response.data);
            setLoading(false)
            console.log('-----------',Consignee)
        })
        .catch((error)=>{
            setError(error);
            setLoading(false)
        })
    },[])
    if (loading){
        return <h3>Loading...</h3>;
    }
    if (error && Consignee === null){
        return <div>Error:<h4>{error.message}</h4></div>;
    }
    if(!Consignee){
        return null;
    }
    return (
        <Table striped bordered hover size="lg">
      <thead className="thead-dark">
        <tr>
          {
          Object.keys(Consignee[0]).map((item, index) => (
            <th style={{textAlign:'center'}}>{item}</th>
          ))
          }
          <th style={{textAlign:'center'}}>Action</th>
        </tr>

      </thead>
      <tbody>
        {
       Consignee.map((rowData, rowIndex) => (
        <tr style={{textAlign:'center'}} key={rowIndex}>
          <td style={{fontSize:'1.5rem'}}>{rowData.id}</td>
          <td style={{fontSize:'1.5rem'}}>{rowData.name}</td>
    
          <td  style={{display:"flex",justifyContent:"space-evenly"}}>
              <Link to={`/consignee/view/${rowData.id}`}><Button variant='primary'>View</Button></Link>
              {/* <Link to={`/update/${rowData.Pino}`}><Button variant='info'>Update</Button></Link> */}
              <Link to={`/consignee/delete/${rowData.id}`}><Button variant='danger'>Delete</Button></Link>
            </td>
        </tr>
        ))
      }
      </tbody>
    </Table>
    )
}

export default Consignee_table