import React, { useEffect } from "react";
import { AtlSection } from "../Utils/Utils";

const UserGuide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AtlSection>
      <h1 className="animated-h1">Getting Started</h1>
    </AtlSection>
  );
}; 

export default UserGuide;
