import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
  }, []);
  const goToProductPage = (id) => {
    navigate(`/product/${id}`);
  };
  const getProducts = async () => {
    try {
      let product = await axios.get(
        `${process.env.REACT_APP_BASE_URL}product/get-products`
      );
      console.log(product.data.products);
      setProducts(product.data.products);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3 gap-1">
        {products && products?.length > 0
          ? products.map((pro, i) => {
              return (
                <div
                  onClick={() => goToProductPage(pro._id)}
                  key={i}
                  className="flex flex-col text-center p-3 bg-gray-200 m-1"
                >
                  <img
                    className="w-1/2 self-center"
                    src={pro.product_image?.image_data}
                    alt={pro.product_image?.image_name}
                  />
                  <span>{pro.product_name}</span>
                  <span>{pro.product_price}</span>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default Home;
