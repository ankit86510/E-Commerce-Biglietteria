import React from 'react';
import Modal from '../../../componenti/UI/Modal'
import Input from '../../../componenti/UI/input';
import { Row, Col } from 'react-bootstrap';


const AddCategoryModal = (props) => {

    const {
        modalShow,
        handleClose,
        modalTitle,
        nome,
        setCategoryName,
        parentCategoryId,
        setParentId,
        categorieList,
        setCategoryImage,
        onSubmit,
    } = props;

    return (
        <Modal
            show={modalShow}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modalTitle={modalTitle}
        >
            <Row>
                <Col>
                    <Input
                        placeholder={"Nome Categoria"}
                        value={nome}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="form-control-sm"
                    />
                </Col>
                <Col>
                    <select className="form-control"
                        value = {parentCategoryId}
                        onChange={(e) => setParentId(e.target.value)}>
                        <option>Seleziona la categoria</option>
                        {
                            categorieList.map(
                                option => <option key={option.value} value={option.value}>{option.nome}</option>)
                        }
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type="file" name="categoryImage" onChange={(e) => setCategoryImage(e.target.files[0])} />
                </Col>
            </Row>


        </Modal>
    );
}

export default AddCategoryModal;