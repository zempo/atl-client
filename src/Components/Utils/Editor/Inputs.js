import React, { useContext, useState, useEffect } from "react";
import { ResizableBox as Box } from "react-resizable";
import { StyleContext } from "../../../Contexts/StyleContext";
import "../Styles/Editor.css";
import { EditContext } from "../../../Contexts/EditContext";
import { readScripts } from "../../../Services/endpoints-service";

const Input = ({ currentId, body, actors, tags }) => {
  const {
    value: { tenthHeight, tenthWidth }
  } = useContext(StyleContext);
  const {
    value: { currentScript, updateScriptBody }
  } = useContext(EditContext);
  const [currentBody, setCurrentBody] = useState(body);

  useEffect(() => {
    const findScript = async () => {
      try {
        const result = await readScripts.get(`/${currentId}`);
        setCurrentBody(result.data[0].body);
      } catch (error) {
        console.log(error);
      }
    };

    findScript();
  }, []);

  const handleChange = (e) => {
    // let current = dialogue
    // setDialogue(e.target.value)
    setCurrentBody(e.target.value);
    updateScriptBody(currentScript, e.target.value);
  };

  return (
    <>
      <Box className="box box-top" height={tenthHeight * 5} width={tenthWidth * 7.92} axis="both" resizeHandles={["s"]}>
        <form className="input-tags">
          <textarea value={currentBody} onChange={handleChange} />
        </form>
      </Box>
    </>
  );
};

export default Input;
