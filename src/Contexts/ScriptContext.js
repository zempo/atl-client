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
      } catch (error) {}
    };
  });
};
