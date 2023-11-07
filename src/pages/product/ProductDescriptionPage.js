import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { ToastError } from "../../components/Toast";
import { useNavigate } from "react-router-dom";
const ProductDescriptionPage = () => {
  const [item, setItem] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
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
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ProductDescriptionPage;
