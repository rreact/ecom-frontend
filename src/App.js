import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import UserRegister from "./pages/UserRegister";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import AddProductCategory from "./pages/product/AddProductCategory";
import ShowProductCategories from "./pages/product/ShowProductCategories";
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
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
