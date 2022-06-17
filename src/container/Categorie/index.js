import React, { useEffect, useState } from 'react'
import Layout from '../../componenti/Layout'
import { Container, Row, Col, Button } from 'react-bootstrap'
import {
    addCategoria,
    updateCategoria,
    deleteCategoria as deleteCategoriesAction,
    getAllCategorie,
    createCategoryList
} from '../../azioni';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../componenti/UI/Modal'
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io'
import AddCategoryModal from './Components/AddCategoriaModal';
import UpdateCategoriesModal from './Components/UpdateCategoriaModal';
import './style.css'

/**
* @author
* @function Categorie
**/

const Categorie = (props) => {

    const Categorie = useSelector(state => state.categorie);
    const [nome, setCategoryName] = useState('');
    const [parentId, setParentId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

    const dispatch = useDispatch();

    // const renderCategories = (categories) => {
    //     let myCategories = [];
    //     for (let category of categories) {
    //         myCategories.push(
    //             {
    //                 label: category.name,
    //                 value: category._id,
    //                 children: category.children.length > 0 && renderCategories(category.children)
    //             }
    //         );
    //     }
    //     return myCategories;
    // }

    const renderCategorie = (categorie) => {
        let myCategorie = [];
        for (let categoria of categorie) {
            myCategorie.push(
                {
                    label: categoria.nome,
                    value: categoria._id,
                    children: categoria.children.length > 0 && renderCategorie(categoria.children)
                }
            );
        }
        return myCategorie;
    }


    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const handleClose = () => {

        const form = new FormData();
        if (nome === "") {
            alert('Nome Categoria necessarrio!');
            setShow(false);
            return;
        }

        form.append('nome', nome);
        form.append('parentId', parentId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategoria(form));
        setCategoryName('');
        setParentId('');
        setModalShow(false);
    }

    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(Categorie.categorie);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    }

    const handleCategoryInput = (key, value, index, type) => {
        console.log(value);
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('nome', item.nome);
            form.append('parentId', item.parentId ? item.parentId : "");
            // form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('nome', item.nome);
            form.append('parentId', item.parentId ? item.parentId : "");
            // form.append('type', item.type);
        });
        dispatch(updateCategoria(form)).then(setUpdateCategoryModal(false));
        
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);

        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategorie())
                        setDeleteCategoryModal(false)
                    }
                });
        }

        setDeleteCategoryModal(false);


    }

    const renderDeleteCategoryModal = () => {
        return (
            <Modal
                modalTitle="Confirm"
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            setDeleteCategoryModal(false)
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCategories
                    }
                ]}
            >


                <h5>Expanded</h5>
                { expandedArray.map((item, index) => <span key={index}>{item.nome} </span>)}
                <h5>Checked</h5>
                { checkedArray.map((item, index) => <span key={index}>{item.nome} </span>)}

            </Modal>
        );
    }


    const categorieList = createCategoryList(Categorie.categorie);

    return (
        <>
            <Layout sidebar>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>Categorie</h3>
                                <div className="actionBtnContainer">
                                    <span>Azioni: </span>
                                    <button onClick={() => setModalShow(true)}><IoIosAdd /> <span>Aggiungi</span></button>
                                    <button onClick={deleteCategory}><IoIosTrash /> <span>Elimina</span></button>
                                    <button onClick={updateCategory}><IoIosCloudUpload /> <span>Modifica</span></button>
                                </div>

                            </div>

                        </Col>
                    </Row>
                    {/* {renderCategorie(Categorie.categorie)} */}

                    <Row>
                        <Col md={12}>
                            <CheckboxTree
                                nodes={renderCategorie(Categorie.categorie)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                icons={{
                                    check: <IoIosCheckbox />,
                                    uncheck: <IoIosCheckboxOutline />,
                                    halfCheck: <IoIosCheckboxOutline />,
                                    expandClose: <IoIosArrowForward />,
                                    expandOpen: <IoIosArrowDown />
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
                {renderDeleteCategoryModal()}
                <AddCategoryModal
                    modalShow={modalShow}
                    handleClose={() => setModalShow(false)}
                    onSubmit={handleClose}
                    modalTitle={'Aggiungi nuova Category'}
                    nome={nome}
                    setCategoryName={setCategoryName}
                    parentCategoryId={parentId}
                    setParentId={setParentId}
                    categorieList={categorieList}
                    handleCategoryImage={handleCategoryImage}
                />
                <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                onSubmit={updateCategoriesForm}
                modalTitle={'Update Categorie'}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categorieList}
                />
            {/* {renderAddCategoryModal()} */}
            </Layout>
        </>
    )

}
export default Categorie