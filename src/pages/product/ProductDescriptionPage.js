import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { ToastError } from "../../components/Toast";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../context/Store";
const ProductDescriptionPage = () => {
  const [item, setItem] = useState([]);
  const [order, setOrder] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const { state, dispatch } = useMyContext();

  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    try {
      const product = await axios.get(
        `${process.env.REACT_APP_BASE_URL}product/get-product/${id}`
      );
      if (product?.status === 200) {
        console.log(product.data.product);
        setItem(product.data.product);
      }
    } catch (err) {
      ToastError("invalid product id", "top-right");
      navigate("/");
    }
  };

  const buyItem = async () => {
    // http://localhost:5100/orders/create-order-id

    try {
      let orderInfo = await axios.post(
        `${process.env.REACT_APP_BASE_URL}orders/create-order-id`,
        item._id
      );
      if (orderInfo?.data) {
        setOrder({
          id: orderInfo.data.order.id,
          amount: orderInfo.data.order.amount,
        });
        dispatch({
          type: "ORDER",
          payload: {
            id: orderInfo.data.order.id,
            amount: orderInfo.data.order.amount,
          },
        });
        navigate("/order-details");
        // console.log(orderInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar />
      {item && item?.product_image ? (
        <>
          <div className="grid grid-cols-2 gap-1">
            <div className="flex">
              <img
                className="w-full"
                src={item.product_image.image_data}
                alt={item.product_image.image_name}
              />
            </div>
            <div className="flex flex-col">
              <div className="p-3 m-1 bg-gray-300 self-center">
                {item?.product_name}
              </div>
              <div>
                <div className="p-3 m-1 bg-gray-300">{item?.product_price}</div>
                <div className="p-3 m-1 bg-gray-300">
                  {item?.product_description}
                </div>
                <div>
                  <button
                    className="px-3 py-2 m-1 bg-teal-600 text-white-900 rounded"
                    onClick={buyItem}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ProductDescriptionPage;
