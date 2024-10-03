import React from 'react'
import alertify from 'alertifyjs'
import {Button, Card, CardBody, CardText, CardTitle} from 'reactstrap'

const ProductCart = ({product, onAddToCart}) =>{
  const handleAddToCart = () =>{
    onAddToCart(product);
    alertify.success(`${product.name} sepete eklendi!`);
  }

  return(
    <Card style={{margin: '10px'}}>
        <img src={product.image} alt={product.name} style={{width: '100%'}}></img>
        <CardBody>
          <CardTitle>{product.name}</CardTitle>
          <CardText>{product.description}</CardText>
          <CardText>{product.price} ₺</CardText>
          <Button onClick={handleAddToCart} color='success'>Sepete Ekle</Button>

        </CardBody>

    </Card>
  );
}

export default ProductCart;