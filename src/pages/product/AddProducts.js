import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { ToastSuccess } from "../../components/Toast";
import { useMyContext } from "../../context/Store";

const AddProducts = () => {
  const [pName, setPname] = useState("");
  const [pCategory, setPcategory] = useState("");
  const [pPrice, setPprice] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState({});
  const fileInputRef = useRef(null);
  useEffect(() => {
    fetchCategories();
    getProducts();
  }, []);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("file", file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setImage(() => {
          return {
            image_name: file.name,
            image_data: reader.result,
            content_type: file.type,
          };
        });
        console.log("res", reader.result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  };
  const getProducts = async () => {
    try {
      let product = await axios.get(
        `${process.env.REACT_APP_BASE_URL}product/get-products`
      );

      setProducts(product.data.products);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCategories = async () => {
    try {
      const category = await axios.get(
        `${process.env.REACT_APP_BASE_URL}product/get-product-list`
      );
      if (category) {
        setCategories(category.data.categories);
      } else {
        setCategories([]);
      }
    } catch (error) {
      setCategories([]);
      console.log(error);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();

    const data = {
      p_name: pName,
      p_category: pCategory,
      p_price: pPrice,
      p_image: image,
    };
    try {
      const product = await axios.post(
        `${process.env.REACT_APP_BASE_URL}product/add-product`,
        data
      );

      if (product?.status === 201) {
        ToastSuccess("prodct created", "top-right");
        getProducts();
        setPname("");
        setPcategory("");
        setPprice("");
        fileInputRef.current.value = null;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-1">
          <div>
            <form onSubmit={addProduct}>
              <div className="sm:col-span-3">
                <label
                  htmlFor="p_category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category Name
                </label>
                <div className="mt-2">
                  <select
                    value={pCategory}
                    onChange={(e) => setPcategory(e.target.value)}
                    name="p_category"
                    className="block w-full rounded-md border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select a category</option>
                    {categories && categories.length > 0
                      ? categories.map((c, i) => {
                          return (
                            <option key={i} value={c.id}>
                              {c.category}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="p_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={pName}
                    onChange={(e) => setPname(e.target.value)}
                    name="p_name"
                    className="block w-full rounded-md border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="Price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="Price"
                    value={pPrice}
                    onChange={(e) => setPprice(e.target.value)}
                    className="block w-full rounded-md border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="Price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    name="image"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e)}
                    className="block w-full rounded-md border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="text-teal-50 rounded p-2 bg-blue-600 mt-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="w-full">
            <ul className="ul-flex m-1 px-2 w-100 ">
              <li className="bg-green-900">Product</li>
              <li className="bg-green-900">Price</li>
              <li className="bg-green-900">image</li>
            </ul>
            {products && products.length > 0
              ? products.map((pro, i) => {
                  return (
                    <ul className="ul-flex m-1 px-2 w-100 ">
                      <li className="bg-green-200 p-1">{pro.product_name}</li>
                      <li className="bg-green-200 p-1">{pro.product_price}</li>
                      <li className="bg-green-200 p-1">
                        {pro.product_image?.image_data ? (
                          <img
                            width={50}
                            src={pro.product_image?.image_data}
                            alt={pro.product_image?.image_name}
                          />
                        ) : (
                          "no image"
                        )}
                      </li>
                    </ul>
                  );
                })
              : null}
          </div>

          <div>
            {image && image?.image_data ? (
              <img src={image.image_data} alt={image.image_name} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
