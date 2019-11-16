import React, { createContext, useState, useEffect } from "react";
import { readScripts } from "../Services/endpoints-service";

export const ScriptsContext = createContext();

export const ScriptsContextProvider = props => {
  const [scripts, setScripts] = useState([]);
  const [currentPg, setCurrentPg] = useState(1);
  const [scriptsPerPg, setScriptsPerPg] = useState(6);
  const [searching, setSearching] = useState(false);
  const [searchScripts, setSearchScripts] = useState([]);
  const [currentSearchPg, setCurrentSearchPg] = useState(1);
  const [searchScriptsPerPg, setSearchScriptsPerPg] = useState(6);
  const [direction, setDirection] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const scriptsFound = async () => {
      setLoading(true);
      try {
        const result = await readScripts.get("/");

        setLoading(false);
        setScripts(result.data);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    scriptsFound();
  }, []);

  let indexLastScript = currentPg * scriptsPerPg;
  let indexFirstScript = indexLastScript - scriptsPerPg;
  let currentScripts = scripts.slice(indexFirstScript, indexLastScript);
  let lastPg = Math.ceil(scripts.length / scriptsPerPg);

  let indexLastSearch = currentSearchPg * searchScriptsPerPg;
  let indexFirstSearch = indexLastSearch - searchScriptsPerPg;
  let currentSearchScripts = searchScripts.slice(
    indexFirstSearch,
    indexLastSearch
  );
  let lastSearchPg = Math.ceil(searchScripts.length / searchScriptsPerPg);

  const paginate = e => {
    const { id } = e.target;
    setDirection("");
    if (id === "prev") {
      setCurrentPg(currentPg - 1);
      setTimeout(() => {
        setDirection("l");
      }, 30);
    } else if (id === "next") {
      setCurrentPg(currentPg + 1);
      setTimeout(() => {
        setDirection("r");
      }, 30);
    }
  };

  const paginateSearch = e => {
    const { id } = e.target;
    setDirection("");
    if (id === "prev") {
      setDirection("l");
      setCurrentSearchPg(currentSearchPg - 1);
    } else if (id === "next") {
      setDirection("r");
      setCurrentSearchPg(currentSearchPg + 1);
    }
  };

  const value = {
    direction,
    setDirection,
    searching,
    scripts,
    scriptsPerPg,
    currentPg,
    currentScripts,
    lastPg,
    lastSearchPg,
    searchScripts,
    searchScriptsPerPg,
    currentSearchPg,
    currentSearchScripts,
    paginate,
    paginateSearch,
    lastSearchPg,
    loading,
    error
  };

  return (
    <ScriptsContext.Provider value={{ value }}>
      {props.children}
    </ScriptsContext.Provider>
  );
};
