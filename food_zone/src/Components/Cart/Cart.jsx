import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../../StoreContext";
import { useNavigate } from "react-router-dom";
import remove_icon from "../../assets/remove.png";
import add_icon_green from "../../assets/icons/add_icon_green.png";
import remove_icon_red from "../../assets/icons/remove_icon_red.png";

const Cart = () => {
  const navigate = useNavigate();
  const array = [];
  const {
    cartItems,
    removeFromCart,
    addToCart,
    deleteFromCart,
    menulist,
    restaurantlist,
    getTotal,
    setCartData,
  } = useContext(StoreContext);

  const restaurantName = (email) => {
    for (let i = 0; i < restaurantlist.length; i = i + 1) {
      if (restaurantlist[i].email == email) {
        return restaurantlist[i].restaurant_name;
      } else {
        continue;
      }
    }
  };
  return (
    <div className="cart" id="cart">
      <div className="cart-items">
        <div className="cart-items-title" style={{ fontSize: "26px" }}>
          <b>Items</b>
          <b>Title</b>
          <b>Restaurant</b>
          <b>Price</b>
          <b>Quantity</b>
          <b>Total</b>
          <b>Add</b>
          <b>Remove</b>
          <b>Delete</b>
        </div>

        {menulist.map((item, index) => {
          if (cartItems[item.id] > 0) {
            const menu = {
              menu_id: item.id,
              name: item.name,
              restaurant_name: restaurantName(item.email),
              price: item.price,
              image: item.image,
              quantity: cartItems[item.id],
            };
            array.push(menu);
            window.localStorage.setItem("admin", menu.restaurant_name);
            return (
              <div key={index}>
                <div
                  className="cart-items-title cart-item-name"
                  style={{ fontSize: "26px" }}
                >
                  <img
                    className="s"
                    src={`http://localhost:5000/images/` + item.image}
                  ></img>
                  <p>{item.name}</p>
                  <p>{restaurantName(item.email)}</p>
                  <p>{item.price}</p>
                  <p>{cartItems[item.id]}</p>
                  <p>{item.price * cartItems[item.id]}</p>
                  <img
                    src={add_icon_green}
                    onClick={() => addToCart(item.id)}
                    alt=""
                  />
                  <img
                    src={remove_icon_red}
                    onClick={() => removeFromCart(item.id)}
                    alt=""
                  />
                  <img
                    className="close"
                    src={remove_icon}
                    onClick={() => deleteFromCart(item.id)}
                  ></img>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="cart-detials" style={{ fontSize: "22px" }}>
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detials">
              <p>Sub Total</p>
              <p>{getTotal()}</p>
            </div>
            <hr></hr>
            <div className="cart-total-detials">
              <p>Delivery Fee</p>
              <p>{40}</p>
            </div>
            <hr></hr>
            <div className="cart-total-detials">
              <b>Total</b>
              <b>{getTotal() + 40}</b>
            </div>
          </div>
          <button
            style={{ fontSize: "22px" }}
            onClick={() => {
              setCartData(array);
              navigate("/order");
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
