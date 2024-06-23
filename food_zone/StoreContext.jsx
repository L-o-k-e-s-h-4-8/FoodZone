import { createContext, useEffect, useState } from "react";
import Axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [menulist, setMenuList] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [restaurantlist, setRestaurantList] = useState([{}]);
  const [paymentStatus, setPaymentStatus] = useState("false");
  const [showUpdate, setShowUpdate] = useState(false);
  const [showalert, setShowAlert] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [category, setCategory] = useState("Food Processing");
  const [itemId1, setItemId1] = useState("");
  const [updatelist, setUpdateList] = useState({
    name: "",
    description: "",
    category: "Biriyani",
    price: "",
    itemId: "",
  });

  const getMenuData = async () => {
    const response = await Axios.get(`http://localhost:5000/list`);
    setMenuList(response.data.data);
  };

  useEffect(() => {
    getMenuData();
  }, []);

  const getRestaurantData = async () => {
    const response = await Axios.get(`http://localhost:5000/restaurant`);
    setRestaurantList(response.data);
  };

  useEffect(() => {
    getRestaurantData();
  }, []);

  const [token, setToken] = useState("");

  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const deleteFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
  };

  const getTotal = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        let itemInfo = menulist.find((product) => product.id == items);
        totalAmount += itemInfo.price * cartItems[items];
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const contextValue = {
    token,
    setToken,
    cartItems,
    addToCart,
    setCartItems,
    removeFromCart,
    menulist,
    restaurantlist,
    getTotal,
    cartData,
    setCartData,
    paymentStatus,
    setPaymentStatus,
    showUpdate,
    setShowUpdate,
    updatelist,
    setUpdateList,
    itemId1,
    setItemId1,
    category,
    setCategory,
    deleteFromCart,
    showalert,
    setShowAlert,
    showPopUp,
    setShowPopUp,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
