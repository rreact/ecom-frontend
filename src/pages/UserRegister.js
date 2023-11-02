// import sha256 from "crypto-js/sha256";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Navbar from "../components/Navbar";
const UserRegister = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    mob: "",
    dob: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  useEffect(() => {}, [errors]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error message for the field being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const newErrors = {};
    setMsg("");

    if (!formData.fname.trim()) {
      newErrors.fname = "Firstname is required";
    }
    if (!formData.lname.trim()) {
      newErrors.lname = "Lastname is required";
    }

    if (!formData.mob.trim()) {
      newErrors.mob = "Mobile number is required";
    } else if (formData.mob.length < 10) {
      newErrors.mob = "Mobile number should be 10 digits";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }

    if (!formData.dob.trim()) {
      newErrors.dob = "DOB is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password should be more then 8 characters";
    }

    if (Object.keys(newErrors).length === 0) {
      // Handle form submission here
      //   formData.password = sha256(formData.password).toString();
      console.log("Form data:", formData);
      const url = process.env.REACT_APP_BASE_URL;
      const headers = {
        Authorization: "Brearer TOKEN",
        "Content-Type": "application/json",
      };
      try {
        const res = await axios.post(
          url + "v1/user/register",
          formData,
          headers
        );
        const user = await res;

        if (user?.data.user) {
          setFormData({
            fname: "",
            lname: "",
            email: "",
            mob: "",
            dob: "",
            password: "",
          });
          setMsg(user.data.msg);
          toast.success(user.data.msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (err) {
        setErrors(newErrors);
      }
    } else {
      setErrors(newErrors);
      console.log(newErrors);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-1">
          <div>{msg && <h1 className="text-green-600">{msg}</h1>}</div>
          <div>
            <form onSubmit={submitForm}>
              <div className="sm:col-span-3">
                <label
                  htmlFor="fname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.fname && (
                    <span className="text-red-700">{errors.fname}</span>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="lname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.lname && (
                    <span className="text-red-700">{errors.lname}</span>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <span className="text-red-700">{errors.email}</span>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="mobNo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mobile Number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="mob"
                    value={formData.mob}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.mob && (
                    <span className="text-red-700">{errors.mob}</span>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  DOB
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.dob && (
                    <span className="text-red-700">{errors.dob}</span>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-2 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <span className="text-red-700">{errors.password}</span>
                  )}
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

export default UserRegister;
