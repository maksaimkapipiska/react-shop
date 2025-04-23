import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import CartDropdown from './CartDropdown.jsx';
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
                    <CartDropdown cartItems={cartItems}  onAddToCart={addToCart} onDelFromCart={delFromCart} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
