import React, { useContext } from "react";
import "./Show.css";
import cross_icon from "../../assets/cross_icon.png";
import { StoreContext } from "../../../StoreContext";

const Show = () => {
  const { showaltert, setShowAlert, showPopUp, setShowPopUp } =
    useContext(StoreContext);
  return (
    <div>
      <div className="login">
        <div className="login-container">
          <div onClick={() => setShowAlert(false)} className="circle"></div>
          <div className="login-title"></div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <p
              style={{
                marginTop: "20px",
                textAlign: "center",
                color: "#323232",
                fontSize: "32px",
                fontWeight: "500",
              }}
            >
              Error
            </p>
            <p
              style={{
                marginTop: "10px",
                textAlign: "center",
                color: "#323232",
                fontSize: "22px",
                fontWeight: "500",
              }}
            >
              Please log in to continue adding items to your cart
            </p>
            <button
              onClick={() => {
                setShowAlert(false);
                setShowPopUp(true);
              }}
              className="btn"
              style={{
                margin: "auto",
                display: "block",
                backgroundColor: "tomato",
                textAlign: "center",
                color: "white",
                marginTop: "30px",
                fontSize: "22px",
                fontWeight: "500",
              }}
            >
              LOGIN HERE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
