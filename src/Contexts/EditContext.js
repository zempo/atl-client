// store meta-data in here, update script object
import React, { createContext, useState } from "react";
import { autoSave } from "../Services/endpoints-service";

export const EditContext = createContext();

export const EditContextProvider = (props) => {
  const [currentScript, setCurrentScript] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const updateScript = (newfields) => {
    setCurrentScript(newfields);
  };

  const updateScriptBody = async (prevFields, value) => {
    let newfields = prevFields;
    newfields.body = value;
    setCurrentScript(newfields);

    try {
      const result = await autoSave.patch(`${prevFields.id}`, newfields);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    currentScript,
    updateScript,
    updateScriptBody
  };

  return <EditContext.Provider value={{ value }}>{props.children}</EditContext.Provider>;
};
