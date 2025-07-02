import React, { useContext, useEffect, useState } from 'react';
import "./FoodItem.css";
import { StoreContext } from '../../context/StoreContextProvider';

const FoodItem = ({ image, name, description, price, id, category }) => {
      const { cartItem, setCartItem } = useContext(StoreContext);
     const [loading,setLoading] = useState()
     const[error,setError] = useState()
    


     const handleSubmit = async () => {
        setLoading(true);
        setError("");
    
        // Ensure the item exists in the cart before submitting
        if (!cart[id]) {
            setError("Item not found in cart.");
            setLoading(false);
            return;
        }
    
        const url = "";
        const payload = { 
            id, 
            name, 
            price, 
            count: cart[id].count, 
            category, 
            image 
        };
    
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
    
            const data = await response.json();
    
            if (!response.ok) throw new Error(data.message || "Something went wrong");
    
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    // Initialize state for cartItem if not available
    const [cart, setCart] = useState(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || {};
        return savedCart;
    });

    // Sync cart with localStorage and context
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        setCartItem(cart);  // Update the context whenever cart state changes
    }, [cart, setCartItem]);

    const handleAddToCart = () => {
        const updatedCart = { ...cart };
        if (updatedCart[id]) {
            updatedCart[id].count += 1;
        } else {
            updatedCart[id] = { name, description, price, id,image, category, count: 1 };
        }
        setCart(updatedCart); // Update the local state (cart)
    };
    const handleRemoveFromCart = () => {
        const updatedCart = { ...cart };
        if (updatedCart[id]) {
            updatedCart[id].count -= 1;
            if (updatedCart[id].count <= 0) {
                delete updatedCart[id]; // Remove item if count is zero or less
            }
            setCart(updatedCart); // Update the local state (cart)
        }
    };

    return (
        <div className='food-item'>
            <div className="food-item-container">
                <img src={image} alt={name} />
                <div className="details">
                    <div className="top">
                        <div className="left">
                            <h3>{name}</h3>
                            <p>{category}</p>
                        </div>
                        <div className="right">
                            <h3>${price}</h3>
                        </div>
                    </div>
                    <div className="bottom">
                        <button onClick={handleRemoveFromCart}>-</button>
                        <h4>
                            {cart[id] ? (
                                <span>{cart[id].count}</span>
                            ) : (
                                "Add to cart"
                            )}
                        </h4>
                     <span onClick={handleSubmit}>   <button onClick={handleAddToCart}>+</button> </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodItem;
