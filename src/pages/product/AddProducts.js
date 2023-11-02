import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
const AddProducts = () => {
  const [pName, setPname] = useState("");
  const [pCategory, setPcategory] = useState("");
  const [pPrice, setPprice] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);
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
    };
    try {
      const product = await axios.post(
        `${process.env.REACT_APP_BASE_URL}product/add-product`,
        data
      );
      console.log(product);
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
                <button
                  type="submit"
                  className="text-teal-50 rounded p-2 bg-blue-600 mt-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div>Recentlt Added</div>
          <div>Message</div>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
