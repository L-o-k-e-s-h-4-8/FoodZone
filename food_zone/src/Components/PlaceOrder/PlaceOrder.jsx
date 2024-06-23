import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../../StoreContext";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const PlaceOrder = () => {
  const {
    getTotal,
    cartItems,
    menulist,
    cartData,
    setPaymentStatus,
    PaymentStatus,
  } = useContext(StoreContext);

  const [deliverydata, setDeliveryData] = useState({
    street: "",
    pincode: "",
    city: "",
    state: "",
    contact: "",
    payment: false,
    email: window.localStorage.getItem("email"),
    restaurant_name: window.localStorage.getItem("admin"),
  });

  const onClickHandler = (event) => {
    setDeliveryData({
      ...deliverydata,
      [event.target.name]: event.target.value,
    });
  };
  const order = async () => {
    console.log(cartData);
    const response = await Axios.post("http://localhost:5000/checkout", {
      items: cartData,
      delivery: deliverydata,
    });
    console.log(response);

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  return (
    <div>
      <form className="place-order">
        <div className="place-order-left">
          <p className="order-title">Delivery Information</p>
          <div className="address">
            <input
              onChange={onClickHandler}
              name="street"
              value={deliverydata.street}
              type="text"
              placeholder="Street"
              required
            />
            <input
              onChange={onClickHandler}
              name="pincode"
              value={deliverydata.pincode}
              type="text"
              placeholder="Pincode"
              required
            />
            <input
              onChange={onClickHandler}
              name="city"
              value={deliverydata.city}
              type="text"
              placeholder="City"
              required
            />
            <input
              onChange={onClickHandler}
              name="state"
              value={deliverydata.state}
              type="text"
              placeholder="State"
              required
            />
            <input
              onChange={onClickHandler}
              name="contact"
              value={deliverydata.contact}
              type="text"
              placeholder="Contact Number"
              required
            />
          </div>
        </div>
        <div className="place-order-right">
          <div className="cart-total1">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-detials1">
                <p>Sub Total</p>
                <p>{getTotal()}</p>
              </div>
              <hr></hr>
              <div className="cart-total-detials1">
                <p>Delivery Fee</p>
                <p>{40}</p>
              </div>
              <hr></hr>
              <div className="cart-total-detials1">
                <b>Total</b>
                <b>{getTotal() + 40}</b>
              </div>
            </div>
            <button type="button" onClick={order}>
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
