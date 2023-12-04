import React from "react";
import Navbar from "../components/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useMyContext } from "../context/Store";
const GoogleOAuthBtn = () => {
  const { state, dispatch } = useMyContext();
  console.log("state", state);
  const userInfo = async (response) => {
    try {
      if (response?.credential) {
        const token = await axios.post(
          `${process.env.REACT_APP_BASE_URL}auth/verify`,
          response
        );
        console.log("token", token);

        if (token?.data.user) {
          dispatch({
            type: "OAUTH",
            payload: {
              name: token?.data.user.name,
              email: token?.data.user.email,
              picture: token?.data.user.picture,
              email_verfied: true,
            },
          });
        } else {
          dispatch({
            type: "OAUTH",
            payload: {
              name: null,
              email: null,
              picture: null,
              email_verfied: false,
            },
          });
        }
      }
    } catch (err) {
      console.log("err", err);
      dispatch({
        type: "OAUTH",
        payload: {
          name: null,
          email: null,
          picture: null,
          email_verfied: false,
        },
      });
    }
  };

  const userError = (err) => {
    console.log(err);
  };
  const Gresponse = (e) => {
    console.log("gres", e);
  };
  return (
    <>
      {/* <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
      > */}
      <h1>Welcome to Dashboard</h1>
      <GoogleLogin
        type="icon"
        onSuccess={userInfo}
        onError={userError}
        useOneTap
      />
      ;{/* </GoogleOAuthProvider> */}
    </>
  );
};

export default GoogleOAuthBtn;
