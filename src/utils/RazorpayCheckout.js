import React from "react";
import { useEffect } from "react";
import { loadScript, payWithRazorpay } from "./Razorpay";

const RazorpayCheckout = ({ orderId, amount }) => {
  useEffect(() => {
    // Load the Razorpay script dynamically
    loadScript("https://checkout.razorpay.com/v1/razorpay.js", () => {
      console.log("Razorpay script loaded");
    });
  }, []);

  const handlePayment = () => {
    payWithRazorpay(orderId, amount);
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  );
};

export default RazorpayCheckout;
