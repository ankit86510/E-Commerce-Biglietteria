import Layout from '../../componenti/Layout'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import {  deleteClienteById } from '../../azioni';

/**
* @author
* @function Clienti
**/

const Clienti = (props) => {
    const Clienti = useSelector(state => state.clienti);

    const dispatch = useDispatch();
    console.log(Clienti);


    const renderClienti = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {Clienti.clienti.length > 0
                        ? Clienti.clienti.map((cliente, index) => (
                            <tr key={cliente._id}>
                                <td>{index+1}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.cognome}</td>
                                <td>{cliente.email}</td>
                                {/* <td>
                                    <button
                                        onClick={() => {
                                            const payload = {
                                                IdCliente: cliente._id,
                                            };
                                            dispatch(deleteClienteById(payload));
                                        }}
                                    >
                                        del
                                    </button>
                                </td> */}
                            </tr>
                        ))
                        : null}
                </tbody>
            </Table>
        );
    };

    return (
        <>
            <Layout sidebar>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h3>Lista Clienti</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>{renderClienti()}</Col>
                    </Row>
                </Container>
            </Layout>
        </>
    )
}
export default Clienti