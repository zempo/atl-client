import React, { createContext, useState, useEffect } from "react";
import { readScripts } from "../Services/endpoints-service";

export const ScriptsContext = createContext();

export const ScriptsContextProvider = (props) => {
  const [scripts, setScripts] = useState([]);
  const [currentPg, setCurrentPg] = useState(1);
  const [scriptsPerPg, setScriptsPerPg] = useState(7);
  const [searching, setSearching] = useState(false);
  const [searchScripts, setSearchScripts] = useState([]);
  const [currentSearchPg, setCurrentSearchPg] = useState(1);
  const [searchScriptsPerPg, setSearchScriptsPerPg] = useState(7);
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
  let currentSearchScripts = searchScripts.slice(indexFirstSearch, indexLastSearch);
  let lastSearchPg = Math.ceil(searchScripts.length / searchScriptsPerPg);

  const value = {
    scripts,
    currentPg,
    currentScripts,
    lastPg,
    searchScripts,
    currentSearchPg,
    currentSearchScripts,
    lastSearchPg
  };

  return <ScriptsContext.Provider value={{ value }}>{props.children}</ScriptsContext.Provider>;
};
