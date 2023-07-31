import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "../store/configureStore";
import { store } from "../store/configureStore";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(store.getState().auth.currentUser);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCurrentUser(store.getState().auth.currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user: currentUser }}>{children}</AuthContext.Provider>;
  // return <AuthContext.Provider value={{ user: null }}>{children}</AuthContext.Provider>;
};

export default function useAuth() {
  return useContext(AuthContext);
}
