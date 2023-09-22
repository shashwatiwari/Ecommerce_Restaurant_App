import React, { useContext, useState } from "react";
import CartContext from "../CartContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheck } from 'react-icons/ai'
const FoodCard = ({ item }) => {
  const { addToCart } = useContext(CartContext);
  const [addedItem, setAddedItem] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    // To prevent the navigation to menu/id when the "Add to Cart" button is clicked
    e.stopPropagation();
    addToCart(item.id);
    setAddedItem(true);

    setTimeout(() => {
      setAddedItem(false);
    }, 2500);
  };

  const handleFoodClick = () => {
    navigate(`/menu/${item.id}`);
  };

  return (
    <div onClick={handleFoodClick} className="cursor-pointer rounded-2xl shadow-orange-200 hover:shadow-2xl hover:scale-105 duration-500 shadow-lg">
      {/* food container */}
      <div className="">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-[300px] object-cover rounded-lg"
        />
      </div>
      {/* Details of Food, Price and Cart */}
      <div className="flex p-1 flex-col gap-2 items-start lg:p-3">
        <h2 className="md:text-2xl lg:text-xl font-bold border-b border-b-gray-300">
          {item.name}
        </h2>
        <div className="flex gap-4 items-center">
          <p className="text-sm flex">Price: <b>${item.price}</b></p>
          <button
            onClick={handleAddToCart}
            className="border-none bg-orange-400 rounded p-2 hover:bg-orange-500 relative"
          >
            Add to Cart
          </button>
          {addedItem && (
            <div
              className="font-bold items-center absolute left-32 bg-green-500 text-white rounded p-2 transition-transform duration-300 animate-bounce"
            >
              <h1>Added to Cart</h1> <AiOutlineCheck />
            </div>
          )}</div>
      </div>
    </div>
  );
};

export default FoodCard;
