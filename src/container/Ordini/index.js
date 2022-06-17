import Layout from '../../componenti/Layout'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { BiEuro } from "react-icons/bi";

// import {
//     deleteOrdineById,
// } from '../../azioni';

/**
* @author
* @function Ordini
**/

const Ordini = (props) => {

    const Ordini = useSelector(state => state.ordini);

    const dispatch = useDispatch();


    const renderOrdini = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Acquirente</th>
                        <th>Importo Totale Ordine</th>
                        <th>Biglietti Partita </th>
                        <th>N. Bigletti Acquistati</th>
                        <th>Prezzo Unitario Biglietto</th>
                    </tr>
                </thead>
                <tbody>
                    {Ordini.ordini.length > 0
                        ? Ordini.ordini.map((ordine, index) => (
                            <tr key={ordine._id}>
                                <td>{index+1}</td>
                                <td>{ordine.utente.nome} {ordine.utente.cognome}</td>
                                <td>{ordine.importoTotale} <BiEuro /></td>
                                <td>{ordine.biglietti.map((biglietto) => {
                                    return <tr key={biglietto._id}><td>{biglietto.IdPartita.squadra1} - {biglietto.IdPartita.squadra2}</td> </tr>
                                })}</td>
                                <td>{ordine.biglietti.map((biglietto) => {
                                    return <tr key={biglietto._id}><td>{biglietto.N_BigliettiAcquistati}</td> </tr>
                                })}</td>
                                <td>{ordine.biglietti.map((biglietto) => {
                                    return <tr key={biglietto._id}><td>{biglietto.PrezzoBiglietto} <BiEuro /></td> </tr>
                                })}</td>
                                {/* <td>
                                    <button
                                        onClick={() => {
                                            const payload = {
                                                // IdPartite: ordine.biglietti,
                                                IdOrdine: ordine._id,
                                            };
                                            console.log(payload)
                                            dispatch(deleteOrdineById(payload));
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
                                <h3>Ordini</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>{renderOrdini()}</Col>
                    </Row>
                </Container>
            </Layout>
        </>
    )

}
export default Ordini