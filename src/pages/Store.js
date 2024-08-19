/*

Display contents of homepage: welcome message and grid of products.

*/

import { Row, Col } from 'react-bootstrap';
import { productsArray } from '../productStore';
import ProductCard from '../components/ProductCard'

function Store() {

    return (
        <>
            <h2 align="center" className="p-3">Hello! What can we get started for you?</h2>
            <Row xs={1} md={3} className="g-4">
                {productsArray.map((product, idx) => (
                    <Col align="center" key={idx}>
                        <ProductCard product={product}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Store;