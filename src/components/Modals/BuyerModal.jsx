import React from 'react'
import { useState, useRef } from 'react'
import '../../style/modal/portmodal.scss'
import CountryData from '../countryJson/cs.json'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export default function BuyerModal() {

    const [show, setShow] = useState(false);
    const [newOption, setNewOption] = useState('');

    const [buyer, setBuyer] = useState('');


    const handleClose = () => {
        setShow(false);
        window.location.reload();
        setNewOption('');
    };

    const handleShow = () => setShow(true);
    const handleAddOption = () => {
        const newOption = buyer;

        if (newOption.trim() !== '') {
            // onAddOption(newOption); // Call the callback to add the new option to the main page state
            var buyer_data = {buyer}
            console.log('Consignee data:', buyer_data);
            
            axios.post('http://127.0.0.1:8000/expo/buyernameadd/', buyer_data)
                .then(response => {
                    // Handle the response from the server

                    console.log('API response:', response.data);

                    handleClose();
                })
                .catch(error => {
                    // Handle any errors
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
                    <Modal.Title><h2>Add BuyerName</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>
                        Name of Buyer:
                        <input type="text" name="cons" className="form-control" value={buyer} onChange={(e) => setBuyer(e.target.value)}/>
                    </label>

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
