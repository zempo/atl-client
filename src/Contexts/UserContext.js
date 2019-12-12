import React, { createContext, useState, useEffect } from "react";
import { readUser } from "../Services/endpoints-service";

export const UserContext = createContext();

export const UserContextProvider = props => {
  const [userName, setUserName] = useState("Error..");
  const [admin, setAdmin] = useState(false);
  const [userColor, setUserColor] = useState("#455A64");
  const [user, setUser] = useState({});
  const [error, setError] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      setError(0);
      try {
        const result = await readUser.get("/");

        setLoading(false);
        setUser(result.data);
        setAdmin(result.data.admin);
        setUserName(result.data.user_name);
        setUserColor(result.data.theme);
        setError(0);
      } catch (err) {
        setError(err.response.status);
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const value = {
    user,
    userColor,
    setUserColor,
    userName,
    admin,
    error,
    loading,
    setLoading
  };

  return (
    <UserContext.Provider value={{ value }}>
      {props.children}
    </UserContext.Provider>
  );
};
