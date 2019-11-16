import React, { useEffect, useContext } from "react";
import { ScriptsContext } from "../../Contexts/ScriptsContext";
import { UserContext } from "../../Contexts/UserContext";
import { AtlSection, AddBtn, PaginateScripts } from "../Utils/Utils";
import ListScript from "../Utils/Scripts/ListScript";
import ListSearchScript from "../Utils/Scripts/ListSearchScript";
import "./Styles/ScriptsPage.css";

const ScriptsPage = () => {
  const {
    value: {
      scripts,
      scriptsPerPg,
      currentScripts,
      currentSearchScripts,
      searchScripts,
      searchScriptsPerPg,
      searching,
      currentPg,
      currentSearchPg,
      paginate,
      paginateSearch,
      lastPg,
      lastSearchPg
    }
  } = useContext(ScriptsContext);
  const {
    value: { userName }
  } = useContext(UserContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AtlSection className="atl-pg scripts-pg">
      <h1 className="animated-h1">My Works</h1>
      <AddBtn />
      <div className="scripts-container">
        {!searching
          ? currentScripts.map((script, i) => {
              return (
                <div key={i}>
                  <ListScript script={script} />
                </div>
              );
            })
          : currentSearchScripts.map((script, i) => {
              return (
                <div key={i}>
                  <ListSearchScript script={script} />
                </div>
              );
            })}
      </div>
      {scripts.length > scriptsPerPg && !searching ? (
        <PaginateScripts
          currentScripts={currentScripts}
          currentPg={currentPg}
          lastPg={lastPg}
          paginate={paginate}
        />
      ) : searchScripts.length > searchScriptsPerPg && searching ? (
        <PaginateScripts
          currentScripts={currentSearchScripts}
          currentPg={currentSearchPg}
          lastPg={lastSearchPg}
          paginate={paginateSearch}
        />
      ) : null}
    </AtlSection>
  );
};

export default ScriptsPage;
