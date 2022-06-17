import React from 'react'
import { Modal, Button } from 'react-bootstrap'

/**
* @author
* @function NewModal
**/

const NewModal = (props) => {
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={props.handleClose}
            show={props.show}
            onSubmit={props.onSubmit}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.modalTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                {props.buttons ? (
                    props.buttons.map((btn, index) => (
                        <Button key={index} variant={btn.color} onClick={btn.onClick}>
                            {btn.label}
                        </Button>
                    ))
                ) : (
                    <Button
                        variant="primary"
                        {...props}
                        style={{ backgroundColor: "#333" }}
                        className="btn-sm"
                        onClick={props.onSubmit}
                    >
                    Salva
                    </Button>
                )}
            </Modal.Footer>
            {/* <Modal.Footer>
                <Button onClick={props.handelClose} >Salva</Button>
            </Modal.Footer> */}
        </Modal>
    )

}
export default NewModal