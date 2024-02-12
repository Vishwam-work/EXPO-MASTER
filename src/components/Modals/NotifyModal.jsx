import React from 'react'
import { useState, useRef } from 'react'
import '../../style/modal/portmodal.scss'
import CountryData from '../countryJson/cs.json'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export default function NotifyModal() {

    const [show, setShow] = useState(false);
    const [newOption, setNewOption] = useState('');

    const [Notify, setNotify] = useState('');


    const handleClose = () => {
        setShow(false);
        window.location.reload();
        setNewOption('');
    };

    const handleShow = () => setShow(true);
    const handleAddOption = () => {
        const newOption = Notify;

        if (newOption.trim() !== '') {
            // onAddOption(newOption); // Call the callback to add the new option to the main page state
            var consignee_data = {Notify}
            console.log('Consignee data:', consignee_data);
            
            axios.post('http://127.0.0.1:8000/expo/notifyadd/', consignee_data)
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
                    <Modal.Title><h2>Add Nootify</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>
                        Name of Notify:
                        <input type="text" name="cons" className="form-control" value={Notify} onChange={(e) => setNotify(e.target.value)}/>
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
