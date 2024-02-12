import React from 'react'
import { useState, useRef } from 'react'
import '../../style/modal/portmodal.scss'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export default function PaymentTermModal() {


    const [show, setShow] = useState(false);
    const [newOption, setNewOption] = useState('');

    const [messagepay, setMessagepay] = useState('');
    const [payment, setPayment] = useState('');



    const handleClose = () => {
        setShow(false);
        window.location.reload();
        setNewOption('');
    };
    



    const handleShow = () => setShow(true);
    const handleAddOption = () => {
        const newOption = `${payment}-${messagepay}`;

        if (newOption.trim() !== '') {
            // onAddOption(newOption); // Call the callback to add the new option to the main page state
            var paymentterm_data = { payment, messagepay }
            console.log('ShipmentTerm data:', paymentterm_data);
            axios.post('http://127.0.0.1:8000/expo/paymentterm_add/', paymentterm_data)
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
                    <Modal.Title><h2>Add Payment Terms</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <label>
                        Name of PaymentTerm :
                        <input type="text" name="pay" className="form-control" value={payment} onChange={(e) => setPayment(e.target.value)} />
                    </label>
                    <div className="div">

                    <label style={{width:"100%"}}>
                        Term:
                        <textarea
                        
                        className='form-control'
                        name="message"
                        value={messagepay}
                        onChange={(e)=>setMessagepay(e.target.value)}
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
