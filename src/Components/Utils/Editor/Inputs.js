import React, { useContext } from "react";
import { ResizableBox as Box, Resizable } from "react-resizable";
import { StyleContext } from "../../../Contexts/StyleContext";
import "../Styles/Editor.css";

const Input = () => {
  const {
    value: { tenthHeight, tenthWidth }
  } = useContext(StyleContext);

  return (
    <>
      <Box className="box box-bottom" height={tenthHeight * 5} width={tenthWidth * 8} axis="both" resizeHandles={["s"]}>
        <p>Input</p>
      </Box>
    </>
  );
};

export default Input;
