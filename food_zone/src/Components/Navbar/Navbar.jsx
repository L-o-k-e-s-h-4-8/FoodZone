import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import cart_icon from "../../assets/icons//cart-icon.png";
import parcel_icon from "../../assets/parcel_icon.png";
import { StoreContext } from "../../../StoreContext";
import user_icon from "../../assets/icons/user_icon.png";

const Navbar = ({ setShowPopUp, status }) => {
  const { getTotal } = useContext(StoreContext);
  const [activeState, setActiveState] = useState("home");
  const [show, setShow] = useState("notshow");
  return (
    <>
      <div className="navbar">
        <div className="left-navbar-items">
          <Link to="/">
            <img src={logo}></img>
          </Link>
        </div>
        <div className="center-navbar-items">
          <ul>
            <Link
              style={{ textDecoration: "none" }}
              to={"/"}
              className={activeState === "home" ? "active" : ""}
              id="link"
              onClick={() => setActiveState("home")}
            >
              <li style={{ fontSize: "26px" }}>HOME </li>
            </Link>
            <Link
              to="/restaurants"
              className={activeState === "restaurent" ? "active" : ""}
              onClick={() => setActiveState("restaurent")}
              style={{ fontSize: "26px" }}
            >
              RESTAURANTS
            </Link>

            <a
              href="#fotter"
              className={activeState === "contact" ? "active" : ""}
              onClick={() => setActiveState("contact")}
              style={{ fontSize: "26px" }}
            >
              CONTACT US
            </a>
          </ul>
        </div>
        <div className="right-navbar-items">
          {window.localStorage.getItem("login") == "true" ? (
            <div style={{ display: "flex", gap: "40px" }}>
              <Link to="/myorders">
                <img src={parcel_icon}></img>
              </Link>
              <div className="dot-container">
                <Link to="/cart">
                  <img src={cart_icon}></img>
                </Link>
                <div className={getTotal() ? "dot" : ""}> </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          {window.localStorage.getItem("login") == "false" ? (
            <button
              className="login-button1"
              onClick={() => {
                setShowPopUp(true);
              }}
            >
              LOGIN
            </button>
          ) : (
            <div className="login-div">
              <button
                className="login-button"
                onClick={() => {
                  const ans = window.confirm(
                    "Do you wish to log out of your Account ?"
                  );
                  if (ans) {
                    window.localStorage.setItem("login", "false");
                    window.localStorage.setItem("email", "");
                    <Navigate to="/"></Navigate>;
                    window.location.reload();
                  }
                }}
              >
                <img
                  style={{
                    marginTop: "8px",
                    marginRight: "10px",
                    marginLeft: "0px",
                  }}
                  className="user_icon_1"
                  src={user_icon}
                ></img>

                <p style={{ marginTop: "8px" }}>
                  {window.localStorage
                    .getItem("username")
                    .charAt(0)
                    .toUpperCase() +
                    window.localStorage.getItem("username").slice(1)}
                </p>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
