import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
export default function PorformaView({ porforma, onHide }) {
    

  if (!porforma) return null;
  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>View Porform : {porforma.porforno}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Display porforma details here */}
        <p><b>Pino: </b> {porforma.porforno}</p>
        <p><b>Date: </b> {porforma.porfordate}</p>
          <p><b>Consignee:</b> {porforma.custname}</p>
          <p><b>Country:</b> {porforma.custcountry}</p>
          <p><b>Port:</b> {porforma.quantity}</p>
          <p><b>Product:</b> {porforma.product}</p>
        {/* Add more details as needed */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
