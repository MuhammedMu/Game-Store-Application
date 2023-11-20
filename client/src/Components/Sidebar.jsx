import React, { useEffect } from "react";
import { useContextGlobally } from "./StateProvider";
import importedData from "../Js/importedData";
import { Link } from "react-router-dom";

function Sidebar() {
  const {
    cart,
    toogleFalse,
    remove,
    totalPrice,
    increment,
    decrement,
    setTotalPrice,
    clear,
  } = useContextGlobally();
  const { x_button, removeIcon, card } = importedData;

  // useEffect(() => {
  //   setTotalPrice();
  // }, [cart]);

  return (
    <>
      {/* Sidebar Section */}
      <section className="container fixed lg:end-1 top-0 overflow-x-hidden max-w-full max-h-full backdrop-blur-sm z-20 flex justify-center lg:justify-end lg:ml-[120px]">
        {/* Shopping Cart */}
        <div className="container w-[99%] lg:w-[725px] box-border min-h-screen h-full lg:max-w-2xl border border-blue-500 lg:border-none bg-gradient-to-r from-slate-800   to-red-950   pt-2 sm:px-6 lg:pl-8 rounded-xl  ">
          *{/* Close button */}
          <button
            className="absolute end-4 top-4 text-white transition hover:scale-110"
            onClick={() => toogleFalse()}
          >
            <span className="sr-only">Close cart</span>
            <img
              className="h-7 w-7 bg-blue-700 hover:object-scale-down border-2 border-blue-700 rounded-full p-1 hover:border-red-500"
              src={x_button}
              alt=""
            />
          </button>
          {/* Title  */}
          <h1 className="text-white text-xl font-bold lg:text-3xl ml-7 text-start">
            Shooping Cart
          </h1>
          {/* No cart Item  */}
          {cart.length == 0 ? (
            <h1 className="text-slate-500 absolute lg:w-60 font-bold  justify-center text-xl lg:text-3xl  top-1/2 right-[30%] md:right-[38%] lg:right-48">
              No Cart Items
            </h1>
          ) : null}
          {/* Cart Item List  */}
          <div className="w-full  pr-2 scrollbar-thin lg:scrollbar-thumb-rounded-md lg:scrollbar-thumb-slate-400  scrollbar-track-slate-600 scrollbar-track-rounded-full mt-4 h[50%]  md:h-[550px]  overflow-auto ">
            <ul className=" space-y-3 h-full pt-1 rounded-xl items-center ">
              {/* Displaying items in the cart */}
              {cart?.map((single, index) => {
                let total = single?.price;
                total += total;

                return (
                  <li
                    className="flex container w-full h-[120px] pl-2 rounded-lg  items-center   bg-gradient-to-tl from-blue-800 to-blue-950"
                    key={index}
                  >
                    <div className="w-60 flex mr-5">
                      <img
                        src={single?.image}
                        alt=""
                        className="h-[90px]  lg:h-24 rounded object-contain"
                      />
                    </div>

                    <div className="mt-4 lg:h-[90%]  lg:flex lg:mt-1 items-center  m-auto  ">
                      <div className=" lg:w-48  text-[10px] text-white">
                        {/* Item name */}
                        <h3 className="text-white text-sm lg:text-[15px] font-medium ">
                          {single?.name}
                        </h3>

                        {/* Item price */}
                        <div className="flex mt-2">
                          <div className="text-sm lg:text-md">Price:</div>
                          <div className="text-sm lg:text-[16px]  text-blue-400 flex gap-1  ml-2">
                            <div className="text-yellow-400 text-md">$</div>
                            <div className="text-white text-sm">
                              {single?.price}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 w-48 h-7 lg:w-60  items-center ">
                        {/* increment decrement button  */}
                        <div className="items-center lg:justify-end ">
                          <div className="flex items-center w-28  lg:w-32 justify-between">
                            {/* Increment button */}
                            <button
                              className="flex h-5 w-5 lg:h-6 lg:w-6 bg-slate-500 p-0 text-center  text-white items-center justify-center rounded-md text-xl lg:text-md hover:border-2  hover:border-blue-400 hover:text-blue-400"
                              onClick={() => increment(single?.name)}
                            >
                              +
                            </button>
                            {/* Item quantity */}
                            <div className="flex h-6 w-6 lg:h-7 lg:w-7 border-gray-200 bg-slate-300 text-center text-sm lg:text-xl font-bold text-black items-center justify-center rounded-md ">
                              {single?.count}
                            </div>
                            {/* Decrement button */}
                            <button
                              className="flex h-5 w-5 lg:h-6 lg:w-6 bg-slate-500 p-0 text-center  text-white items-center justify-center rounded-md text-sm lg:text-xl hover:border-2  hover:border-blue-400 hover:text-blue-400 hover:scale-110"
                              onClick={() => decrement(single?.name)}
                            >
                              -
                            </button>
                            {/* Remove button */}
                            <button
                              className="text-white transition hover:scale-110"
                              onClick={() => remove(single.name)}
                            >
                              <img className="w-5" src={removeIcon} alt="" />
                            </button>
                          </div>
                        </div>

                        <div className="text-white text-sm   h-[70px]  lg:w-24 lg:h-11  text-center">
                          <div className="text-[14px] lg:text-[16px]">
                            Sub total
                          </div>
                          <div className="flex justify-center gap-1 items-center">
                            <div className="text-yellow-400 text-lg">$</div>
                            <div className=" text-sm lg:text-lg">
                              {/* {(
                                (single?.price + 0.99) * single?.count +
                                single?.price * 0.15
                              ).toFixed(2)} */}

                              {(
                                single?.count * single?.price +
                                single?.price * 0.15
                              ).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Cart total and tax */}
          {cart.length > 0 ? (
            <div className="container w-full ml-2 lg:w-[98%] space-y-1 mt-3 md:mt-5 ">
              <hr className="border-slate-500 pt-4 " />

              <div className="flex  text-xl items-center lg:text-2xl justify-between text-blue-500 font-bold  mr-4">
                <div className="flex space-x-4 text-center items-center font-normal justify-center  h-fit mb-5 ">
                  <Link to={"/pay"}>
                    <button
                      onClick={() => toogleFalse()}
                      className=" w-28 lg:w-40 md:h-11 bg-gradient-to-r from-blue-500 to-blue-700 text-white lg:font-bold py-2 px-5 md:py-3 md:px-6 rounded-full shadow-lg transform transition-all hover:scale-105  "
                    >
                      <div className="flex gap-1 text-xs lg:text-sm lg:gap-2 items-center justify-center">
                        <img
                          src={card}
                          className="w-4 lg:w-6 object-contain"
                          alt=""
                        />
                        Checkout
                      </div>
                    </button>
                  </Link>
                  <button
                    onClick={() => clear()}
                    className="bg-gradient-to-r w-28 lg:w-40 md:h-11 from-red-500 to-red-700 text-white lg:font-bold py-2 px-5 md:py-3 md:px-6 rounded-full shadow-lg transform transition-all hover:scale-105  "
                  >
                    <div className="flex text-xs lg:text-sm lg:gap-2 items-center justify-center">
                      {/* <img src={card} className="w-6 object-contain" alt="" /> */}
                      Clear Cart
                    </div>
                  </button>
                </div>

                <div className="flex  gap-2 items-center  mb-5 w-28  pl-2 md:w-fit">
                  <div className=" text-white text-sm md:text-lg  gap">
                    Total :
                  </div>

                  <div className="flex items-center gap-1 text-white text-sm lg:text-xl ">
                    <div className="text-blue-500 text-lg lg:text-2xl">$</div>
                    {totalPrice}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

export default Sidebar;
