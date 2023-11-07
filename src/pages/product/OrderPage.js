import React from "react";
import Navbar from "../../components/Navbar";

import { useMyContext } from "../../context/Store";
import Checkout from "../../utils/Checkout";
const OrderPage = () => {
  const { state, dispatch } = useMyContext();
  console.log(state);
  return (
    <>
      <Navbar />
      <Checkout orderId={state.order.id} amount={state.order.amount} />
    </>
  );
};

export default OrderPage;
