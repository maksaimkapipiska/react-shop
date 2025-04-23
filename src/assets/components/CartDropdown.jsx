import React from 'react';
import { Dropdown, Badge, Button } from 'react-bootstrap';
import './CartDropdown.css';

const CartDropdown = ({ cartItems = [], addToCart, delFromCart}) => {
    const handleCheckout = () => {
        alert('Оформление заказа...');
    };
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <Dropdown >
            <Dropdown.Toggle variant="primary" id="dropdown-cart">
                🛒 Корзина <Badge bg="light" text="dark">{totalCount}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: '300px' }}>
                {cartItems.length === 0 ? (
                    <Dropdown.Item>Корзина пуста</Dropdown.Item>
                ) : (
                    <>
                        {cartItems.map(item => (
                            <Dropdown.Item key={item.id} className="d-flex justify-content-between align-items-center">
                                <div className="main">
                                    <div>{item.title}</div>
                                    <small>{item.price} $</small>
                                    <span className="totalItems px-2 fw-bold">{item.quantity}</span>
                                    <button className="addToCart btn btn-success" onClick={() => addToCart(item)}>+</button>
                                    <button className="delFromCart btn btn-danger" onClick={() => delFromCart(item.id)}>-</button>
                                </div>
                            </Dropdown.Item>
                        ))}
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            <Button variant="primary" onClick={handleCheckout} className="w-100">Оформить заказ</Button>
                        </Dropdown.Item>
                    </>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default CartDropdown;
