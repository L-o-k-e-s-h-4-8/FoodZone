import React, { useContext, useEffect, useState } from "react";
import "./List.css";
import Axios from "axios";
import { toast } from "react-toastify";
import remove_icon from "../../assets/remove.png";
import update_icon from "../../assets/icons/update.png";
import { StoreContext } from "../../../StoreContext";
const List = () => {
  const [list, setList] = useState([]);
  const { showUpdate, setShowUpdate, setItemId1, updatelist, setUpdateList } =
    useContext(StoreContext);

  const updateItem = async (itemId) => {
    setShowUpdate(true);
    list.map((item, index) => {
      if (Number(item.id) == Number(itemId)) {
        setUpdateList({
          name: item.name,
          description: item.description,
          category: item.category,
          price: item.price,
          itemId: item.id,
        });
      }
    });
    setItemId1(itemId);
  };

  const fetchList = async () => {
    const response = await Axios.get(
      `http://localhost:5000/list:${window.localStorage.getItem("email")}`
    );
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeMenu = async (menu_id) => {
    const response = await Axios.post(`http://localhost:5000/remove`, {
      menu_id: menu_id,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p
        style={{
          fontSize: "30px",
          marginBottom: "20px",
          color: "black",
          textAlign: "center",
          fontWeight: "700",
          marginLeft: "180px",
        }}
      >
        FOOD LIST
      </p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Remove</b>
          <b>Update</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img
                className="img_1"
                src={`http://localhost:5000/images/` + item.image}
              ></img>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <img
                src={remove_icon}
                onClick={() => {
                  removeMenu(item.id);
                }}
                className="cursor_i"
              ></img>
              <img
                src={update_icon}
                onClick={() => {
                  updateItem(item.id);
                }}
                className="update_image"
              ></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
