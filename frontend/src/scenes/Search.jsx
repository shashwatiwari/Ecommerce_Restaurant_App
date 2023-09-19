import React from "react";
import { food } from "../data/data";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import { LiaSearchSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';

function Search() {
  const [results, setResults] = useState([]);
  let params = useParams();

  function searchFood(query) {
    query = query.toLowerCase(); // Convert the search query to lowercase for case-insensitive matching
    const matchingFood = food.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    return matchingFood;
  }

  useEffect(() => {
    setResults(searchFood(params.search));
  }, [params.search]); //to update everytime we search

  return (
    <div class="container mt-32 lg:mt-12 mx-auto p-5 ">
      <div className="px-6 lg:mx-5 lg:mt-6">
        {/*Header*/}
        <div className="flex justify-start items-center gap-2">
          <h1 className="font-bold text-2xl lg:text-3xl text-left">
            Search <span className="text-orange-500">Results</span>
          </h1>
          <LiaSearchSolid size={25} className="mt-1" />
        </div>
        <hr className="my-6"></hr>
        {results.length > 0 ? (
          <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 lg:m-5 lg:p-8 gap-6 pt-4 bg-transparent rounded-2xl ">
          {results.map((item, index) => (
            <FoodCard key={index} item={item} />
          ))}
        </div>
          
          
        ) : (<p>No result found for <b>"{params.search}" </b> </p>
          
        )}
        <div>
          <div className="flex justify-center items-center mt-5 p-3 ">
          <Link to="/menu" className="flex justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-orange-100 hover:shadow-sm text-orange-500">
              <div className="">View All Menu</div>
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
        </div>
      </div>
    </div>
  );
}

export default Search;
