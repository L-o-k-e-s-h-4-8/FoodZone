import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import Axios from "axios";
import logo from "../../assets/logo_with_bg.png";
import { StoreContext } from "../../../StoreContext";
const MyOrders = () => {
  const [data, setData] = useState([{}]);
  const { category, setCategory } = useContext(StoreContext);
  const getData = async () => {
    const response = await Axios.get("http://localhost:5000/userorders");
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="myorders">
      <div className="container">
        {data.map((item, index) => {
          let price = 0;
          if (item.email == window.localStorage.getItem("email")) {
            return (
              <div key={index} className="order-card">
                <img src={logo}></img>
                <div className="items">
                  <p style={{ fontWeight: "700" }}>Items :</p>
                  <p className="desc1">
                    {item.menudata.map((menu, i) => {
                      price = price + menu.quantity * menu.price;
                      if (i == item.menudata.length - 1) {
                        return menu.name + " x " + menu.quantity;
                      } else {
                        return menu.name + " x " + menu.quantity + " ,";
                      }
                    })}{" "}
                  </p>
                  <p style={{ fontWeight: "700" }}>Price :</p>
                  <p> ₹{price}.00</p>
                  <p style={{ fontWeight: "700" }}>Total Items :</p>
                  <p> {item.menudata.length}</p>
                </div>
                <b className="order_status">
                  {item.order_status.toUpperCase()}
                </b>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default MyOrders;
