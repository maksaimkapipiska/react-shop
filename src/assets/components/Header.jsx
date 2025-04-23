import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import CartDropdown from './CartDropdown';
import "./Header.css"

const Header = ({ cartItems, delFromCart, addToCart }) => {
    return (
        <Navbar bg="light" expand="lg" className="header">
            <Container>
                <Navbar.Brand href="#">Магазин</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#">Главная </Nav.Link>
                    </Nav>
                    <CartDropdown cartItems={cartItems}  addToCart={addToCart} delFromCart={delFromCart} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
