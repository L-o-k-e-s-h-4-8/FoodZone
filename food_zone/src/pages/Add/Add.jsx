import React, { useEffect, useState } from "react";
import "./Add.css";
import Axios from "axios";
import upload_area from "../../assets/upload_area.png";
import { toast } from "react-toastify";
const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Biriyani",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const notify = () => {
    toast("helloa");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("description", data.description);
    formdata.append("price", Number(data.price));
    formdata.append("category", data.category);
    formdata.append("image", image);
    formdata.append("email", window.localStorage.getItem("email"));
    const response = await Axios.post("http://localhost:5000/upload", formdata);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Biriyani",
      });
      setImage(false);
      toast(response.data.message);
    } else {
      console.log("Error in Add Page");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : upload_area}></img>
          </label>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            id="image"
            hidden
            required
          ></input>
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            tpye="text"
            name="name"
            placeholder="Type Here"
            style={{ fontSize: "26px" }}
          ></input>
        </div>
        <div className="product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            style={{ fontSize: "26px" }}
            required
          ></textarea>
        </div>
        <div className="add-category-price">
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
              value={data.price}
              type="number"
              name="price"
              placeholder="₹20"
            ></input>
          </div>
        </div>
        <button type="submit" className="add-button">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
