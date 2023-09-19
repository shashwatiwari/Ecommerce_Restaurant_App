import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { food } from "../data/data";
import CartContext from "../CartContext";
import {AiOutlineCheck} from 'react-icons/ai'

function Food() {
  const [foodId, setFoodId] = useState("");
  let params = useParams();
  const [foods, setFoods] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    setFoodId(params.id);
    setFoods(
      food.find((item) => {
        return item.id === parseInt(params.id);
      })
    );
  }, [params.id]);

  const { addToCart } = useContext(CartContext);
  const [addedItem, setAddedItem] = useState(false);

  const handleAddToCart = () => {
    addToCart(parseInt(foodId));
    setAddedItem(true);

    setTimeout(() => {
      setAddedItem(false);
    }, 1500);
  };

  return (
    <div className="container mt-28 lg:mt-12 mx-auto p-5 ">
      <div className="px-6 lg:mx-5 lg:mt-6">
        {/*Header*/}
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl lg:text-3xl text-left">
            Menu <span className="text-orange-500">Item</span>
          </h1>
          <Link
            to="/menu"
            className="flex justify-center items-center p-1 cursor-pointer hover:shadow-sm text-orange-500"
          >
            <div className="">View All</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
        <hr className="my-6"></hr>
        <div className="flex flex-col lg:flex-row gap-4 lg:justify-center lg:items-center lg:gap-10">
          <img className="w-48 h-48 lg:w-96 lg:h-48" src={foods.image} alt="Food item"></img>
          <div>
            {foods ? (
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold"> {foods.name}</h2>
                <div className="">Category: <span className="text-orange-500">{foods.category}</span> </div>
                <div>
                <h2 className=""><u>Description</u></h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni voluptates ea vel officiis minima dolorum quae nostrum culpa? Dolores soluta facere sapiente aliquid, esse at illo temporibus ea quaerat.</p>
                </div>
                <div><b>Price:</b> <span  className="font-semibold">${foods.price}</span></div>
                <div className="flex flex-row gap-3 justify-start items-center">
                <button
            onClick={handleAddToCart}
            className="border-none bg-orange-400 rounded p-2 hover:bg-orange-500 relative"
          >
            Add to Cart
          </button>
          {addedItem && (
            <div
              className="font-bold flex items-center absolute left-40 md:left-64 lg:left-32 bg-green-500 text-white rounded p-2 transition-transform duration-300 animate-bounce"
            >
              <h1>Added to Cart</h1> <AiOutlineCheck/>
            </div>
          )}</div>
              </div>
            ) : (
              <p className="m-4 p-5">
                No result found for <b>"{foodId}" </b>{" "}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Food;
