export function loadScript(src, callback) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}

export function payWithRazorpay(orderId, amount) {
  const options = {
    key: process.env.REACT_APP_RAZOR_PAY_KEY, // Your Razorpay API key
    amount: amount, // Amount in paise (e.g., 100 means ₹1)
    currency: "INR",
    name: "Your Company Name",
    description: "Payment for your order",
    image: "",
    order_id: orderId,
    handler: function (response) {
      console.log(response.razorpay_payment_id);
      console.log(response.razorpay_order_id);
      console.log(response.razorpay_signature);
      // You can perform further actions here after successful payment
    },
    prefill: {
      name: "John Doe",
      email: "johndoe@example.com",
      contact: "1234567890",
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.on("payment.failed", function (response) {
    console.log(response.error.code);
    console.log(response.error.description);
    console.log(response.error.source);
  });
  razorpay.open();
}
