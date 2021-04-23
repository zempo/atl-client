import React, { createContext, useState, useEffect } from "react";
import TokenService from "../Services/Auth/token-service";
import { readUser } from "../Services/endpoints-service";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [userName, setUserName] = useState("Error..");
  const [token, setToken] = useState(TokenService.hasAuthToken());
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
        setUser(result.data.payload);
        setAdmin(result.data.payload.admin);
        setUserName(result.data.payload.user_name);
        setUserColor(result.data.payload.theme);
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
    token,
    setUserColor,
    setToken,
    userName,
    admin,
    error,
    loading,
    setLoading,
  };

  return (
    <UserContext.Provider value={{ value }}>
      {props.children}
    </UserContext.Provider>
  );
};
