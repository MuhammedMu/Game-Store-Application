// Import necessary modules and components
import React, { useEffect, useState } from "react";
import importedData from "../Js/importedData";
import { useContextGlobally } from "./StateProvider";
import { useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import { addDoc, collection } from "firebase/firestore";
import db from "../Js/firebase";
import axiosClient from "../Js/axiosClient";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the CreditCardForm functional component
const CreditCardForm = () => {
  // Destructure values from the global context provider
  const {
    cart,
    totalPrice,
    remove,
    increment,
    decrement,
    // setTotalPrice,
    clear,
  } = useContextGlobally();

  // Initialize state variables
  const [stripeProcessing, setStripeProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const { toogle } = useContextGlobally();
  const { removeIcon, stripeIcon } = importedData;

  // Define functions to display toast notifications
  const notifySuccess = () => toast.success("Payment successful!");
  const notifySignin = () =>
    toast.warning("Sign in to your Gamestore account first");
  const notifyError = () => toast.warning();
  const notifyEmpty = () => toast.warning("Fill all your account data");

  // Initialize navigation using React Router
  const navigate = useNavigate();

  // Initialize a Firestore collection reference

  // Initialize the Stripe hook
  const stripe = useStripe();
  const elements = useElements();

  // Effect to update the total price when the cart changes
  // useEffect(() => {
  //   setTotalPrice();
  // }, [cart]);

  // Effect to fetch the client secret for Stripe payment
  console.log(totalPrice);

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axiosClient.post(
          `/payment/create?total=${totalPrice * 100}`
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error.message);
      }
    };

    getClientSecret();
  }, []);

  console.log(clientSecret);

  // Handle form submission for payment
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const userName = localStorage.getItem("userName");
  //   const userID = localStorage.getItem("userID");

  //   // if (!cart || cart.length === 0) {
  //   //   console.log("Cart is empty");
  //   //   return; // Return to exit the function
  //   // }
  //   if (userName == null || userID == null) {
  //     notifySignin();
  //     return;
  //   }

  //   // console.log(typeof cart);

  //   setStripeProcessing(true);

  //   try {
  //     const { paymentIntent, error } = await stripe.confirmCardPayment(
  //       clientSecret,
  //       {
  //         payment_method: {
  //           card: elements.getElement(CardElement),
  //         },
  //       }
  //     );

  //     if (error) {
  //       notifyEmpty();
  //       setStripeProcessing(false);
  //       return;
  //     } else if (paymentIntent.status === "succeeded") {
  //       // Payment succeeded
  //       notifySuccess();
  //       addToFirestore();
  //       setStripeProcessing(false);
  //     }
  //   } catch (error) {
  //     notifyError(
  //       "An error occurred while processing payment. Please try again later."
  //     );
  //     setStripeProcessing(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const userName = localStorage.getItem("userName");
    // const userID = localStorage.getItem("userID");

    // if (userName == null || userID == null) {
    //   notifySignin();
    //   return;
    // }

    setStripeProcessing(true);

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        notifyEmpty();
      } else if (paymentIntent.status === "succeeded") {
        notifySuccess();
        addToFirestore();
      }
    } catch (error) {
      notifyError(
        "An error occurred while processing payment. Please try again later."
      );
    } finally {
      setStripeProcessing(false);
    }
  };

  // Add payment details to Firestore
  const addToFirestore = async () => {
    const colRef = collection(db, "games");
    try {
      // navigate("/pay");
      const currentDateTime = new Date().toLocaleString();
      const userName = localStorage.getItem("userName");
      const userID = localStorage.getItem("userID");

      const cartWithTimeAndUser = cart.map((item) => ({
        ...item,
        time: currentDateTime,
        userName: userName,
        userID: userID,
      }));

      await addDoc(colRef, {
        cartWithTimeAndUser,
      });

      localStorage?.removeItem("cart");
      clear();

      navigate("/orders");
    } catch (error) {
      console.error("Error adding cart data to Firestore:", error);
    }
  };

  // Return JSX for rendering the component
  return (
    <div className="pt-[50px] overflow-hidden w-screen h-screen bg-gradient-to-r from-slate-950 via-slate-800 to-red-950 ">
      <div className="w-full md:w-[620px] h-[280px] mx-auto  ">
        {/* Credit card  */}
        <div className="flex w-full  my-10  p-5 shadow-lg shadow-black  bg-gradient-to-tl from-cyan-900 via-cyan-800 to-cyan-900  h-full rounded-xl justify-center items-center">
          {/* Card */}
          <div className="card  space-y-2   w-full   ">
            <h1 className="text-white text-xl md:text-3xl pl-5 mb-2 font-bold">
              Payment Card Information
            </h1>
            {/* Form for card input */}
            <form onSubmit={handleSubmit} className="w-full  h-fit">
              <div className="p-4  rounded-lg shadow-md">
                <div className="bg-white rounded-lg p-4 border border-gray-300">
                  <div className="rounded-lg p-4 border border-gray-400">
                    {/* Stripe Card Element */}
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#333",
                            "::placeholder": {
                              color: "#64748b",
                              // // fontWeight: "bold",
                              // fontSize: "19px",
                            },
                          },
                          invalid: {
                            color: "#ff0000",
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 w-fit mx-auto h-10 lg:h-11  text-white font-semibold  px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 justify-center items-center bg-gradient-to-r from-blue-700 via-blue-400 to-blue-50 ">
                {stripeProcessing ? (
                  <button
                    disabled
                    className="flex text-lg gap-3 h-full lg:text-md lg:font-bold  items-center "
                  >
                    Processing...
                    <img
                      src={stripeIcon}
                      className="w-12 object-cover"
                      alt=""
                    />
                  </button>
                ) : (
                  <button className="flex text-lg gap-3 h-full md:text-xs lg:text-[19px] lg:font-bold  items-center ">
                    Pay now with
                    <img
                      src={stripeIcon}
                      className="w-12 object-cover"
                      alt=""
                    />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer
        toastStyle={{ backgroundColor: "#334155", color: "white" }}
      />

      {toogle && <Sidebar />}

      <div className="container relative  w-[95%] mt-7  md:w-[80%]  lg:w-[55%] h-[42%] mx-auto overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-slate-400  scrollbar-track-slate-600 scrollbar-track-rounded-full md:pr-2">
        <div className="pr-3  h-full   ">
          {cart?.length == 0 ? (
            <h1 className="text-slate-500 absolute lg:w-60  justify-center text-xl lg:text-3xl  top-1/2 right-[38%] lg:right-64 font-bold ">
              No Cart Items
            </h1>
          ) : null}
          <ul className=" space-y-3 h-full pt-1 rounded-xl ">
            <div className="text-white font-bold text-xl md:text-3xl ">
              Shopping Cart
            </div>
            {cart?.map((single, index) => {
              return (
                <li
                  className="flex relative shadow-lg shadow-black container  w-full h-[120px] pl-2 rounded-lg  items-center   bg-gradient-to-tl from-blue-800 to-blue-950  "
                  key={index}
                >
                  <div className="w-[70%] md:w-fit ">
                    <img
                      src={single?.image}
                      alt=""
                      className="h-[90px] lg:h-24 rounded object-contain"
                    />
                  </div>

                  <div className="w-[60%] md:w-[75%] pl-2 mt-4 lg:h-[90%] lg:flex lg:mt-1 items-center justify-around ">
                    <div className=" w-11/12 lg:w-48  text-[10px] text-white ">
                      {/* Item name */}
                      <h3 className="text-white text-xs lg:text-[15px] font-medium ">
                        {single?.name}
                      </h3>

                      {/* Item price */}
                      <div className="flex mt-2">
                        <div className="text-xs lg:text-lg">Price:</div>
                        <div className="text-xs lg:text-[16px]  text-blue-400 flex gap-1  ml-2">
                          <div className="text-yellow-400 text-sm lg:text-lg">
                            $
                          </div>
                          <div className="text-white text-sm lg:text-lg">
                            {single?.price}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex w-[80%] lg:w-60 items-center ">
                      {/* Increment and decrement buttons */}
                      <div className="items-center lg:justify-end ">
                        <div className="flex items-center w-28   lg:w-32 justify-between">
                          {/* Increment button */}
                          <button
                            className="flex h-5 w-5 lg:h-6 lg:w-6 bg-slate-500 p-0 text-center  text-white items-center justify-center rounded-md text-xs lg:text-md hover:border-2  hover:border-blue-400 hover:text-blue-400"
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
                            className="flex h-5 w-5 lg:h-6 lg:w-6 bg-slate-500 p-0 text-center  text-white items-center justify-center rounded-md text-xs lg:text-xl hover:border-2  hover:border-blue-400 hover:text-blue-400 hover:scale-110"
                            onClick={() => decrement(single?.name)}
                          >
                            -
                          </button>
                          {/* Remove button */}
                          <button
                            className="text-white transition hover:scale-110"
                            onClick={() => remove(single.name)}
                          >
                            <img className="w-4 pb-1" src={removeIcon} alt="" />
                          </button>
                        </div>
                      </div>

                      <div className="text-white text-xs ml-5 w-24 md:h-14  text-center">
                        <div className="text-xs lg:text-[15px]">Subtotal</div>
                        <div className="flex justify-center gap-1 items-center">
                          <div className="text-yellow-400 text-xs lg:text-lg">
                            $
                          </div>
                          <div className=" text-xs lg:text-lg">
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
      </div>
      <div className="flex justify-center  gap-2 items-center mt-5 mb-5 w-28 mx-auto  pl-2 md:w-fit">
        <div className=" text-white text-sm md:text-lg  gap">Total :</div>

        <div className="flex items-center gap-1 text-white text-sm lg:text-xl ">
          <div className="text-blue-500 text-lg lg:text-2xl">$</div>
          {totalPrice}
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm; // Export the CreditCardForm component
