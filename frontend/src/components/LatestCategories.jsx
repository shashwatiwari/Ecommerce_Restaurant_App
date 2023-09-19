import React from "react";
import { categories } from "../data/data.js";
import { Link, useNavigate } from 'react-router-dom';

// This is just to show the latest categories on the homepage.
// It slices just the first 4 array of categories
function LatestCategories() {
  const navigate = useNavigate();
const handleCategoryClick = (category) => {
navigate(`/categories/${category}`);
}
  return (
    <div className="container relative mx-auto p-5 ">
    <div className="px-6 lg:mt-6">
      {/*Header*/}
      <div className="flex justify-between items-center">
      <h1 className="font-bold text-2xl lg:text-3xl text-left">
          Popular <span className="text-orange-500">Categories</span>
        </h1>
        <Link to="/categories" className="flex justify-center items-center p-1 cursor-pointer hover:shadow-sm text-orange-500">
        <div className="">View All</div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          </Link>
      </div>
      <hr className="my-6"></hr>
        {/* Categories */}
        <div className="m-5 lg:m-10 lg:p-8 grid grid-cols md:grid-cols-3 gap-6 py-6 ">
          {categories.slice(0,3).map((item, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(item.name.toLowerCase())}
              className="bg-orange-200 cursor-pointer rounded-lg p-4 flex justify-between items-center hover:scale-105 duration-500 lg:flex-col lg:h-[200px] lg:justify-center lg:items-center"
            >
              <h2 className="font-bold sm:text-xl">{item.name}</h2>
              <img src={item.image} alt={item.name} className="w-20" />
            </div>
          ))}
        </div>
      </div>

      </div>
  );
}

export default LatestCategories;
