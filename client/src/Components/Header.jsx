// Import necessary modules and assets
import importedData from "../Js/importedData";
import { useContextGlobally } from "./StateProvider";
import react_icon from "../assets/Images/react.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../Js/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Destructure specific icons from importedData
const { down, bag, userIcon, logout, searchIcon } = importedData;

// Define the Header functional component
function Header() {
  // Extract necessary functions and states using useContextGlobally
  const { cart, toogle, toogleTrue, toogleFalse, isLoggedIn, firebaseLogout, search } =
    useContextGlobally();

  // Initialize state variables for account visibility and username
  const [account, setAccount] = useState("hidden");
  const [userName, setUserName] = useState("");

  // Display a warning toast if attempting actions without signing in
  const notifySignin = () => toast.warning("Sign in to your Gamestore account first");

  // Fetch and set the username from localStorage upon component mount
  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
  }, [localStorage.getItem("userName")]);

  // Handle sign-out functionality
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      firebaseLogout();
      localStorage.removeItem("userName");
      localStorage.removeItem("userID");
      window.location.reload(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Check login status and display warning if not logged in
  const checkLogin = () => {
    isLoggedIn ? null : notifySignin();
  };

  return (
    // Header container with a fixed position
    <div className="fixed z-10 border-white w-full h-16 md:h-[70px] bg-gradient-to-r from-slate-950 via-slate-800 to-red-950 pt-[11px]">
      <div className="mx-5 flex">
        <div className="relative w-[100%] flex justify-between">
          {/* Game Store Logo */}
          <Link to={"/"}>
            <div className="h-12 w-40 md:w-44 gap-2 flex items-center transform transition-transform duration-300 hover:scale-105">
              <div className="w-6">
                <img src={react_icon} alt="react-icon" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-white">
                GameStore
              </div>
            </div>
          </Link>

          {/* Search container */}
          <div className="relative container md:flex hidden z-10 w-full md:w-[30%] mt-2 justify-center h-8">
            <div>
              {/* Search button */}
              <button className="absolute ml-[85%] md:ml-[85%] lg:ml-[90%] xl:ml-[92%] mt-[6px] box-border rounded-e-full w-8 focus:border-e-slate-700 ">
                {/* Search icon */}
                <img src={searchIcon} alt="search-icon" className="w-5 " />
              </button>
            </div>
            {/* Search input field */}
            <input
              type="text"
              name=""
              id=""
              placeholder="Search..."
              className="bg-transparent border text-sm overflow-hidden w-[90%] md:w-full mx-auto rounded-full outline-none focus:border-2 focus:border-blue-500 pl-7 text-white"
              onChange={(e) => {
                // Update search state with the input value
                console.log(e.target.value);
                search(e.target.value);
              }}
            />
          </div>

          {/* Home, My Games, Checkout navigation */}
          <div className="flex gap-4">
            {/* Home */}
            <div className="flex px-5">
              <Link to={"/"}>
                <div
                  className="flex pl-5 py-3 items-center text-white text-sm cursor-pointer gap-2 transform transition-transform duration-300 hover:scale-125"
                >
                  <div>Home</div>
                </div>
              </Link>
              {/* My Games */}
              <Link to={"/orders"}>
                <div
                  onClick={() => checkLogin()}
                  className="flex pl-5 py-3 items-center text-white text-sm cursor-pointer gap-2 transform transition-transform duration-300 hover:scale-125"
                >
                  <div>My Games</div>
                </div>
              </Link>
              {/* Checkout */}
              <Link to={"/pay"}>
                <div
                  onClick={() => checkLogin()}
                  className="flex pl-5 py-3 items-center text-white text-sm cursor-pointer gap-2 transform transition-transform duration-300 hover:scale-125"
                >
                  <div>Checkout</div>
                </div>
              </Link>
            </div>

            {/* Shopping Cart Icon */}
            <div className="flex items-center gap-5">
              <div
                className="flex z-20 hover:cursor-pointer w-[120px] h-8 gap-2 justify-center rounded-full items-center py-1 font-bold text-white text-base bg-blue-950 border-2 border-blue-500 transform transition-transform duration-500 hover:scale-110"
                onClick={() => toogleTrue()}
              >
                <img className="text-white w-5" src={bag} alt="shopping-bag-icon" />
                <div className="text-white text-sm md:text-base">Cart</div>
                {/* Display the number of items in the cart */}
                <div className="flex text-sm w-5 h-5 md:w-6 md:h-6 md:text-lg font-bold bg-white text-black rounded-full justify-center items-center">
                  {cart?.length}
                </div>
              </div>

              {/* Account actions */}
              {userName === null ? (
                <Link to={"/login"} className="z-30">
                  <div className="flex pl-5 p-3  items-center text-white text-sm cursor-pointer bg-gradient-to-tl from-blue-700 gap-2 to-blue-900 rounded-full ">
                    <img className="w-7" src={userIcon} alt="login-icon" />
                    <div className="transform transition-transform duration-300 hover:scale-105">
                      Login to your account
                    </div>
                  </div>
                </Link>
              ) : (
                <Link to={"/"}>
                  <div
                    onClick={() => handleSignOut()}
                    className="flex pl-5 py-2 px-3 items-center text-white text-sm cursor-pointer bg-gradient-to-tl from-red-700 to-red-900 gap-2 rounded-full"
                  >
                    <img className="w-7 object-contain" src={userIcon} alt="logout-icon" />
                    <div className="transform transition-transform duration-300 hover:scale-105">
                      Welcome Muhammed 
                    </div>
                  </div>
                </Link>
              )}

              {/* Account dropdown */}
              <div className={`${account} z-50 w-72 absolute end-3 top-14 bg-slate-800 rounded-lg shadow-2xl`}>
                <div className="flex px-5 py-3 text-center text-white text-sm md:text-base">
                  <img
                    src={userIcon}
                    className="w-[30px] border-2 border-slate-400 focus:outline-none group-focus:border-white rounded-full"
                    alt="user-icon"
                  />
                  <div className="pl-3 pr-2">{userName ? userName : "Login to an account"}</div>
                </div>

                {/* Navigation links in the account dropdown */}
                <Link to={"/"}>
                  <div onClick={() => handleSignOut()} className="flex pl-5 py-3 items-center text-white text-sm cursor-pointer gap-2 transform transition-transform duration-300 hover:scale-125">
                    <div>Home</div>
                  </div>
                </Link>

                {/* Filter and sorting options */}
                <div className="ml-3 flex flex-col gap-3">
                  {/* Platform filter */}
                  <select
                    name="platform"
                    id=""
                    className="bg-slate-800 hover:cursor-pointer text-white text-[12px] md:text-[14px] bg-gradient-to-r from-blue-500 to-blue-800 w-28 md:w-32 h-8 rounded-full pl-5 transform transition-transform duration-300 hover:scale-110"
                  >
                    {/* Platform options */}
                    <option className="hidden">Platform</option>
                    <option value="PC">PC</option>
                    <option value="PlayStation 4">PlayStation</option>
                    <option value="Xbox One">Xbox</option>
                    <option value="iOS">iOS</option>
                    <option value="Android">Android</option>
                    <option value="Linux">Linux</option>
                    <option value="Nintendo Switch">Nintendo</option>
                  </select>

                  {/* Order by filter */}
                  <select
                    name="platform"
                    id=""
                    className="bg-slate-800 hover:cursor-pointer text-white text-[12px] bg-gradient-to-r from-blue-500 to-blue-800 w-28 md:w-32 h-8 rounded-full pl-5 md:text-[14px] transform transition-transform duration-300 hover:scale-110"
                  >
                    {/* Order by options */}
                    <option className="hidden" value="">
                      Order By
                    </option>
                    <option value="nameAscending">Name A-Z</option>
                    <option value="nameDescending">Name Z-A</option>
                    <option value="dateAscending">Date ↑</option>
                    <option value="dateDescending">Date ↓</option>
                    <option value="popularityAscending">Popularity ↑</option>
                    <option value="popularityDescending">Popularity ↓</option>
                    <option value="ratingAscending">Rating ↑</option>
                    <option value="ratingDescending">Rating ↓</option>
                  </select>
                </div>

                {/* My Games and Checkout links in the account dropdown */}
                <Link to={"/orders"}>
                  <div onClick={() => checkLogin()} className="flex pl-5 py-3 items-center text-white text-sm cursor-pointer gap-2 transform transition-transform duration-300 hover:scale-125">
                    <div>My Games</div>
                  </div>
                </Link>
                <Link to={"/pay"}>
                  <div onClick={() => checkLogin()} className="flex pl-5 py-3 items-center text-white text-sm cursor-pointer gap-2 transform transition-transform duration-300 hover:scale-125">
                    <div>Checkout</div>
                  </div>
                </Link>

                {/* Login/Logout links in the account dropdown */}
                {userName === null ? (
                  <Link to={"/login"} className="z-30">
                    <div className="flex pl-5 py-3 items-center text-white text-sm cursor-pointer bg-gradient-to-tl from-blue-700 gap-2 to-blue-900 rounded-b-lg ">
                      <img className="w-4" src={logout} alt="login-icon" />
                      <div className="transform transition-transform duration-300 hover:scale-105">
                        Login to your account
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link to={"/"}>
                    <div onClick={() => handleSignOut()} className="flex pl-5 py-3 items-center text-white text-sm cursor-pointer bg-gradient-to-tl from-red-700 to-red-900 gap-3 rounded-b-lg">
                      <img className="w-4 object-contain" src={logout} alt="logout-icon" />
                      <div className="transform transition-transform duration-300 hover:scale-105">
                        Logout from your account
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast notification container */}
      <ToastContainer toastStyle={{ backgroundColor: "#334155", color: "white" }} />
    </div>
  );
}

// Export the Header component
export default Header;
