import React, { useEffect, useContext } from "react";
import { AtlSection } from "../Utils/Utils";
import Input from "../Utils/Editor/Inputs";
import Output from "../Utils/Editor/Outputs";
import Sidebar from "../Utils/Editor/Sidebar";
import { UserContext } from "../../Contexts/UserContext";
import { EditContext } from "../../Contexts/EditContext";
import { HotKeys } from "react-hotkeys";

const keyMap = {
  HOT_SAVE: "alt+s",
  GRAB_CURSOR: { sequence: "SPACE_BAR", action: "keydown" },
  DEFAULT_CURSOR: { sequence: "SPACE_BAR", action: "keyup" }
};

const ScriptEditor = props => {
  const {
    value: { userColor }
  } = useContext(UserContext);
  const {
    value: { updateScript }
  } = useContext(EditContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (props.location.state !== undefined) {
      const { item } = props.location.state;
      updateScript(item);
    }
  }, []);

  return (
    <HotKeys keyMap={keyMap}>
      <AtlSection
        className="atl-page editor-pg"
        style={{ outline: `3.5rem solid ${userColor}` }}
      >
        <Input
          body={props.location.state.item.body}
          currentId={props.location.state.item.id}
        />
        <Output />
        <Sidebar
          history={props.history}
          currentId={props.location.state.item.id}
        />
      </AtlSection>
    </HotKeys>
  );
};

export default ScriptEditor;
