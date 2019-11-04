import React, { useEffect, useContext } from "react";
import { ScriptsContext } from "../../Contexts/ScriptsContext";
import { UserContext } from "../../Contexts/UserContext";
import { AtlSection } from "../Utils/Utils";

const ScriptsPage = () => {
  const {
    value: { scripts, currentPg }
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
    </AtlSection>
  );
};

export default ScriptsPage;
