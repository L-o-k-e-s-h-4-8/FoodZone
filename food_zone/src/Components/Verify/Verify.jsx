import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Axios from "axios";

import "./Verify.css";
const Verify = () => {
  const [params, setParams] = useSearchParams();
  const success = params.get("success");
  const orderId = params.get("orderId");

  const navigate = useNavigate();
  const verifyPayment = async () => {
    const response = await Axios.post("http://localhost:5000/verify", {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);
  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
