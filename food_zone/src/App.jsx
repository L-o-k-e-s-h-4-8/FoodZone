import React, { useContext } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import AdminNavbar from "./Admin_Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Restaurant from "./Components/Restaurant/Restaurant";
import Login from "./Components/Login/Login";
import { ToastContainer, toast } from "react-toastify";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Order from "./pages/Orders/Order";
import Cart from "./Components/Cart/Cart";
import PlaceOrder from "./Components/PlaceOrder/PlaceOrder";

import "react-toastify/dist/ReactToastify.css";
import Verify from "./Components/Verify/Verify";
import MyOrders from "./Components/MyOrders/MyOrders";
import Update from "./Admin_Components/Update/Update";
import { StoreContext } from "../StoreContext";
import Show from "./Components/Show/Show";

const App = () => {
  const [status, setStatus] = useState(false);
  const {
    showUpdate,
    setShowUpdate,
    showalert,
    setShowAlert,
    showPopUp,
    setShowPopUp,
  } = useContext(StoreContext);

  return (
    <div>
      <ToastContainer></ToastContainer>
      {showalert ? <Show setShowAlert={setShowAlert}></Show> : <></>}
      {showPopUp ? (
        <Login setShowPopUp={setShowPopUp} setStatus={setStatus}></Login>
      ) : (
        <></>
      )}
      {showUpdate ? <Update setShowUpdate={setShowUpdate}></Update> : <></>}

      {window.localStorage.getItem("userType") == "join" ? (
        <>
          <AdminNavbar></AdminNavbar>
          <hr></hr>
          <div className="app-content">
            <Routes>
              <Route path="/add" element={<Add></Add>}></Route>
              <Route path="/list" element={<List></List>}></Route>
              <Route path="/orders" element={<Order></Order>}></Route>
            </Routes>
          </div>
        </>
      ) : (
        <>
          <Navbar setShowPopUp={setShowPopUp} status={status} />
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route
              path="/restaurants"
              element={<Restaurant></Restaurant>}
            ></Route>
            <Route path="/cart" element={<Cart></Cart>}></Route>
            <Route path="/order" element={<PlaceOrder></PlaceOrder>}></Route>
            <Route path="/verify" element={<Verify></Verify>}></Route>
            <Route path="/myorders" element={<MyOrders></MyOrders>}></Route>
          </Routes>
          <Footer></Footer>
        </>
      )}
    </div>
  );
};

export default App;
