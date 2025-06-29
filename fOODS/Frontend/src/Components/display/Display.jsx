import React, { useEffect, useState } from "react";
import FoodItem from "../FoodItem/FoodItem";
import "./Display.css";
import { food_list } from "../../assets/assets";

const Display = ({ category, setCategory }) => {
  const [cart, setCart] = useState({});

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || {};
    setCart(savedCart);
  }, []);

  // Function to add food to cart
  const addToCart = (foodItem) => {
    let updatedCart = { ...cart };

    if (updatedCart[foodItem._id]) {
      updatedCart[foodItem._id].count += 1;
    } else {
      updatedCart[foodItem._id] = { ...foodItem, count: 1 };
    }

    // Save updated cart to localStorage & state
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <div className="display">
      {food_list.map((item, index) => {
        if (item.category === category || category === "All") {
          return (
            <FoodItem
              key={index}
              setCategory={setCategory}
              name={item.name}
              id={item._id}
              category={item.category}
              price={item.price}
              image={item.image}
              count={cart[item._id]?.count || 0} // Pass current count to FoodItem
              addToCart={() => addToCart(item)}
            />
          );
        }
      })}
    </div>
  );
};

export default Display;
