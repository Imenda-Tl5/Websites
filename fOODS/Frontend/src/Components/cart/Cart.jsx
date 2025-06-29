import React, { useContext, useEffect, useState, useMemo } from 'react';
import { StoreContext } from '../../context/StoreContextProvider';
import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './Cart.css';

const stripePromise = loadStripe('pk_test_51QnxlO4cddLyakvKkjcX9wABbqcgiHfXFXeYB4eaTwHxGxc1GVNlmuAuxco5U5UsECji6bJ3sV7YSpIBcNWaspeS00oKnD3oS7');

const Cart = () => {
  const { cartItem, setCartItem } = useContext(StoreContext);
  const [checkout, setCheckout] = useState(false);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItem(JSON.parse(savedCart));
    }
  }, [setCartItem]);

  // Save cart to local storage whenever cartItem changes
  useEffect(() => {
    if (cartItem && Object.keys(cartItem).length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItem));
    } else {
      localStorage.removeItem('cart'); // Remove cart when empty
    }
  }, [cartItem]);

  // Convert cart object to an array of items
  const cartFoodList = useMemo(() => Object.values(cartItem || {}), [cartItem]);

  // Calculate total amount and quantity
  const totalAmount = useMemo(
    () => cartFoodList.reduce((acc, item) => acc + item.count * item.price, 0),
    [cartFoodList]
  );

  const totalQuantity = useMemo(
    () => cartFoodList.reduce((acc, item) => acc + item.count, 0),
    [cartFoodList]
  );

  const shippingCost = totalQuantity > 0 ? 3 : 0; // Free shipping for empty cart
  const grandTotal = totalAmount + shippingCost;

  const handleQuantityChange = (id, change) => {
    setCartItem((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[id]) {
        updatedCart[id].count = Math.max(1, updatedCart[id].count + change);
      }
      return updatedCart;
    });
  };

  const handleClearCart = () => {
    setCartItem({});
  };

  const handleCheckout = async () => {
    if (totalAmount === 0) {
      setError("Your cart is empty.");
      return;
    }

    setIsProcessing(true);
    try {
      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        setIsProcessing(false);
        return;
      }

      const response = await fetch('http://localhost:5001/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartFoodList,
          total: grandTotal,
          paymentMethodId: paymentMethod.id,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Payment successful!');
        handleClearCart();
      } else {
        alert('Payment failed: ' + data.message);
      }
    } catch (err) {
      setError('Error occurred: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleRemoveItem = (id) => {
    setCartItem((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[id]; // Remove the item from the cart
      return updatedCart;
    });}
  return (
    <div className="cart">
      <div className="container">
        <div className="cart-content">
          <h2>Shopping Cart</h2>
          {cartFoodList.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {cartFoodList.map((item, index) => (
                  <tr key={index}>
                    <td className="item">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <h3>{item.name}</h3>
                        <h4>{item.category}</h4>
                      </div>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                      <span>{item.count}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                    </td>
                    <td>${(item.price * item.count).toFixed(2)}  <button onClick={() => handleRemoveItem(item.id)} className="remove-btn">X</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="total">
        <h3>Order Summary</h3>
        <p>Total Items: {totalQuantity}</p>
        <p>Shipping: ${shippingCost.toFixed(2)}</p>
        <p>Item Total: ${totalAmount.toFixed(2)}</p>
        <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
        <button onClick={handleClearCart} disabled={cartFoodList.length === 0}>
          Clear Cart
        </button>
        <button onClick={() => setCheckout(true)} disabled={cartFoodList.length === 0}>
          Checkout
        </button>

        {checkout && (
          <div className="payment">
            <div>
              <span className="head">

                <h1>Debit/ Credit</h1>
                <button onClick={() => setCheckout(false)}>X</button>
              </span>

              <div>
                <input type="text" placeholder="Your Name" />
                <input type="text" placeholder="City" className="address" />
              </div>

              <Elements stripe={stripePromise}>
                <CardElement />
              </Elements>

              {error && <p className="error-message">{error}</p>}
              <button onClick={handleCheckout} disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
