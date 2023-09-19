import React, { useState, useContext } from "react";
import {
  AiFillHome,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineClose,
} from "react-icons/ai";
import { FaFire, FaShoppingCart } from "react-icons/fa";
import {
  MdOutlineRestaurantMenu,
  MdCategory,
} from "react-icons/md";
import { Link } from "react-router-dom";
import CartContext from "../CartContext";
import { useNavigate } from "react-router-dom";
import tastylogo from '../assets/tastylogo.png';

function Navbar() {
  const [nav, setNav] = useState(false);
  const { items } = useContext(CartContext);
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate();

  const goToSearchPage = (e) => {
    e.preventDefault();
    navigate("/search/" + searchItem);
  };

  return (
    <div className="container fixed mx-auto p-4 bg-white top-0 left-0 right-0 z-10">
      <div className="px-0">
        <div className="flex flex-col gap-1 lg:flex lg:justify-between lg:flex-row">
          {/* Logo Container */}
          <div className="flex gap-2 lg:gap-20 items-center">
            {/* Hamburger Menu */}
            <div onClick={() => setNav(!nav)} className="cursor-pointer">
              <AiOutlineMenu
                size={30}
                className="text-black hover:shadow-wine-500 hover:shadow-sm duration-100"
              />
            </div>
            {/*  Logo */}
            <Link to="/" className="flex justify-between items-center gap-1 cursor-pointer">
              {/* <FaFire
                size={30}
                className="text-white rounded-full bg-gradient-to-r  from-orange-400 to-red-400"
              /> */}
              <img
                src={process.env.PUBLIC_URL + '/Restau_logo.png'}
                style={{ marginTop: '5px', width: '70px', height: 'auto' }}
                alt="Restau Logo"
              />
              <span className="text-3xl italic font-bold text-black">My Restaurant</span>
            </Link>
          </div>
          {/* Search & Cart Container */}
          <div className="flex gap-2 ">
            {/* Search Icon and input */}
            <form
              onSubmit={goToSearchPage}
              className="bg-wine-500 rounded-full shadow-orange-500 shadow-sm flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]"
            >
              <AiOutlineSearch size={25} className="" />
              <input
                //change place holder later in tailwind config
                onChange={(e) => setSearchItem(e.target.value)}
                className="bg-wine-500 p-2 w-full focus:outline-none rounded-full placeholder-gray-400 placeholder:italic"
                type="text"
                placeholder="Search food.."
              />
            </form>
            {/* Cart container */}
            <Link
              to="/checkout" className="bg-orange-400 hover:bg-orange-500 px-2 py-1 hover:shadow-lg rounded-full flex justify-between items-center gap-3 cursor-pointer">
              <div
                className=" flex justify-between items-center "
              >
                <FaShoppingCart size={25} className="mr-1" />
                <div className="flex justify-center item-center w-6 h-6 rounded-full bg-orange-600"><span className="text-sm font-bold text-white">{items.length > 0 ? (items.length) : (<p></p>)}</span></div>
              </div>
            </Link>
          </div>
        </div>
        {/* Mobile Menu */}
        {/* Overlay */}
        {nav ? (
          <div className="bg-black/80 absolute w-full h-screen z-10 top-0 left-0"></div>
        ) : (
          ""
        )}
        {/* Side drawer menu */}
        <div
          className={
            nav
              ? "container fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
              : "container fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
          }
        >
          <AiOutlineClose
            onClick={() => setNav(!nav)}
            size={30}
            className="absolute right-4 top-4 cursor-pointer "
          />
          <div className="flex  items-center flex-row p-5 gap-1">
            <FaFire
              size={30}
              className="text-white rounded-full bg-gradient-to-r  from-orange-400 to-red-400"
            />
            <img src={tastylogo} style={{ marginTop: '10px', width: '50px', height: 'auto' }} alt="Tastyy Logo" />


          </div>
          <nav>
            <ul className="flex flex-col p-4 ">
              <Link to="/"><li
                onClick={() => setNav(!nav)}
                className="text-xl py-4 px-5 flex cursor-pointer hover:bg-orange-300 hover:rounded-sm"
              >
                <div className="flex justify-between items-center ">
                  <AiFillHome size={25} className="mr-4 " /> Home
                </div>
              </li>
              </Link>
              <Link to="/menu">
                <li
                  onClick={() => setNav(!nav)}
                  className="text-xl py-4 px-5 flex cursor-pointer hover:bg-orange-300 hover:rounded-sm"
                >
                  <div className="flex justify-between items-center ">
                    <MdOutlineRestaurantMenu size={25} className="mr-4" /> Menu
                  </div>
                </li>
              </Link>
              <Link to="/categories">
                <li
                  onClick={() => setNav(!nav)}
                  className="text-xl py-4 px-5 flex cursor-pointer hover:bg-orange-300 hover:rounded-sm"
                >
                  <div

                    className="flex justify-between items-center "
                  >
                    <MdCategory size={25} className="mr-4" /> Categories
                  </div>
                </li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
