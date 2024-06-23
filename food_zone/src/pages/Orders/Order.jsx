import React, { useContext, useEffect, useState } from "react";
import "./Order.css";
import logo from "../../assets/logo_with_bg.png";
import Axios from "axios";
import { StoreContext } from "../../../StoreContext";
import parcel_icon from "../../assets/parcel_icon.png";
const Order = () => {
  const [data, setData] = useState([{}]);
  const { category, setCategory } = useContext(StoreContext);
  const getData = async () => {
    const response = await Axios.get("http://localhost:5000/userorders");
    setData(response.data);
  };
  let array = [];
  useEffect(() => {
    getData();
  }, []);

  const onChangeHandler = async (event, orderId) => {
    console.log(event);
    const response = await Axios.post(
      "http://localhost:5000/userorders/status",
      { orderId, order_status: event.target.value }
    );
    if (response.data.success) {
      window.location.reload();
      console.log(response.data.message);
    }
  };

  return (
    <div className="list add flex-col">
      <div className="list-table">
        <div className="list-table-format1 title">
          <b style={{ fontSize: "28px", color: "black" }}></b>
          <b style={{ fontSize: "28px", color: "black" }}>Items</b>
          <b style={{ fontSize: "28px", color: "black" }}>Total Price</b>
          <b style={{ fontSize: "28px", color: "black" }}>Order Status</b>
        </div>
        {data.map((item, index) => {
          let price = 0;
          if (
            item.restaurant_name ==
            window.localStorage.getItem("restaurant_name")
          ) {
            return (
              <div key={index} className="list-table-format1">
                <img src={parcel_icon}></img>
                <p style={{ width: "300px", fontSize: "26px", color: "black" }}>
                  {item.menudata.map((menu, i) => {
                    price = price + menu.quantity * menu.price;
                    if (i == item.menudata.length - 1) {
                      return menu.name + " x " + menu.quantity;
                    } else {
                      return menu.name + " x " + menu.quantity + " ,";
                    }
                  })}
                </p>
                <p style={{ color: "black", fontSize: "26px" }}>₹{price}.00</p>
                <select
                  style={{
                    fontSize: "26px",
                  }}
                  onChange={(event) => onChangeHandler(event, item.orderid)}
                  name="category"
                  value={item.order_status}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            );
          } else {
            return <div></div>;
          }
        })}
      </div>
    </div>
  );
};

export default Order;
