import { useRouteError } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Navbar />
      {error && <h1>{error.statusText || error.message}</h1>}
    </>
  );
}
