import React, { useEffect } from "react";
import { AtlSection } from "../Utils/Utils";

const ScriptEditor = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AtlSection>
      <h1 className="animated-h1">Editor</h1>
    </AtlSection>
  );
};

export default ScriptEditor;
