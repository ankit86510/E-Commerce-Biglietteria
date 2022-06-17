import { Button } from 'bootstrap';
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom'
import { Logout } from '../../azioni'

/**
* @author
* @function Header
**/

const Header = (props) => {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(Logout());

  }
  const renderlinkUtenteLoggato = () => {
    return (
      <Nav>
        <li className='nav-item'>
          <span className='nav-link' onClick={logout} >Logout</span>
        </li>
      </Nav>
    )
  }

  const renderlinkUtenteNonLoggato = () => {
    return (
      <Nav>
        <li className='nav-item'>
          <NavLink to='/Login' className='nav-link' >Login</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='/Registrazione' className='nav-link' >Registrazione</NavLink>
        </li>
      </Nav>
    )
  }

  return (
    <Navbar
      collapseOnSelect
      fixed="top"
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1 }}>
      <Container>
        {/* <Navbar.Brand href="#home">Biglietteria</Navbar.Brand> */}
        <Link to='/' className='navbar-brand'>ADMIN Dashboard</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {auth.authenticate ? renderlinkUtenteLoggato() : renderlinkUtenteNonLoggato()};
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

};
export default Header