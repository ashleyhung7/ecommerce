/*

Display navigation bar and cart button. Clicking on cart button opens a modal showing items in the cart
and the cart's total cost. Handles checkout process by sending a POST request to the server and redirecting user.

*/

import { Button, Navbar, Modal } from 'react-bootstrap'
import { useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import CartProduct from './CartProduct';

function NavbarComponent() {
    const cart = useContext(CartContext);

    const [ show, setShow ] = useState(false);  // Don't show cart initially
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkout = async () => {
        await fetch('http://localhost:4000/checkout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items: cart.items})
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if (response.url) {
                window.location.assign(response.url);   // Forwarding user to stripe
            }
        })
    }

    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    return (
        <>
            <Navbar expand="sm">
                <Navbar.Brand href="/">The Cozy Cup</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
                </Navbar.Collapse>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Body>
                        {productsCount > 0 ?
                            <>
                                <p>Items in your cart:</p>
                                {cart.items.map((currentProduct, idx) => (
                                    <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                                ))}

                                <h1>Total: ${cart.getTotalCost().toFixed(2)}</h1>

                                <Button variant="success" onClick={checkout}>
                                    Purchase items!
                                </Button>
                            </>
                        :
                            <h1>Cart is empty</h1>
                        }
                    </Modal.Body>
                </Modal.Header>
            </Modal>
        </>
    )
}

export default NavbarComponent