import React, { useContext } from "react";
import { StoreContext } from "../../../StoreContext";
import menu_image from "../../assets/restaurants/arabian_delights.jpg";
import add_icon_white from "../../assets/icons/add_icon_white.png";
import add_icon_green from "../../assets/icons/add_icon_green.png";
import remove_icon_red from "../../assets/icons/remove_icon_red.png";
import "./ShowMenu.css";
const ShowMenu = ({ menu }) => {
  const {
    menulist,
    addToCart,
    removeFromCart,
    cartItems,
    showalert,
    setShowAlert,
  } = useContext(StoreContext);

  const color_codes = {
    Tandoori: "#32CD32",
    Deserts: "#FFA500",
    Sandwich: "#00BFFF",
    Cake: "#FFE4B5",
    Pasta: "#40E0D0",
    Noodles: "#FF7F50",
    "Pure Veg": "#F4A460",
    Pizza: "#3CB371",
    Biriyani: "#FF69B4",
  };

  return (
    <>
      <h1>Menu</h1>
      <div className="container1">
        {menulist.map((item, index) => {
          let category = item.category;
          let shade = color_codes[category];
          if (menu == item.category) {
            return (
              <div key={index}>
                <div className="card-menu">
                  <div className="image-container">
                    <img
                      className="restaurant-image"
                      src={`http://localhost:5000/images/` + item.image}
                    ></img>
                    {!cartItems[item.id] ? (
                      <img
                        className="add_img"
                        onClick={() => {
                          if (window.localStorage.getItem("login") == "true") {
                            console.log(window.localStorage.getItem("login"));
                            addToCart(item.id);
                          } else {
                            setShowAlert(true);
                            window.scrollTo(0, 0);
                          }
                        }}
                        src={add_icon_white}
                      ></img>
                    ) : (
                      <div className="food-counter">
                        <img
                          onClick={() => addToCart(item.id)}
                          src={add_icon_green}
                        ></img>
                        <p>{cartItems[item.id]}</p>
                        <img
                          onClick={() => removeFromCart(item.id)}
                          src={remove_icon_red}
                        ></img>
                      </div>
                    )}
                  </div>
                  <div className="menu_description">
                    <p
                      style={{
                        overflowY: "scroll",
                        height: "30px",
                        color: "black",
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{
                        height: "60px",
                        overflowY: "scroll",
                      }}
                    >
                      {item.description}
                    </p>

                    <p
                      style={{
                        borderRadius: "50px",
                        backgroundColor: shade,
                        width: "100px",
                        color: "black",
                        textAlign: "center",
                      }}
                      className="itemCategory"
                    >
                      {item.category}
                    </p>

                    <p className="price">${item.price}</p>
                  </div>
                </div>
              </div>
            );
          }
          if (menu == "All") {
            return (
              <div key={index}>
                <div className="card-menu">
                  <div className="image-container">
                    <img
                      className="restaurant-image"
                      src={`http://localhost:5000/images/` + item.image}
                    ></img>
                    {!cartItems[item.id] ? (
                      <img
                        className="add_img"
                        onClick={() => {
                          if (window.localStorage.getItem("login") == "true") {
                            console.log(window.localStorage.getItem("login"));
                            addToCart(item.id);
                          } else {
                            setShowAlert(true);
                            window.scrollTo(0, 0);
                          }
                        }}
                        src={add_icon_white}
                      ></img>
                    ) : (
                      <div className="food-counter">
                        <img
                          onClick={() => addToCart(item.id)}
                          src={add_icon_green}
                        ></img>
                        <p>{cartItems[item.id]}</p>
                        <img
                          onClick={() => removeFromCart(item.id)}
                          src={remove_icon_red}
                        ></img>
                      </div>
                    )}
                  </div>
                  <div className="menu_description">
                    <p
                      style={{
                        overflowY: "scroll",
                        height: "30px",
                        color: "black",
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{
                        height: "60px",
                        overflowY: "scroll",
                      }}
                    >
                      {item.description}
                    </p>
                    <p
                      style={{
                        borderRadius: "50px",
                        backgroundColor: shade,
                        width: "100px",
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      {item.category}
                    </p>
                    <p className="price">₹{item.price}</p>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default ShowMenu;
