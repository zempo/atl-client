import React, { createContext, useState, useEffect } from "react";
import { readUser } from "../Services/endpoints-service";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [userName, setUserName] = useState("Error..");
  const [userColor, setUserColor] = useState("#263238");
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
        setUserName(result.data.user_name);
        setUserColor(result.data.theme);
        setUserColor("#AD1457");
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
    userName,
    error,
    loading
  };

  return <UserContext.Provider value={{ value }}>{props.children}</UserContext.Provider>;
};
