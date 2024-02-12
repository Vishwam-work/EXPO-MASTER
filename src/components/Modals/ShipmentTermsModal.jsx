import React from 'react'
import { useState, useRef } from 'react'
import '../../style/modal/portmodal.scss'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export default function ShipmentTermsModal() {


    const [show, setShow] = useState(false);
    const [newOption, setNewOption] = useState('');

    const [message, setMessage] = useState('');
    const [shipment, setShipment] = useState('');



    const handleClose = () => {
        setShow(false);
        window.location.reload();
        setNewOption('');
    };
    



    const handleShow = () => setShow(true);
    const handleAddOption = () => {
        const newOption = `${shipment}-${message}`;

        if (newOption.trim() !== '') {
            // onAddOption(newOption); // Call the callback to add the new option to the main page state
            var shipmentterm_data = { shipment, message }
            console.log('ShipmentTerm data:', shipmentterm_data);
            axios.post('http://127.0.0.1:8000/expo/shipmentterm_add/', shipmentterm_data)
                .then(response => {
                    console.log('API response:', response.data);

                    handleClose();
                })
                .catch(error => {
                
                    console.log(error)
                    handleClose();
                })
        };
    }


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                +
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h2>Add ShipmentTerm</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <label>
                        Name of ShipmentTerm:
                        <input type="text" name="port" className="form-control" value={shipment} onChange={(e) => setShipment(e.target.value)} />
                    </label>
                    <div className="div">

                    <label style={{width:"100%"}}>
                        Term:
                        <textarea
                        
                        className='form-control'
                        name="message"
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        />
                    </label>
                        </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddOption}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}
