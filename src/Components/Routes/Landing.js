import React, { useEffect } from "react";
import { AtlSection } from "../Utils/Utils";
import { EditorLogo } from "../../Images/SVGS";

const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AtlSection className="atl-pg landing-pg">
      <h1 className="animated-h1">Above The Line</h1>
      <EditorLogo />
    </AtlSection>
  );
};

export default Landing;
