// store meta-data in here, update script object
import React, { createContext, useState, useEffect } from "react";
import { readScripts } from "../Services/endpoints-service";

export const EditContext = createContext();

export const EditContextProvider = (props) => {
  const [currentScript, setCurrentScript] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const updateScript = (newfields) => {
    setCurrentScript(newfields);
  };

  const value = {
    currentScript,
    updateScript
  };

  return <EditContext.Provider value={{ value }}>{props.children}</EditContext.Provider>;
};
