import React, { useEffect } from "react";
import { AtlSection } from "../Utils/Utils";

const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AtlSection className="atl-pg landing-pg">
      <h1 className="animated-h1">Above The Line</h1>
    </AtlSection>
  );
};

export default Landing;
