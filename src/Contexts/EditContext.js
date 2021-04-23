// store meta-data in here, update script object
import React, { createContext, useState } from "react";
import { autoSave } from "../Services/endpoints-service";

export const EditContext = createContext();

export const EditContextProvider = (props) => {
  const [currentScript, setCurrentScript] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateScript = (newFields) => {
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
      // eslint-disable-next-line
      const result = await autoSave.patch(`${prevFields.id}`, fieldsToUpdate);
      const scriptDidUpdate = await autoSave.get(`${prevFields.id}`);

      setTimeout(() => {
        setError(false);
        setLoading(false);
      }, 300);

      return scriptDidUpdate.data.payload;
    } catch (err) {
      console.log(err);
      setError(Object.values(err.response.data.message));
      setLoading(false);
    }
  };

  const updateTitlePage = async (prevFields, title, author, subtitle) => {
    let newFields = {};
    // newFields.title = title;
    // newFields.author = author;
    if (title !== "") {
      newFields.title = title;
    }
    if (author !== "") {
      newFields.author = author;
    }
    if (subtitle !== "") {
      newFields.subtitle = subtitle;
    }
    try {
      // eslint-disable-next-line
      const result = await autoSave.patch(`/${prevFields.id}`, newFields);
      const didUpdateTitlePg = await autoSave.get(`/${prevFields.id}`);
      setError(false);
      setLoading(false);
      return didUpdateTitlePg.data.payload[0];
    } catch (err) {
      console.log(err);
      setError(Object.values(err.response.data.message));
      setLoading(false);
    }
  };

  const addToActors = async (prevFields, newActor) => {
    // eslint-disable-next-line
    let actorToAdd = newActor;
    setLoading(true);
    // eslint-disable-next-line
    let newFields = prevFields;
    let fieldsToUpdate = {};

    try {
      const toUpdate = await autoSave.get(`${prevFields.id}`);
      fieldsToUpdate.actors = [...toUpdate.data.payload[0].actors, newActor];
      // eslint-disable-next-line
      const result = await autoSave.patch(`${prevFields.id}`, fieldsToUpdate);
      setError(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(Object.values(err.response.data.message));
      setLoading(false);
    }
  };

  const rmvFromActors = async (prevFields, prevActors, target) => {
    // eslint-disable-next-line
    let filteredActors = prevActors.filter((actor, i) => i != target);

    setLoading(true);
    // eslint-disable-next-line
    let newFields = prevFields;
    let fieldsToUpdate = {};
    fieldsToUpdate.actors = filteredActors;

    try {
      // eslint-disable-next-line
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
    // eslint-disable-next-line
    let tagToAdd = newTag;
    setLoading(true);
    // eslint-disable-next-line
    let newFields = prevFields;
    let fieldsToUpdate = {};

    try {
      const toUpdate = await autoSave.get(`${prevFields.id}`);
      fieldsToUpdate.tags = [...toUpdate.data.payload[0].tags, newTag];
      // eslint-disable-next-line
      const result = await autoSave.patch(`${prevFields.id}`, fieldsToUpdate);
      setError(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(Object.values(err.response.data.message));
      setLoading(false);
    }
  };

  const rmvFromTags = async (prevFields, prevTags, target) => {
    // eslint-disable-next-line
    let filteredTags = prevTags.filter((tag, i) => i != target);
    setLoading(true);
    // eslint-disable-next-line
    let newFields = prevFields;
    let fieldsToUpdate = {};
    fieldsToUpdate.tags = filteredTags;
    // console.log(newFields);

    try {
      // eslint-disable-next-line
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
    error,
  };

  return (
    <EditContext.Provider value={{ value }}>
      {props.children}
    </EditContext.Provider>
  );
};
