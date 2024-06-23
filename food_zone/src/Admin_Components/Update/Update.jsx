import React, { useContext, useState } from "react";
import "./Update.css";
import cross_icon from "../../assets/cross_icon.png";
import { StoreContext } from "../../../StoreContext";
import Axios from "axios";

const Update = () => {
  const { setShowUpdate, updatelist, setUpdateList, itemId1, setItemId1 } =
    useContext(StoreContext);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUpdateList((data) => ({ ...data, [name]: value }));
  };

  const setUpdate = async () => {
    const updated_data = {
      id: itemId1,
      name: updatelist.name,
      description: updatelist.description,
      price: Number(updatelist.price),
      category: updatelist.category,
    };
    console.log(updated_data);
    const response = await Axios.post(
      "http://localhost:5000/list/update",
      JSON.stringify(updated_data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.success) {
      setShowUpdate(false);
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="login">
        <div className="login-container">
          <div className="login-title">
            <h2>Update Menu</h2>
            <img onClick={() => setShowUpdate(false)} src={cross_icon}></img>
          </div>
          <div>
            <div className="add-product-name1 flex-col">
              <p>Product Name</p>
              <input
                onChange={onChangeHandler}
                value={updatelist.name}
                tpye="text"
                name="name"
                placeholder="Type Here"
              ></input>
            </div>
            <div className="product-description1 flex-col">
              <p>Product Description</p>
              <textarea
                onChange={onChangeHandler}
                value={updatelist.description}
                name="description"
                rows="6"
                placeholder="Write content here"
                required
              ></textarea>
            </div>
            <div className="add-category-price1">
              <div className="add-category flex-col">
                <p>Product Category</p>
                <select
                  style={{
                    fontSize: "18px",
                  }}
                  onChange={onChangeHandler}
                  name="category"
                >
                  <option value="Biriyani">Biriyani</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Tandoori">Tandoori</option>
                  <option value="Deserts">Deserts</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Cake">Cake</option>
                  <option value="Pure Veg">Pure Veg</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Noodles">Noodles</option>
                </select>
              </div>
              <div className="add-price flex-col">
                <p>Product Price</p>
                <input
                  style={{
                    fontSize: "18px",
                  }}
                  onChange={onChangeHandler}
                  value={updatelist.price}
                  type="number"
                  name="price"
                  placeholder="₹20"
                ></input>
              </div>
            </div>
            <button onClick={setUpdate} className="update_button">
              UPDATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
