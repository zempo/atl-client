import React, { useContext } from "react";
import { ResizableBox as Box, Resizable } from "react-resizable";
import { StyleContext } from "../../../Contexts/StyleContext";
import "../Styles/Editor.css";

const Sidebar = () => {
  const {
    value: { winHeight, tenthWidth }
  } = useContext(StyleContext);

  return (
    <>
      <div className="box box-sidebar" style={{ height: `${winHeight}px`, width: `${tenthWidth * 2}px` }}>
        <p>Sidebar</p>
      </div>
    </>
  );
};

export default Sidebar;
