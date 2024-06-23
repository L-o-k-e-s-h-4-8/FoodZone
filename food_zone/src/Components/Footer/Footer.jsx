import React from "react";
import "./Footer.css";
import instagram_icon from "../../assets/icons/instagram.png";
import facebook_icon from "../../assets/icons/facebook.png";
import whatsapp_icon from "../../assets/icons/whatsapp.png";
import linkedin_icon from "../../assets/icons/linkedin.png";
import logo from "../../assets/icons/logo.png";
const Footer = () => {
  return (
    <div className="fotter" id="fotter">
      <div className="fotter-content">
        <div className="footer-content-left">
          <img src={logo} className="logo_footer"></img>
          <p style={{ fontSize: "22px" }}>
            Foodie is a cutting-edge food delivery app designed to bring your
            favorite meals straight to your doorstep with just a few taps on
            your smartphone. Whether you're craving gourmet dishes from upscale
            restaurants, comfort food from your neighborhood diner, or a quick
            snack from a local café, Foodie has you covered. Our user-friendly
            platform offers an extensive selection of cuisines and dining
            options to satisfy every palate and dietary preference
          </p>
          <div className="footer-social-icons">
            <img src={facebook_icon}></img>
            <img src={linkedin_icon}></img>
            <img src={whatsapp_icon}></img>
          </div>
        </div>
        <div className="footer-content-center">
          <h2 style={{ fontSize: "32px" }}>COMPANY</h2>
          <ul style={{ fontSize: "22px" }}>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2 style={{ fontSize: "32px" }}>GET IN TOUCH</h2>
          <ul style={{ fontSize: "22px" }}>
            <li>+91-9565738290</li>
            <li>foodie@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr className="hr"></hr>
      <p style={{ fontSize: "18px" }} className="footer-copyright">
        Copyright 2024 &copy; foodie.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
