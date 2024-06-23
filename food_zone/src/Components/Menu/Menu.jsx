import React, { useContext, useState } from "react";
import "./Menu.css";
import { menu_list } from "../../assets/assets.js";
import { StoreContext } from "../../../StoreContext.jsx";
import ShowMenu from "./ShowMenu.jsx";

const Menu = () => {
  const { menulist } = useContext(StoreContext);
  const [menu, setMenu] = useState("All");

  return (
    <div className="menu1" id="menu">
      <h1 style={{ fontSize: "40px" }}>Explore our Menu</h1>
      <p className="menu-text" style={{ fontSize: "28px" }}>
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time
      </p>
      <div className="menu-list">
        {menu_list.map((item, index) => {
          return (
            <div key={index} className="items1">
              <img
                className={menu == item.menu_name ? "active_menu" : ""}
                onClick={() => {
                  setMenu(item.menu_name);
                }}
                src={item.menu_image}
              ></img>
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr></hr>

      <ShowMenu menu={menu}></ShowMenu>
    </div>
  );
};

export default Menu;
