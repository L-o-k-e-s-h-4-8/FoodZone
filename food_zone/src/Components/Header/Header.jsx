import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import header_img_1 from "./background_image1.png";
import header_img_2 from "../../assets/header_img.png";
import header_img_3 from "./header_2.png";

const images = [header_img_1, header_img_2, header_img_3];

const Header = () => {
  const [index, setIndex] = useState(0);
  const nextImage = () => {
    if (index < images.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      setIndex(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 4000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div
      className="header"
      style={{
        background: `url(${images[index]}) no-repeat`,
        backgroundSize: "cover",
        animation: "fadeIn 3s",
      }}
    >
      <div className="header-contents">
        <h1>Dive into Delights of Delectable Food</h1>
        <p style={{ fontSize: "28px", fontWeight: "500" }}>
          Where Each Plate Weaves a Story of Culinary Mastery and Passionate
          Craftsmanship
        </p>
        <Link to="/restaurants">
          <button
            style={{ fontSize: "28px", fontWeight: "500" }}
            className="order_button"
          >
            Order Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
