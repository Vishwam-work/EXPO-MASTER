import React from 'react'
import { useState, useRef } from 'react'
import '../../style/modal/portmodal.scss'
import CountryData from '../countryJson/cs.json'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios';

export default function CustomerDetails() {

    const [show, setShow] = useState(false);
    const [newOption, setNewOption] = useState('');

    const [customername, setCustomerName] = useState('');
    const [customeradd, setCustomerAdd] = useState('');
    const [customercountry, setCustomerCountry] = useState('');
    const [bankname, setcustomerBank] = useState('');

    

    const handleClose = () => {
        setShow(false);
        // window.location.reload();
        setNewOption('');
    };
    function handleCountry(e) {
        const getcountryname = e.target.options[e.target.selectedIndex].getAttribute("name");
        setCustomerCountry(getcountryname)
    }
    const handleShow = () => setShow(true);
    const handleAddOption = () => {
        const newOption = customername;

        if (newOption.trim() !== '') {
            // onAddOption(newOption); // Call the callback to add the new option to the main page state

            var customer_detail = { customername,customeradd,customercountry,bankname }
            
            console.log('Customer data:', customer_detail);
            
            axios.post('http://127.0.0.1:8000/expo/savecustomerdetail/', customer_detail)
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
                    <Modal.Title><h2>Add Customer Details</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>
                        Name of Customer:
                        <input type="text" name="cons" className="form-control" value={customername} onChange={(e) => setCustomerName(e.target.value)}/>
                    </label>
                    <label>
                        Customer Address:
                        <input type="text" name="cons" className="form-control" value={customeradd} onChange={(e) => setCustomerAdd(e.target.value)}/>
                    </label>
                    <label>
                        Bank Name:
                        <input type="text" name="cons" className="form-control" value={bankname} onChange={(e) => setcustomerBank(e.target.value)}/>
                    </label>
                    {
                        <label>
                            Country
                            <select name="country" className="form-control" onChange={(e) => { handleCountry(e) }} >
                                <option> --Select the country -- </option>
                                {
                                    CountryData.map((getcountry, index) => (
                                        <option name={getcountry.country_name} value={getcountry.country_id} key={index}>{getcountry.country_name}</option>
                                    ))

                                }
                            </select>
                        </label>}

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
