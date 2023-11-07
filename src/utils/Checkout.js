import React from "react";
export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.orderId,
      amount: props.amount,
    };
    // this.changeAmount = this.changeAmount.bind(this);
    this.openCheckout = this.openCheckout.bind(this);
    console.log(props);
    console.log(this.state);
  }
  //   changeAmount(e) {
  //     this.setState({ amount: e.target.value });
  //   }

  openCheckout() {
    let options = {
      key: process.env.REACT_APP_RAZOR_PAY_KEY,
      amount: this.state.amount, // 2000 paise = INR 20, amount in paisa
      order_id: this.state.id,
      name: "Merchant Name",
      description: "Purchase Description",
      image: "/your_logo.png",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
      },
      prefill: {
        name: "Harshil Mathur",
        email: "harshil@razorpay.com",
        contact: "9876543210",
      },
      notes: {
        address: "Hello World",
      },
      theme: {
        color: "#F37254",
      },
    };

    let rzp = new window.Razorpay(options);
    rzp.open();
  }

  render() {
    return (
      <div>
        <button onClick={this.openCheckout}>Pay Rs. {this.state.amount}</button>
      </div>
    );
  }
}
