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
import { MyProvider } from "./context/Store";
import ProductDescriptionPage from "./pages/product/ProductDescriptionPage";
import Navbar from "./components/Navbar";
import OrderPage from "./pages/product/OrderPage";
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
  {
    path: "/product/:id",
    element: <ProductDescriptionPage />,
  },
  {
    path: "/order-details",
    element: <OrderPage />,
  },
]);
function App() {
  return (
    <>
      <MyProvider>
        {/* npm i @cfaester/enzyme-adapter-react-18 */}
        <RouterProvider router={router} />
        <ToastContainer />
      </MyProvider>
    </>
  );
}

export default App;
