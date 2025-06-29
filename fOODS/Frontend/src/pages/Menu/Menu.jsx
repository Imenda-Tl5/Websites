import React from 'react';
import './Menu.css';

const menuItems = [
  {
    category: "Appetizers",
    items: [
      { name: "Garlic Bread", price: 4.99, image: "/images/garlic-bread.jpg" },
      { name: "Bruschetta", price: 5.99, image: "/images/bruschetta.jpg" },
      { name: "Mozzarella Sticks", price: 6.99, image: "/images/mozzarella-sticks.jpg" },
    ],
  },
  {
    category: "Main Course",
    items: [
      { name: "Margherita Pizza", price: 12.99, image: "/images/pizza.jpg" },
      { name: "Grilled Chicken", price: 14.99, image: "/images/grilled-chicken.jpg" },
      { name: "Pasta Alfredo", price: 13.99, image: "/images/pasta-alfredo.jpg" },
    ],
  },
  {
    category: "Desserts",
    items: [
      { name: "Chocolate Cake", price: 7.99, image: "/images/chocolate-cake.jpg" },
      { name: "Tiramisu", price: 8.99, image: "/images/tiramisu.jpg" },
      { name: "Ice Cream", price: 5.99, image: "/images/ice-cream.jpg" },
    ],
  },
  {
    category: "Drinks",
    items: [
      { name: "Lemonade", price: 3.99, image: "/images/lemonade.jpg" },
      { name: "Iced Coffee", price: 4.99, image: "/images/iced-coffee.jpg" },
      { name: "Fresh Juice", price: 4.49, image: "/images/fresh-juice.jpg" },
    ],
  },
];

const Menu = () => {
  return (
    <div className="menu">
      <div className="container">
        <h1>Our Menu</h1>
        {menuItems.map((section, index) => (
          <div key={index} className="menu-section">
            <h2>{section.category}</h2>
            <div className="menu-grid">
              {section.items.map((item, i) => (
                <div key={i} className="menu-item">
                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
