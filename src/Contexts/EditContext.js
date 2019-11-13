// store meta-data in here, update script object
import React, { createContext, useState } from "react";
import { autoSave } from "../Services/endpoints-service";

export const EditContext = createContext();

export const EditContextProvider = (props) => {
  const [currentScript, setCurrentScript] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateScript = (newfields) => {
    setCurrentScript(newfields);
  };

  const updateScriptBody = async (prevFields, value) => {
    setLoading(true);
    let newfields = prevFields;
    newfields.body = value;
    setCurrentScript(newfields);

    try {
      const result = await autoSave.patch(`${prevFields.id}`, newfields);
      setError(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(Object.values(err.response.data.error));
      setLoading(false);
    }
  };

  const addToActors = async (prevActors, newActor) => {
    console.log(prevActors, newActor);
  };

  const rmvFromActors = async (prevFields, prevActors, target) => {
    let filteredActors = prevActors.filter((actor, i) => i != target);

    setLoading(true);
    let newfields = prevFields;
    newfields.actors = filteredActors;

    try {
      const result = await autoSave.patch(`/${prevFields.id}`, newfields);
      setError(false);
      setLoading(false);
      return filteredActors;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addToTags = async (prevTags, newTag) => {
    console.log(prevTags, newTag);
  };

  const rmvFromTags = async (prevFields, prevTags, target) => {
    let filteredTags = prevTags.filter((tag, i) => i != target);
    setLoading(true);
    let newfields = prevFields;
    newfields.tags = filteredTags;
    // console.log(newfields);

    try {
      const result = await autoSave.patch(`/${prevFields.id}`, newfields);
      setError(false);
      setLoading(false);
      return filteredTags;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const value = {
    currentScript,
    updateScript,
    updateScriptBody,
    addToActors,
    rmvFromActors,
    addToTags,
    rmvFromTags,
    loading,
    error
  };

  return <EditContext.Provider value={{ value }}>{props.children}</EditContext.Provider>;
};
