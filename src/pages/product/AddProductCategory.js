import React, { useState, useRef } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

const AddProductCategory = () => {
  const [cName, setCName] = useState("");
  const [cType, setcType] = useState("");
  const [pImage, setPImage] = useState("");
  const [img, setImg] = useState("");
  const [msg, setMsg] = useState("");
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setImg(reader.result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  };
  const AddProductCategory = async (e) => {
    e.preventDefault();
    let formData = {
      product_category: cName,
      product_warranty: cType,
      product_image: {
        image_name: pImage.name,
        content_type: pImage.type,
        image_data: img,
      },
    };
    if (formData) {
      try {
        let product = await axios.post(
          process.env.REACT_APP_BASE_URL + "product/category",
          formData
        );

        if (product) {
          setCName("");
          setcType("");
          setPImage("");
          fileInputRef.current.value = null;
          setImg("");
          setMsg("Category Added Successfully !");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-1">
          <div>{msg && <h2 className="text-green-700">{msg}</h2>}</div>
          <div>
            <form onSubmit={AddProductCategory}>
              <div className="sm:col-span-3">
                <label
                  htmlFor="c_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="c_name"
                    value={cName}
                    onChange={(e) => setCName(e.target.value)}
                    className="block w-full rounded-md border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="c_type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Warranty Period
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="c_type"
                    value={cType}
                    onChange={(e) => setcType(e.target.value)}
                    className="block w-full rounded-md border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="c_image"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category Image
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    name="c_image"
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
        </div>
      </div>
    </>
  );
};

export default AddProductCategory;
