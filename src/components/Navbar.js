import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-teal-600 p-3 mb-2">
      <div className="flex">
        <div className="basis-1/3">Navbar</div>
        <div className="basis-1/2">
          <NavLink className="mx-2" to="/">
            Dashboard
          </NavLink>
          <NavLink className="mx-2" to="/show-product-categories">
            List
          </NavLink>
          <NavLink className="mx-2" to="/add-product-category">
            Add Category
          </NavLink>
          <NavLink className="mx-2" to="/add-products">
            Add Product
          </NavLink>
        </div>
        <div className="basis-1/5">User info</div>
      </div>
    </nav>
  );
};

export default Navbar;

// const navigation = [
//   { name: "Dashboard", href: "/", current: false },
//   {
//     name: "list",
//     href: "show-product-categories",
//     current: false,
//   },
//   { name: "Add Category", href: "add-product-category", current: false },
//   { name: "Add Product", href: "add-products", current: false },
// ];
