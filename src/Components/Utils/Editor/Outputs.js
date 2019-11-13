import React, { useContext } from "react";
import { ResizableBox as Box } from "react-resizable";
import { StyleContext } from "../../../Contexts/StyleContext";
import "../Styles/Editor.css";

const Output = () => {
  const {
    value: { tenthHeight, tenthWidth }
  } = useContext(StyleContext);

  return (
    <>
      <Box
        className="box box-bottom"
        height={tenthHeight * 7.5}
        width={tenthWidth * 7.92}
        axis="both"
        resizeHandles={["s"]}
      >
        <p>Output</p>
      </Box>
    </>
  );
};

export default Output;
