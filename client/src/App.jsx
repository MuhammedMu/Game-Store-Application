import React from "react";
import Collector from "./Components/Collector";
import "./App.css";
import StateProvider from "./Components/StateProvider";
import Account from "./Components/Account";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Payment from "./Components/Payment";
import MyOrders from "./Components/MyOrders";
import Header from "./Components/Header";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute";

// Replace this with your actual Stripe publishable key
const promise = loadStripe(
  "pk_test_51NslULH42Ru23ju26XmnxfsSjITu160E6iVqcAqou1tUyIWEOH4B0J0PaALz0Igr007aBs1xF9BuZTaVDwV8ZNoP00vjLcQg6N"
);

function App() {
  return (
    <div className="">
      <StateProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Collector />} />
            <Route path="/login" element={<Account />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/orders" element={<MyOrders />} />
              <Route
                path="/pay"
                element={
                  <Elements stripe={promise}>
                    <Payment />
                  </Elements>
                }
              />
            </Route>
          </Routes>
        </Router>
      </StateProvider>
    </div>
  );
}

export default App;
