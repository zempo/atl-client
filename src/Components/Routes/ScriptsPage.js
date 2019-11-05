import React, { useEffect, useContext } from "react";
import { ScriptsContext } from "../../Contexts/ScriptsContext";
import { UserContext } from "../../Contexts/UserContext";
import { AtlSection } from "../Utils/Utils";
import ListScript from "../Utils/Scripts/ListScript";
import ListSearchScript from "../Utils/Scripts/ListSearchScript";

const ScriptsPage = () => {
  const {
    value: { currentScripts, currentSearchScripts, searching }
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
    </AtlSection>
  );
};

export default ScriptsPage;
