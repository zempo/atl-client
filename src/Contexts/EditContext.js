// store meta-data in here, update script object
import React, { createContext, useState } from "react";
import { autoSave } from "../Services/endpoints-service";

export const EditContext = createContext();

export const EditContextProvider = props => {
  const [currentScript, setCurrentScript] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateScript = newFields => {
    setCurrentScript(newFields);
  };

  const updateScriptBody = async (prevFields, value) => {
    setLoading(true);
    let newFields = prevFields;
    let fieldsToUpdate = {};
    newFields.body = value;
    fieldsToUpdate.body = value;
    setCurrentScript(newFields);

    try {
      const result = await autoSave.patch(`${prevFields.id}`, fieldsToUpdate);

      setTimeout(() => {
        setError(false);
        setLoading(false);
      }, 300);
    } catch (err) {
      console.log(err);
      setError(Object.values(err.response.data.error));
      setLoading(false);
    }
  };

  const updateTitlePage = async (prevFields, title, author, subtitle) => {
    let newFields = {};
    newFields.title = title;
    newFields.author = author;
    newFields.subtitle = subtitle;
    if (title === "") {
      newFields.title = "UNTITLED PROJECT";
    }
    try {
      const result = await autoSave.patch(`/${prevFields.id}`, newFields);
      setError(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(Object.values(err.response.data.error));
      setLoading(false);
    }
  };

  const addToActors = async (prevFields, newActor) => {
    let actorToAdd = newActor;
    setLoading(true);

    let newFields = prevFields;
    let fieldsToUpdate = {};

    try {
      const toUpdate = await autoSave.get(`${prevFields.id}`);
      fieldsToUpdate.actors = [...toUpdate.data[0].actors, newActor];
      const result = await autoSave.patch(`${prevFields.id}`, fieldsToUpdate);
      setError(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(Object.values(err.response.data.error));
      setLoading(false);
    }
  };

  const rmvFromActors = async (prevFields, prevActors, target) => {
    let filteredActors = prevActors.filter((actor, i) => i != target);

    setLoading(true);
    let newFields = prevFields;
    let fieldsToUpdate = {};
    fieldsToUpdate.actors = filteredActors;

    try {
      const result = await autoSave.patch(`/${prevFields.id}`, fieldsToUpdate);
      setError(false);
      setLoading(false);
      return filteredActors;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addToTags = async (prevFields, newTag) => {
    let tagToAdd = newTag;
    setLoading(true);

    let newFields = prevFields;
    let fieldsToUpdate = {};

    try {
      const toUpdate = await autoSave.get(`${prevFields.id}`);
      fieldsToUpdate.tags = [...toUpdate.data[0].tags, newTag];
      const result = await autoSave.patch(`${prevFields.id}`, fieldsToUpdate);
      setError(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(Object.values(err.response.data.error));
      setLoading(false);
    }
  };

  const rmvFromTags = async (prevFields, prevTags, target) => {
    let filteredTags = prevTags.filter((tag, i) => i != target);
    setLoading(true);
    let newFields = prevFields;
    let fieldsToUpdate = {};
    fieldsToUpdate.tags = filteredTags;
    // console.log(newFields);

    try {
      const result = await autoSave.patch(`/${prevFields.id}`, fieldsToUpdate);
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
    updateTitlePage,
    addToActors,
    rmvFromActors,
    addToTags,
    rmvFromTags,
    loading,
    setLoading,
    error
  };

  return (
    <EditContext.Provider value={{ value }}>
      {props.children}
    </EditContext.Provider>
  );
};
