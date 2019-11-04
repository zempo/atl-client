import React, { useEffect } from "react";
import { AtlSection } from "../Utils/Utils";

const UserSettings = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <AtlSection>
      <h1 className="animated-h1">Update My Settings</h1>
    </AtlSection>
  );
};

export default UserSettings;
