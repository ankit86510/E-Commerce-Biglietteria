import Layout from '../../componenti/Layout'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import {
    addStadio,
    deleteStadioById,
} from '../../azioni';
import Input from '../../componenti/UI/input';
import DateTimePicker from 'react-datetime-picker';
import Modal from '../../componenti/UI/Modal'

/**
* @author
* @function Stadi
**/

const Stadi = (props) => {
    const Stadi = useSelector(state => state.stadi);
    const [nome, setNomeStadio] = useState('');
    const [citta, setCitta] = useState('');
    const [regione, setRegione] = useState('');
    const [totalePostiStadio, settotalePostiStadio] = useState('');
    const [descrizione, setDescrizoine] = useState('');
    const [ImmagineStadio, setImmagineStadio] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [stadioDetailModal, setStadioDetailModal] = useState(false);
    const [stadioDetails, setStadioDetails] = useState(null);


    const dispatch = useDispatch();


    const handleClose = () => {
        const form = new FormData();
        form.append('nome', nome);
        form.append('citta', citta);
        form.append('regione', regione);
        form.append('totalePostiStadio', totalePostiStadio);
        form.append('descrizione', descrizione);
        for (let pic of ImmagineStadio) {
            form.append("ImmagineStadio", pic);
        }

        dispatch(addStadio(form)).then(setModalShow(false));
    }
    const renderAddStadioModel = () => {
        return (
            <Modal
                handleClose={() => setModalShow(false)}
                onSubmit={handleClose}
                show={modalShow}
                modalTitle="Aggiungi nuovo Stadio"
            >
                <Row>
                    <Col sm={6} >
                        <Input
                            placeholder={"Nome Stadio"}
                            value={nome}
                            type="text"
                            onChange={(e) => setNomeStadio(e.target.value)}
                        />
                    </Col>

                    <Col sm={6} >
                        <Input
                            placeholder={"Citta"}
                            value={citta}
                            type="text"
                            onChange={(e) => setCitta(e.target.value)}
                        />

                    </Col>
                </Row>
                <Input
                    value={regione}
                    onChange={(e) => setRegione(e.target.value)}
                    placeholder={"Regione"}
                    type="text"
                />
                <Input
                    type="text"
                    pattern="[0-9]*"
                    placeholder={"Posti totali Stadio"}
                    value={totalePostiStadio}
                    onChange={(e) =>
                        settotalePostiStadio((v) => (e.target.validity.valid ? e.target.value : v))}
                />
                <Input
                    placeholder={"Descrione..."}
                    value={descrizione}
                    type="text"
                    onChange={(e) => setDescrizoine(e.target.value)}
                />
                <input type="file" name="ImmagineStadio" onChange={(e) => setImmagineStadio(e.target.files[0])} />
            </Modal>

        )
    }
    const renderStadi = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome Stadio</th>
                        <th>Citta</th>
                        <th>Regione </th>
                        <th>Totale Posti Stadio</th>
                        <th>Deascrizoine</th>
                    </tr>
                </thead>
                <tbody>
                    {Stadi.stadi.length > 0
                        ? Stadi.stadi.map((stadio, index) => (
                            <tr key={stadio._id}>
                                <td>{index+1}</td>
                                <td>{stadio.nome}</td>
                                <td>{stadio.citta}</td>
                                <td>{stadio.regione}</td>
                                <td>{stadio.totalePostiStadio}</td>
                                <td>{stadio.descrizione}</td>
                                <td>
                                    <button onClick={() => showStadioDetailsModal(stadio)}>
                                        info
                                    </button>
                                    <button
                                        onClick={() => {
                                            const payload = {
                                                IdStadio: stadio._id,
                                            };
                                            dispatch(deleteStadioById(payload));
                                        }}
                                    >
                                        del
                                    </button>
                                </td>
                            </tr>
                        ))
                        : null}
                </tbody>
            </Table>
        );
    };

    const showStadioDetailsModal = (stadio) => {
        setStadioDetails(stadio);
        setStadioDetailModal(true);
    };


    const renderStadioDetailsModal = () => {
        if (!stadioDetails) {
            return null;
        }

        return (
            <Modal
                onHide={() => setStadioDetailModal(false)}
                show={stadioDetailModal}
                handleClose={() => setStadioDetailModal(false)}
                modalTitle={"Dettagli Stadio"}
                size="lg"
            >
                <Row>
                    <Col md="6">
                        <label className="key">Nome</label>
                        <p className="value">{stadioDetails.nome}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Citta</label>
                        <p className="value">{stadioDetails.citta}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Regione</label>
                        <p className="value">{stadioDetails.regione}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Totale Posti Stadio</label>
                        <p className="value">{stadioDetails.totalePostiStadio}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key">Descrizione</label>
                        <p className="value">{stadioDetails.descrizione}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key">Immagine Stadio </label>
                        <div style={{ display: "flex" }}>
                            {stadioDetails.ImmagineStadio.map((picture) => (
                                <div className="productImgContainer">
                                    <img src={picture.img} alt="" />
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Modal>
        );
    };



    return (
        <>
            <Layout sidebar>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h3>Stadi</h3>
                                <button onClick={() => setModalShow(true)}>Aggiungi</button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>{renderStadi()}</Col>
                    </Row>
                </Container>
                {renderAddStadioModel()}
                {renderStadioDetailsModal()}
            </Layout>
        </>
    )

}
export default Stadi