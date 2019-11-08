import React, { useContext, useState } from "react";
import { ResizableBox as Box } from "react-resizable";
import { StyleContext } from "../../../Contexts/StyleContext";
import "../Styles/Editor.css";
import { EditContext } from "../../../Contexts/EditContext";

const Input = ({ actors, tags }) => {
  const {
    value: { tenthHeight, tenthWidth }
  } = useContext(StyleContext);
  const {
    value: { currentScript }
  } = useContext(EditContext);

  return (
    <>
      <Box className="box box-top" height={tenthHeight * 5} width={tenthWidth * 7.92} axis="both" resizeHandles={["s"]}>
        <form className="input-tags">
          <fieldset></fieldset>
          {currentScript.body}
        </form>
      </Box>
    </>
  );
};

export default Input;
