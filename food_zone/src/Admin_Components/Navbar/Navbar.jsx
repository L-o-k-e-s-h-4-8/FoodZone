import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.png";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} className="logo_1"></img>
      <div className="required-icons" style={{ fontSize: "24px" }}>
        <Link className="sidebar-option" to="/add">
          <p>ADD</p>
        </Link>
        <Link className="sidebar-option" to="/list">
          <p>LIST</p>
        </Link>
        <Link className="sidebar-option" to="/orders">
          <p>ORDERS</p>
        </Link>
        <NavLink
          to="/"
          className="sidebar-option"
          onClick={() => {
            window.localStorage.setItem("login", "false");
            window.localStorage.setItem("userType", "buy");
            window.location.replace("http://localhost:5173/");
          }}
        >
          <p>LOGOUT</p>
        </NavLink>
      </div>
      <div className="restaurant-data">
        <img src={profile} className="profile"></img>
        <div className="restaurant-description">
          <p>{window.localStorage.getItem("restaurant_name")}</p>
          <p>{window.localStorage.getItem("email")}</p>
          <p>Admin Panel</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
