import React from "react";
import Navbar from "../components/Navbar";
import OAuth2Btn from "../components/OAuth2Btn";
import GoogleOAuthBtn from "../components/GoogleOAuthBtn";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <GoogleOAuthBtn />
    </>
  );
};

export default Dashboard;
