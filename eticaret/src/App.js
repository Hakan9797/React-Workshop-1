import React, { useState } from "react";
import {
  Col,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Cart from "./components/Cart.js";
import CategoryList from "./components/CategoryList.js";
import ProductList from "./components/ProductList.js";
import { categories, products } from "./data/data.js";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleUpdateCartItem = (product, action) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const productIndex = updatedCart.findIndex(
        (item) => item.id === product.id
      );

      if (productIndex >= 0) {
        if (action === "increase") {
          updatedCart.push(product); 
        } else if (action === "decrease" && updatedCart.length > 0) {
          updatedCart.splice(productIndex, 1); 
        }
      }

      return updatedCart;
    });
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoryId === selectedCategory.id)
    : products;

  return (
    <Router>
      <Container>
        <Navbar color="light" expand="md">
          <NavbarBrand tag={Link} to="/">
            E-Ticaret
          </NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/Cart">
                Sepet ({cart.length})
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Routes>
          <Route
            path="/"
            element={
              <Row>
                <Col sm="4">
                  <CategoryList
                    categories={categories}
                    onSelectedCategory={setSelectedCategory}
                  ></CategoryList>
                </Col>
                <Col sm="8">
                  <ProductList
                    products={filteredProducts}
                    onAddToCart={handleAddToCart}
                  ></ProductList>
                </Col>
              </Row>
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cart}
                onRemoveFromCart={handleRemoveFromCart}
                onClearCart={handleClearCart}
                onUpdateCartItem={handleUpdateCartItem}
              ></Cart>
            }
          ></Route>
        </Routes>
      </Container>
    </Router>
  );
};
export default App;
