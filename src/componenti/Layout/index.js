import React from 'react'
import Header from '../Header';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './style.css'


/**
* @author
* @function Layout
**/

const Layout = (props) => {
  return (
    <>
      <Header />

        {
          props.sidebar ?
          <Container fluid>
              <Row>
                <Col md={2} className="sidebar">
                  <ul>
                    <li className='nav-item'><NavLink exact to={`/`} className='nav-link'>Home</NavLink></li>
                    {/* <li><NavLink to={`/page`}>Page</NavLink></li> */}
                    <li className='nav-item'><NavLink to="/Categorie" className='nav-link'>Categorie</NavLink></li>
                    <li className='nav-item'><NavLink to='/Partite' className='nav-link'>Partite</NavLink></li>
                    <li className='nav-item'><NavLink to='/Stadi' className='nav-link'>Stadi</NavLink></li>
                    <li className='nav-item'><NavLink to='/Ordini'className='nav-link'>Ordini</NavLink></li>
                    <li className='nav-item'><NavLink to='/Clienti' className='nav-link'>Clienti</NavLink></li>
                  </ul>
                </Col>
                <Col md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }}>
                  {props.children}
                </Col>
              </Row>
            </Container>

            :
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              {props.children}
            </Container>

        }
      </>
      );
 };
      export default Layout