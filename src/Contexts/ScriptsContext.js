import React, { createContext, useState, useEffect } from "react";
import { readScripts, newScript } from "../Services/endpoints-service";

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
        setSearching(false);
        setScripts(result.data);
        setSearchScripts(result.data);
      } catch (error) {
        console.log(error.response);
        if (
          error.response.data.error === "This user has no scripts at the moment"
        ) {
          const sampleScript = {
            title: "Starting Your Screenplay",
            author: "Solomon Zelenko",
            subtitle: "Above the Line",
            body:
              "[Header] Int. Real Voice LA - Noon [Action] In the recording booth, two voice actors glance down at their scripts and look expectantly towards the control room. An exec nods at a sound engineer, who then glances down at the console while giving the thumbs up. {Jane} ((V.O.)) Click on the header tag to add your slug-line or setting! You can even add a subheader, like this: [Header] Int. Tutorial - Misplaced Subheader {Jane} ((CON'T)) Just like that! (Beat) And, guess what? You can keep on typing after you click on a tag! {John} ((Also V.O.)) No need to keep googling those script indentations! {Jane} The script generator will take care of that for you! You can add action with the action tag. [Action] Some action happens here. [Shot] Establishing shot of this action. {John} But make sure to save your work! Use the sidebar to add new actors and scene directions! {Jane} Once you're ready to download your script, save it and click the generate button below! [Transition] Fade Out"
          };
          newScript.post("/", sampleScript).then(res => {
            window.location.reload();
          });
        }
        setSearching(false);
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
    setTimeout(() => {
      setDirection("");
    }, 10)
    if (id === "prev") {
      setCurrentPg(currentPg - 1);
      setTimeout(() => {
        setDirection("l");
      }, 50);
    } else if (id === "next") {
      setCurrentPg(currentPg + 1);
      setTimeout(() => {
        setDirection("r");
      }, 50);
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

  const addToScripts = (currentScripts, currentSearchScripts, scriptToAdd) => {
    setScripts([...currentScripts, scriptToAdd]);
    setSearchScripts([...currentSearchScripts, scriptToAdd]);
  };

  const editScripts = (
    currentScripts,
    currentSearchScripts,
    scriptToUpdate
  ) => {
    let scriptToEdit = [scriptToUpdate];
    let scriptsToEdit = currentScripts;
    let searchScriptsToEdit = currentSearchScripts;
    let editedScripts = scriptsToEdit.map(
      obj => scriptToEdit.find(o => o.id === obj.id) || obj
    );
    let editedSearchScripts = searchScriptsToEdit.map(
      obj => scriptToEdit.find(o => o.id === obj.id) || obj
    );

    setScripts(editedScripts);
    setSearchScripts(editedSearchScripts);
    // let isIE = false;
    // let ua = window.navigator.userAgent
    // let old_ie = ua.indexOf("MSIE")
    // let new_ie = ua.indexOf("Trident/")
    // let edge = ua.toLowerCase().indexOf("")

    // if (old_ie > -1 || new_ie > -1 || edge > -1) {
    //   isIE = true
    // }

    // if (isIE) {
    //   window.location.reload()
    // }
  };

  const value = {
    addToScripts,
    editScripts,
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
    setSearching,
    setSearchScripts,
    setScriptsPerPg,
    setSearchScriptsPerPg,
    loading,
    setLoading,
    error
  };

  return (
    <ScriptsContext.Provider value={{ value }}>
      {props.children}
    </ScriptsContext.Provider>
  );
};
