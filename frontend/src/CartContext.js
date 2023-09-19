import { createContext, useState, useEffect } from 'react';
import { food } from "./data/data";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); //items contains a list of ids
  const oldCartData = localStorage.getItem('oldcart');

  // Get items from local storage on reload
  useEffect(() => {
    if (oldCartData) {
      setItems(JSON.parse(oldCartData));
    }
  }, [])

  const addToCart = (id) => {
    setItems((prevState) => [...prevState, { id }]);
    //const oldCart = localStorage.getItem('oldcart');
    const updatedCart = oldCartData ? [...JSON.parse(oldCartData), { id }] : [{ id }];
    localStorage.setItem('oldcart', JSON.stringify(updatedCart));
  };


  const removeFromCart = (id) => {
    setItems((prevState) => prevState.filter(item => item.id !== id));

    // const oldCart = localStorage.getItem('oldcart');
    if (oldCartData) {
      const updatedCart = JSON.parse(oldCartData).filter(item => item.id !== id);
      localStorage.setItem('oldcart', JSON.stringify(updatedCart));
    }
  };
  const clearCart = () => {
    setItems([]);
  };

  const getCartItemDetails = () => {
    const groupedItems = {};

    // Group the items by their ID and calculate the total quantity for each item
    if (oldCartData) {
      const oldStorageCartItems = JSON.parse(oldCartData);
      oldStorageCartItems.forEach((item) => {
        const itemId = item.id;
        if (groupedItems[itemId]) {
          groupedItems[itemId].quantity += 1;
        } else {
          const cartItem = food.find((foodItem) => foodItem.id === itemId);
          groupedItems[itemId] = {
            ...cartItem,
            quantity: 1,
          };
        }
      });
    } else {
      // If the "oldcart" item doesn't exist, fetch cart item details from the "food" array
      items.forEach((item) => {
        const itemId = item.id;
        if (groupedItems[itemId]) {
          groupedItems[itemId].quantity += 1;
        } else {
          const cartItem = food.find((foodItem) => foodItem.id === itemId);
          groupedItems[itemId] = {
            ...cartItem,
            quantity: 1,
          };
        }
      });

      // Store the grouped items as an array in the "oldcart" item of localStorage
      const cartItems = Object.values(groupedItems);
      localStorage.setItem('oldcart', JSON.stringify(cartItems));
    }

    // Convert the grouped items object into an array and return it
    const cartItems = Object.values(groupedItems);

    return cartItems;
  };



  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, getCartItemDetails, clearCart }}>{children}</CartContext.Provider>
  );
}

export default CartContext;
