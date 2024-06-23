import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import cross_icon from "../../assets/cross_icon.png";
import Axios from "axios";
import { StoreContext } from "../../../StoreContext";

const Login = ({ setShowPopUp, setStatus }) => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const { username, setUsername, restaurantlist } = useContext(StoreContext);
  const [option, setOption] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [restaurantdata, setRestaurantData] = useState({
    name: "",
    address: "",
    pincode: "",
    contact: "",
  });

  const [userdata, setUserdata] = useState([{}]);

  const handleInput = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleInput1 = (event) => {
    setRestaurantData({
      ...restaurantdata,
      [event.target.name]: event.target.value,
    });
  };

  const handleRadio = (event) => {
    setOption(event.target.value);
  };

  const registerUser = async (event) => {
    event.preventDefault();
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
      userType: option,
    };
    await Axios.post("http://localhost:5000/register", JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setShowPopUp(false);
        alert(
          "Successfully Registered, Login with your Credentials to continue..."
        );
      })
      .catch((err) => alert("Enter valid Details"));
  };

  const registerUser1 = async (event) => {
    event.preventDefault();
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
      userType: option,
    };

    const restaurant_data = {
      name: restaurantdata.name,
      address: restaurantdata.address,
      pincode: restaurantdata.pincode,
      contact: restaurantdata.contact,
      email: data.email,
    };
    await Axios.post("http://localhost:5000/register", JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setShowPopUp(false);
        alert(
          "Successfully Registered, Login with your Credentials to continue..."
        );
      })
      .catch((err) => alert("Enter valid Details"));

    await Axios.post(
      "http://localhost:5000/register/restaurant",
      JSON.stringify(restaurant_data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        setShowPopUp(false);
        alert(
          "Successfully Registered, Login with your Credentials to continue..."
        );
      })
      .catch((err) => alert("Enter valid Details"));
  };

  const getData3 = async () => {
    const response1 = await Axios.get("http://localhost:5000/login");
    setUserdata(response1.data);
    console.log(userdata);
  };

  useEffect(() => {
    getData3();
  }, []);

  const loginUser = (event) => {
    event.preventDefault();
    for (let i = 0; i < userdata.length; i = i + 1) {
      if (
        userdata[i].email === data.email &&
        userdata[i].password === data.password
      ) {
        window.localStorage.setItem("login", "true");
        window.localStorage.setItem("username", userdata[i].name);
        window.localStorage.setItem("email", userdata[i].email);
        window.localStorage.setItem("userType", userdata[i].usertype);
        {
          restaurantlist.map((item, index) => {
            console.log(userdata[i].email, item.email);
            if (item.email == userdata[i].email) {
              window.localStorage.setItem(
                "restaurant_name",
                item.restaurant_name
              );
            }
          });
        }
        setShowPopUp(false);
        break;
      } else {
        window.localStorage.setItem("login", "false");
      }
    }
  };

  return (
    <div className="login">
      <form className="login-container" style={{ fontSize: "20px" }}>
        <div className="login-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowPopUp(false)} src={cross_icon}></img>
        </div>
        <div className="login-input">
          {currentState === "Login" ? (
            <form>
              <div className="login-input">
                <input
                  type="email"
                  placeholder="EMail"
                  required
                  name="email"
                  value={data.email}
                  onChange={handleInput}
                ></input>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={data.password}
                  onChange={handleInput}
                  required
                ></input>
                <button onClick={loginUser}>
                  {currentState === "Sign Up" ? "Create Account" : "Login"}
                </button>
              </div>
            </form>
          ) : (
            <>
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={data.name}
                onChange={handleInput}
              ></input>
              <input
                type="email"
                placeholder="EMail"
                required
                name="email"
                value={data.email}
                onChange={handleInput}
              ></input>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handleInput}
                required
              ></input>
              <div className="user_type">
                <input
                  type="radio"
                  value="join"
                  checked={option === "join"}
                  onChange={handleRadio}
                ></input>
                <label className="label" htmlFor="join">
                  Join our Team
                </label>

                <input
                  type="radio"
                  value="buy"
                  checked={option === "buy"}
                  onChange={handleRadio}
                ></input>
                <label className="label" htmlFor="buy">
                  Order Food
                </label>
              </div>
              {option == "join" ? (
                <>
                  <input
                    placeholder="Restaurant Name"
                    required
                    name="name"
                    value={restaurantdata.name}
                    onChange={handleInput1}
                  ></input>
                  <input
                    placeholder="Restaurant Address"
                    required
                    name="address"
                    value={restaurantdata.address}
                    onChange={handleInput1}
                  ></input>
                  <input
                    placeholder="Pincode"
                    required
                    name="pincode"
                    value={restaurantdata.pincode}
                    onChange={handleInput1}
                  ></input>
                  <input
                    placeholder="Contact Number"
                    required
                    name="contact"
                    value={restaurantdata.contact}
                    onChange={handleInput1}
                  ></input>
                </>
              ) : (
                <></>
              )}
              <button onClick={option == "join" ? registerUser1 : registerUser}>
                {currentState === "Sign Up" ? "Create Account" : "Login"}
              </button>

              <div className="login-conditions">
                <input type="checkbox" required></input>
                <p>
                  By continuing, I agree to the terms of use & privacy policy.
                </p>
              </div>
            </>
          )}
        </div>

        {currentState === "Login" ? (
          <p>
            Create a new Account ?{" "}
            <span
              className="span-tag"
              onClick={() => setCurrentState("Sign Up")}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Already have an Account ?{" "}
            <span className="span-tag" onClick={() => setCurrentState("Login")}>
              Login Here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
