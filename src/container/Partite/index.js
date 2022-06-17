import Layout from '../../componenti/Layout'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { createCategoryList, deletePartitaById } from '../../azioni';
import { addPartita } from '../../azioni';
import Input from '../../componenti/UI/input';
import DateTimePicker from 'react-datetime-picker';
import Modal from '../../componenti/UI/Modal'



/**
* @author
* @function Partite
**/

const Partite = (props) => {

    const Categorie = useSelector(state => state.categorie);
    const Stadi = useSelector(state => state.stadi);
    const Partite = useSelector(state => state.partite);
    const [squadra1, setSquadra1] = useState('');
    const [squadra2, setSquadra2] = useState('');
    const [dataOraPartita, onChange] = useState(new Date());
    const [prezzoBigliettoPartita, setPrezzoBigliettoPartita] = useState('');
    const [descrizione, setDescrizoine] = useState('');
    const [idstadio, setIdStadio] = useState('');
    const [categoria, setCategoria] = useState('');
    const [ImmaginePartita, setPartitaImage] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [partitaDetailModal, setPartitaDetailModal] = useState(false);
    const [partitaDetails, setPartitaDetails] = useState(null);

    const dispatch = useDispatch();

    const handleClose = () => {
        const form = new FormData();
        form.append('squadra1', squadra1);
        form.append('squadra2', squadra2);
        form.append('dataOraPartita', dataOraPartita);
        form.append('prezzoBigliettoPartita', prezzoBigliettoPartita);
        form.append('IdStadio', idstadio);
        form.append('descrizione', descrizione);
        form.append('categoria', categoria);

        for (let pic of ImmaginePartita) {
            console.log(typeof (pic))
            form.append("ImmaginePartita", pic);
        }
        // else {
        //     setPartitaImage([...ImmaginePartita, new File(decodeURI(immagine))]);
        //     console.log(ImmaginePartita[0])
        //     form.append("ImmaginePartita", ImmaginePartita[0]);
        // }
        setSquadra1('');
        setSquadra2('');
        setPrezzoBigliettoPartita('');
        setIdStadio('');
        setCategoria('');
        setPartitaImage([]);
        setDescrizoine('')


        dispatch(addPartita(form)).then(setModalShow(false));
    }

    const handleImmaginePartita = (e) => {
        setPartitaImage([...ImmaginePartita, e.target.files[0]]);
    };

    const renderAddPartitaModel = () => {
        return (
            <Modal
                handleClose={() => setModalShow(false)}
                onSubmit={handleClose}
                onHide={() => setModalShow(false)}
                show={modalShow}
                modalTitle="Aggiungi nuova Partita"
            >
                <Row>
                    <Col sm={6} >
                        <Input
                            placeholder={"Squadra 1"}
                            value={squadra1}
                            type="text"
                            onChange={(e) => setSquadra1(e.target.value)}
                        />
                    </Col>

                    <Col sm={6} >
                        <Input
                            placeholder={"Squadra 2"}
                            value={squadra2}
                            type="text"
                            onChange={(e) => setSquadra2(e.target.value)}
                        />

                    </Col>
                </Row>
                <DateTimePicker
                    value={dataOraPartita}
                    onChange={onChange}
                    format="dd MMM y HH:mm"
                    locale="it-IT"
                />
                <Input
                    type="text"
                    pattern="[0-9]*"
                    placeholder={"Prezzo Biglietto"}
                    value={prezzoBigliettoPartita}
                    onChange={(e) =>
                        setPrezzoBigliettoPartita((v) => (e.target.validity.valid ? e.target.value : v))}
                />
                <Input
                    placeholder={"Descrione..."}
                    value={descrizione}
                    type="text"
                    onChange={(e) => setDescrizoine(e.target.value)}
                />
                <select className="form-control" type="checkbox"
                    onChange={(e) => setIdStadio(e.target.value)}
                    value={idstadio} >
                    <option>Seleziona lo Stadio</option>
                    {
                        Stadi.stadi.map(
                            option => <option key={option._id} value={option._id}>{option.nome}</option>)

                    }
                </select>

                <select className="form-control" type="checkbox"
                    onChange={(e) => setCategoria(e.target.value)}
                    value={categoria}>
                    <option>Seleziona la categoria</option>
                    {
                        createCategoryList(Categorie.categorie).map(
                            option => <option key={option.value} value={option.value}>{option.nome}</option>)
                    }
                </select>
                <input type="file" name="ImmaginePartita" onChange={handleImmaginePartita} />
            </Modal>
        )
    }

    const renderPartite = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Incontro</th>
                        <th>Data Ora Partita</th>
                        <th>Prezzo Biglietto</th>
                        <th>Descrizione</th>
                        <th>Categoria</th>
                        <th>Stadio</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Partite.partite.length > 0
                        ? Partite.partite.map((partita, index) => (
                            <tr key={partita._id}>
                                <td>{index + 1}</td>
                                <td>{partita.squadra1} - {partita.squadra2}</td>
                                <td>{partita.dataOraPartita}</td>
                                <td>{partita.prezzoBigliettoPartita}</td>
                                <td>{partita.descrizione}</td>
                                <td>{partita.categoria.nome}</td>
                                <td>{partita.IdStadio ? partita.IdStadio.nome : "N/A"}</td>
                                <td>
                                    <button onClick={() => showPartitaDetailsModal(partita)}>
                                        info
                                    </button>
                                    <button
                                        onClick={() => {
                                            const payload = {
                                                IdPartita: partita._id,
                                            };
                                            dispatch(deletePartitaById(payload));
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

    const showPartitaDetailsModal = (partita) => {
        setPartitaDetails(partita);
        setPartitaDetailModal(true);
    };


    const renderPartitaDetailsModal = () => {
        if (!partitaDetails) {
            return null;
        }

        return (
            <Modal
                onHide={() => setPartitaDetailModal(false)}
                show={partitaDetailModal}
                handleClose={() => setPartitaDetailModal(false)}
                modalTitle={"Dettagli Partita"}
                size="lg"
            >
                <Row>
                    <Col md="6">
                        <label className="key">Incontro</label>
                        <p className="value">{partitaDetails.squadra1} - {partitaDetails.squadra2}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Data Ora Partita</label>
                        <p className="value">{partitaDetails.dataOraPartita}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Prezzo Biglietto</label>
                        <p className="value">{partitaDetails.prezzoBigliettoPartita}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Categoria</label>
                        <p className="value">{partitaDetails.categoria.nome}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Descrizione</label>
                        <p className="value">{partitaDetails.descrizione}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Stadio</label>
                        <p className="value">{partitaDetails.IdStadio ? partitaDetails.IdStadio.nome : "N/A"}</p>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <label className="key">Immagine Partita </label>
                        <div style={{ display: "flex" }}>
                            {partitaDetails.ImmaginePartita.map((picture) => (
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
                                <h3>Partite</h3>
                                <button onClick={() => setModalShow(true)}>Aggiungi</button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>{renderPartite()}</Col>
                    </Row>
                </Container>
                {renderAddPartitaModel()}
                {renderPartitaDetailsModal()}

            </Layout>
        </>
    )

}
export default Partite