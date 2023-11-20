// This file defines a custom context, a state provider component, and a custom hook to access the global state and actions.

import React, { createContext, useContext, useReducer } from "react";
import reducer from "../Js/reducer";

// Create a new context
export const Context = createContext();

// Parse the cart data from localStorage, or initialize it as an empty array if it doesn't exist.
const cartFromLocalStorage = JSON.parse(localStorage?.getItem("cart")) || [];
const totalPriceFomLocalStorage =
  JSON.parse(localStorage.getItem("totalPrice")) || 0;
const isLoggedInFromLocalStorage =
  JSON.parse(localStorage.getItem("isLoggedIn")) || false;

// StateProvider component that wraps the application and manages global state
function StateProvider({ children }) {
  // Initial state of the application
  const initial = {
    allGames: [], // Initialize an empty array for all games
    filterdData: [], // Initialize an empty array for filtered data
    cart: cartFromLocalStorage, // Set the cart data from localStorage (or empty array if not found)
    toggle: false, // A boolean flag to toggle cart UI element
    totalPrice: totalPriceFomLocalStorage, // Initialize the total price of items in the cart
    // loadedData: false, // A boolean flag to indicate if data has been loaded, for initial loading
    platform: "", // Initialize platform data
    orderType: "", // Initialize order type
    gameTitle: "All", // Initialize game title
    noSearchData: false, // A boolean flag to indicate if there's no search data
    isLoggedIn: isLoggedInFromLocalStorage,
  };

  // Functions to perform actions and update the state using the reducer

  function setAllGames(data) {
    dispatch({ type: "SET_GAME_DATA", payload: data });
  }

  function initializeFilterData(name) {
    dispatch({ type: "INITIALIZE", payload: name });
  }
  function search(name) {
    dispatch({ type: "SEARCH", payload: name });
  }

  function filter(data, filterType, filterName, title) {
    dispatch({
      type: "FILTER",
      payload: { data, filterType, filterName, title },
    });
  }

  function toogleTrue() {
    dispatch({ type: "TOOGLE_TRUE" });
  }

  function toogleFalse() {
    dispatch({ type: "TOOGLE_FALSE" });
  }

  function firebaseLogin() {
    dispatch({ type: "LOGIN" });
  }

  function firebaseLogout() {
    dispatch({ type: "LOGOUT" });
  }

  function add(image, name, price) {
    dispatch({ type: "ADD_TO_CART", image: image, name: name, price: price });
  }

  function remove(name) {
    dispatch({ type: "REMOVE", payload: name });
  }

  function clear() {
    dispatch({ type: "CLEAR" });
  }

  function increment(name) {
    dispatch({ type: "INCREMENT_CART", name: name });
  }

  function decrement(name) {
    dispatch({ type: "DECREMENT_CART", name: name });
  }

  // function setTotalPrice() {
  //   dispatch({ type: "TOTALPRICE" });
  // }

  // Use the reducer to manage state updates
  const [state, dispatch] = useReducer(reducer, initial);

  // Debugging: log the current state to the console
  // console.log(state);

  // Provide the state and action functions to the child components through the context
  return (
    <Context.Provider
      value={{
        ...state,
        add,
        remove,
        clear,
        toogleTrue,
        toogleFalse,
        // getAllPrice,
        increment,
        decrement,
        setAllGames,
        search,
        filter,
        initializeFilterData,
        // setTotalPrice,
        firebaseLogin,
        firebaseLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
}

// Custom hook to access the global state and actions
export const useContextGlobally = () => {
  return useContext(Context);
};

export default StateProvider;
