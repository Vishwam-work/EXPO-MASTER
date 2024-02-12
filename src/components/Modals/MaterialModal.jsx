import React from 'react'
import { useState, useRef } from 'react'
import '../../style/modal/portmodal.scss'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export default function MaterialModal() {


    const [show, setShow] = useState(false);
    const [newOption, setNewOption] = useState('');

    const [messagematerial, setMessagematerial] = useState('');
    const [material, setMaterial] = useState('');



    const handleClose = () => {
        setShow(false);
        window.location.reload();
        setNewOption('');
    };
    



    const handleShow = () => setShow(true);
    const handleAddOption = () => {
        const newOption = `${material}-${messagematerial}`;

        if (newOption.trim() !== '') {
            // onAddOption(newOption); // Call the callback to add the new option to the main page state
            var meterial_data = { material, messagematerial }
            console.log('Material data:', meterial_data);
            axios.post('http://127.0.0.1:8000/expo/material_add/', meterial_data)
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
                    <Modal.Title><h2>Add Material</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <label>
                        Name of Material :
                        <input type="text" name="pro" className="form-control" value={material} onChange={(e) => setMaterial(e.target.value)} />
                    </label>
                    <div className="div">

                    <label style={{width:"100%"}}>
                        Material Discription:
                        <textarea
                        
                        className='form-control'
                        name="message"
                        value={messagematerial}
                        onChange={(e)=>setMessagematerial(e.target.value)}
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
