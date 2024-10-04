import React from "react";
import alertify from "alertifyjs";
import { Button, ListGroup, ListGroupItem } from "reactstrap";

const groupCartItems = (cartItems) => {
  const groupedItems = {};

  cartItems.forEach((item) => {
    if (groupedItems[item.id]) {
      groupedItems[item.id].count += 1;
      groupedItems[item.id].totalPrice += item.price;
    } else {
      groupedItems[item.id] = {
        ...item,
        count: 1,
        totalPrice: item.price,
      };
    }
  });

  return Object.values(groupedItems);
};

const Cart = ({
  cartItems,
  onRemoveFromCart,
  onClearCart,
  onUpdateCartItem,
}) => {
  const groupedCartItems = groupCartItems(cartItems);
  const totalPrice = groupedCartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  const handleRemoveFromCart = (item) => {
    onRemoveFromCart(item);
    alertify.error(`${item.name} sepetten çıkarıldı!`);
  };

  const handleClearCart = () => {
    onClearCart();
    alertify.error("Sepet boşaltıldı!");
  };

  const handleIncreaseQuantity = (item) => {
    onUpdateCartItem(item, "increase");
    alertify.success(`1 adet ${item.name} eklendi!`);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.count === 1) {
      handleRemoveFromCart(item);
    } else {
      onUpdateCartItem(item, "decrease");
      alertify.warning(`1 adet ${item.name} çıkarıldı!`);
    }
  };

  return (
    <div>
      <h3>Sepet</h3>
      <ListGroup>
        {groupedCartItems.map((item) => (
          <ListGroupItem key={item.id}>
            {item.name} - {item.count} adet - ${item.totalPrice}
            <Button
              color="warning"
              onClick={() => handleRemoveFromCart(item)}
              style={{ float: "right", marginLeft: "10px" }}
              className="btn btn-sm"
            >
              Kaldır
            </Button>
            <Button
              color="success"
              onClick={() => handleIncreaseQuantity(item)}
              style={{ float: "right", marginLeft: "5px" }}
              className="btn btn-sm"
            >
              +
            </Button>
            <Button
              color="danger"
              onClick={() => handleDecreaseQuantity(item)}
              style={{ float: "right" }}
              className="btn btn-sm"
            >
              -
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
      <h4 className="mt-5">Toplam: ${totalPrice}</h4>
      <Button color="danger" onClick={handleClearCart}>
        Sepeti Boşalt
      </Button>
    </div>
  );
};
export default Cart;
