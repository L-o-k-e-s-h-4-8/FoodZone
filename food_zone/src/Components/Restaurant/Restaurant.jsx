import React, { useContext, useEffect, useState } from "react";
import "./Restaurant.css";
import menu_image from "../../assets/restaurants/arabian_delights.jpg";
import { restaurant_images } from "./images";
import add_icon_white from "../../assets/icons/add_icon_white.png";
import add_icon_green from "../../assets/icons/add_icon_green.png";
import remove_icon_red from "../../assets/icons/remove_icon_red.png";
import { StoreContext } from "../../../StoreContext";
import { Link } from "react-router-dom";
import search_icon from "../../assets/icons/search.png";

const Restaurant = () => {
  const { cartItems, addToCart, removeFromCart, menulist, restaurantlist } =
    useContext(StoreContext);
  const [restaurant_email, setRestaurantEmail] = useState("");
  const [option, setOption] = useState("restaurant");
  const [value, setValue] = useState("");
  const [show, setShow] = useState("All");
  const [state1, setState1] = useState("Restaurants");
  const handleInput = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <div className="main-div">
        <div className="header-contents">
          <h1 className="heading">Discover the best food & drinks </h1>
          <div style={{ display: "flex" }}>
            <input
              style={{
                width: "90%",
                height: "55px",
                padding: "10px",
                fontSize: "20px",
                borderRadius: "20px 0px 0px 20px",
                border: "none",
              }}
              type="text"
              placeholder="Search Restaurants ..."
              onChange={handleInput}
              value={value}
            ></input>
            <img
              src={search_icon}
              style={{ height: "55px", borderRadius: "0px 20px 20px 0px" }}
            ></img>
          </div>
        </div>
      </div>
      <div className="restaurants-list">
        <h1 style={{ fontSize: "40px", textAlign: "center" }}>{state1}</h1>

        {option == "menu" ? (
          <div style={{ display: "flex", gap: "30px", margin: "30px 80px" }}>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "500",
                cursor: "pointer",
                color: "blue",
                marginRight: "12px",
              }}
              className="buttons_menu_2"
              onClick={() => {
                setOption("restaurant");
                setState1("Restaurants");
              }}
            >
              Restaurants
            </p>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "500",
                cursor: "pointer",
                marginLeft: "-28px",
                marginRight: "10px",
              }}
            >
              /
            </p>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "500",
                marginLeft: "-20px",
              }}
              className="buttons_menu_2"
              onClick={() => {
                setOption("restaurant");
                setState1("Restaurants");
              }}
            >
              Menu
            </p>
          </div>
        ) : (
          <></>
        )}
        <div className="container">
          {option == "restaurant" ? (
            value == "" ? (
              restaurantlist.map((item, index) => {
                return (
                  <div key={index} className="card_r">
                    <img
                      className="restaurant-image"
                      style={{
                        height: "219px",
                      }}
                      src={restaurant_images[Math.trunc(Math.random() * 5)]}
                    ></img>
                    <div className="description">
                      <p
                        style={{
                          overflowY: "hidden",
                          fontSize: "22px",
                          fontWeight: "600",
                        }}
                      >
                        {item.restaurant_name}
                      </p>
                      <p
                        style={{
                          height: "60px",
                          overflowY: "scroll",
                        }}
                      >
                        {item.restaurant_address}
                      </p>
                      <p>{item.restaurant_pincode}</p>
                    </div>
                    <button
                      onClick={() => {
                        setRestaurantEmail(item.email);
                        setOption("menu");
                        setState1(item.restaurant_name);
                      }}
                    >
                      View Menu
                    </button>
                  </div>
                );
              })
            ) : (
              <>
                {restaurantlist.map((item, index) => {
                  if (
                    String(item.restaurant_name.toLowerCase()).includes(
                      value.toLowerCase()
                    )
                  ) {
                    return (
                      <div key={index} className="card_r">
                        <img
                          className="restaurant-image"
                          style={{
                            height: "219px",
                          }}
                          src={restaurant_images[Math.trunc(Math.random() * 5)]}
                        ></img>
                        <div className="description">
                          <p style={{ overflowY: "hidden" }}>
                            {item.restaurant_name}
                          </p>
                          <p
                            style={{
                              height: "60px",
                              overflowY: "scroll",
                            }}
                          >
                            {item.restaurant_address}
                          </p>
                          <p>{item.restaurant_pincode}</p>
                        </div>
                        <button
                          onClick={() => {
                            setRestaurantEmail(item.email);
                            setOption("menu");
                          }}
                        >
                          View Menu
                        </button>
                      </div>
                    );
                  } else {
                    return <></>;
                  }
                })}
              </>
            )
          ) : (
            menulist.map((item, index) => {
              if (restaurant_email == item.email) {
                return (
                  <div key={index}>
                    <div className="card_m">
                      <div className="image-container">
                        <img
                          className="restaurant-image"
                          src={`http://localhost:5000/images/` + item.image}
                        ></img>
                        {!cartItems[item.id] ? (
                          <img
                            className="add_img"
                            onClick={() => {
                              if (
                                window.localStorage.getItem("login") == "true"
                              ) {
                                console.log(
                                  window.localStorage.getItem("login")
                                );
                                addToCart(item.id);
                              }
                            }}
                            src={add_icon_white}
                          ></img>
                        ) : (
                          <div className="food-counter">
                            <img
                              onClick={() => {
                                addToCart(item.id);
                              }}
                              src={add_icon_green}
                            ></img>
                            <p>{cartItems[item.id]}</p>
                            <img
                              onClick={() => {
                                removeFromCart(item.id);
                              }}
                              src={remove_icon_red}
                            ></img>
                          </div>
                        )}
                      </div>
                      <div className="menu_description">
                        <div className="menu-description-d">
                          <p
                            style={{
                              overflowY: "scroll",
                              height: "50px",
                              fontSize: "22px",
                              color: "black",
                              fontWeight: "600",
                              marginBottom: "2px",
                            }}
                          >
                            {item.name}
                          </p>
                          <p style={{ overflowY: "scroll", height: "35px" }}>
                            {item.description}
                          </p>
                          <p>{item.category}</p>
                        </div>
                        <p className="price">₹{item.price}</p>
                      </div>
                      <Link to="/cart" className="order-menu-button">
                        Order Now
                      </Link>
                    </div>
                  </div>
                );
              } else {
                <></>;
              }
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
