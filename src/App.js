import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Home from "./pages/Home";
import UserRegister from "./pages/UserRegister";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import AddProductCategory from "./pages/product/AddProductCategory";
import ShowProductCategories from "./pages/product/ShowProductCategories";
import AddProducts from "./pages/product/AddProducts";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <UserRegister />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/add-product-category",
    element: <AddProductCategory />,
  },
  {
    path: "/show-product-categories",
    element: <ShowProductCategories />,
  },
  {
    path: "/add-products",
    element: <AddProducts />,
  },
]);
function App() {
  return (
    <>
      {/* npm i @cfaester/enzyme-adapter-react-18 */}
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
