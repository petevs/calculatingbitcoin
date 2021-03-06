import { Backdrop, CircularProgress } from "@mui/material";
import React, { useState, useReducer, useEffect, createContext } from "react";
import { setUser } from "state/actions/setUser";
import { auth } from "../../firebase";
import { authReducer, initialState } from "../reducers/authReducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(authReducer, initialState);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        userDispatch(setUser(user));
      } else {
        userDispatch(setUser(initialState));
      }
      setPending(false);
    });
  }, []);

  if (pending) {
    return (
    <Backdrop sx={{ backgroundColor: 'black'}} open>
      <CircularProgress />
    </Backdrop>);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
