import React from 'react'
import ProductCart from './ProductCart';
import {Col, Row} from 'reactstrap'

const ProductList = ({products, onAddToCart}) => {
  return(
    <Row className='mt-2'>
        {products.map((product) => (
          <Col sm="4" key={product.id}>
            <ProductCart product={product} onAddToCart={onAddToCart}/>
          </Col>
        ))}
    </Row>
  );
}
export default ProductList;