import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  // Define your initial state properties here
  user: {
    name: null,
    email: null,
    mob: null,
    token: null,
  },
  order: {},
  oauth: {},
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    // Define different cases for your actions
    // For example:
    case "LOGIN":
      return {
        ...state,
        user: {
          name: null,
          email: null,
          mob: null,
          token: null,
        },
      };
    case "ORDER":
      return {
        ...state,
        order: {
          id: action?.payload.id,
          amount: action?.payload.amount,
        },
      };
    case "OAUTH":
      return {
        ...state,
        user: {
          name: action.payload?.name,
          email: action.payload?.email,
        },
        oauth: {
          name: action.payload?.name,
          picture: action.payload?.picture,
          email: action.payload?.email,
          email_verified: true,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        user: {
          name: null,
          email: null,
          mob: null,
          token: null,
        },
        order: {},
      };
    default:
      return state;
  }
};

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};

export { useMyContext, MyProvider };
