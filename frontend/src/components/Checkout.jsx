import React, { useContext, useEffect, useState } from "react";
import CartContext from "../CartContext";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { items, removeFromCart, getCartItemDetails, clearCart } = useContext(CartContext);
  const [rejectPayment, setRejectPayment] = useState(false);

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const cartItemDetails = getCartItemDetails();

  const total = cartItemDetails.reduce((acc, item) => acc + item.price * item.quantity, 0);


  const handleClearAll = () => {
    clearCart();
    localStorage.removeItem("oldcart"); // Clear cart items from local storage
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container relative mt-24 lg:mt-6 mx-auto p-5 ">
      <div className="px-6 lg:mx-5 lg:mt-6">
        {/*Header*/}
        <h1 className="font-bold text-2xl lg:text-3xl p-5 text-left">
          Check <span className="text-orange-500">Out</span>
        </h1>
        <hr />
        {/* Summary */}
        {cartItemDetails.length === 0 ? (
          <div>
            <p className="m-4 p-5 ">No items in cart... </p>
            <div className="flex justify-center items-center mt-5 p-3 ">
              <Link
                to="/menu"
                className="flex justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-orange-100 hover:shadow-sm text-orange-500"
              >
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
        ) : (
          <div className="m-5 flex flex-col justify-between items-center lg:items-start lg:flex-row">
            {/* Cart */}
            <div className="p-0 m-0">
              <div className="flex flex-col justify-center items-center ">
                {cartItemDetails.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-row gap-3 justify-center items-center p-4 border-b-gray-100"
                  >
                    <div className="flex  justify-between items-center border border-gray-100">
                      <div className="flex border">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 mr-4"
                          />
                        </div>
                        <div className="flex justify-start items-center gap-4 ">
                          <div className="flex flex-col">
                            <h3 className="text-sm">
                              {item.name}
                            </h3>
                            <span className="text-xs font-semibold">
                              x{item.quantity}
                            </span>
                          </div>
                          <p className="text-sm w-16 font-bold">${item.price}</p>
                        </div>
                      </div>
                      <div
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="m-1 p-2 rounded-full cursor-pointer hover:bg-red-600 hover:text-white"
                      >
                        <AiOutlineClose className="">
                          Remove from Cart
                        </AiOutlineClose>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              {/* Discount */}
              <div className="flex p-5">
                <div className="flex rounded-full gap-2 ">
                  <input
                    className="border border-gray-400 rounded-lg p-1 w-full focus:outline-none  placeholder-gray-300"
                    type="text"
                    placeholder="Discount Voucher..."
                  />
                  <button className="bg-blue-500 text-white rounded-lg px-5 hover:bg-blue-600 hover:text-white hover:border-none">
                    Apply
                  </button>
                </div>
              </div>
              <hr />
              {/* Total */}
              <div className="flex justify-between mt-5">
                <h3 className="">Total:</h3>
                <p className="text-2xl font-bold">${total.toFixed(2)}</p>
              </div>
              {/* Clear all */}
              <div className="mt-3">
                <button
                  onClick={handleClearAll}
                  className="border border-red-500 py-1 text-red-500 rounded-lg px-4  hover:bg-red-500 hover:text-white hover:border-none">
                  Clear All
                </button>
              </div>
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setRejectPayment(true)}
                  className="py-1 rounded-lg px-4 bg-orange-400 text-white hover:bg-orange-500 hover:text-white hover:border-none">
                  Proceed with payment
                </button>
              </div>
              <div className="mt-2 flex justify-center">
                {rejectPayment ? (<p className="text-red-500 text-sm animate-bounce">Invalid payment details</p>) : (<p></p>)}
              </div>
            </div>
            {/* Shipping */}
            <div className="mt-5 p-5 border border-gray-200">
              <h1 className="font-bold mb-2">Shipping:</h1>
              <div class="mb-3">
                <label class="text-gray-600 font-semibold text-sm mb-2 ml-1">
                  Full Name
                </label>
                <div>
                  <input
                    class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Shashwat"
                    type="text"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label class="text-gray-600 font-semibold text-sm mb-2 ml-1">
                  Address
                </label>
                <div>
                  <input
                    class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Mall Road"
                    type=""
                  />
                </div>
                <div class="mb-3">
                  <label class="text-gray-600 font-semibold text-sm mb-2 ml-1">
                    Phone Number
                  </label>
                  <div>
                    <input
                      class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="080XXXXXXXX"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label class="text-gray-600 font-semibold text-sm mb-2 ml-1">
                  Card number
                </label>
                <div>
                  <input
                    class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="0000 0000 0000 0000"
                    type="text"
                  />
                </div>
              </div>
              <div class="mb-3 -mx-2 flex items-end">
                <div class="px-2 w-1/4">
                  <label class="text-gray-600 font-semibold text-sm mb-2 ml-1">
                    Expiration date
                  </label>
                  <div>
                    <select class="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                      <option value="01">01 - January</option>
                      <option value="02">02 - February</option>
                      <option value="03">03 - March</option>
                      <option value="04">04 - April</option>
                      <option value="05">05 - May</option>
                      <option value="06">06 - June</option>
                      <option value="07">07 - July</option>
                      <option value="08">08 - August</option>
                      <option value="09">09 - September</option>
                      <option value="10">10 - October</option>
                      <option value="11">11 - November</option>
                      <option value="12">12 - December</option>
                    </select>
                  </div>
                </div>
                <div class="px-2 w-1/4">
                  <select class="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                  </select>
                </div>
                <div class="px-2 w-1/4">
                  <label class="text-gray-600 font-semibold text-sm mb-2 ml-1">
                    Security code
                  </label>
                  <div>
                    <input
                      class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="000"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
