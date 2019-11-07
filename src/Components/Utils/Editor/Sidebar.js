import React, { useContext } from "react";
import { StyleContext } from "../../../Contexts/StyleContext";
import "../Styles/Editor.css";
import { BackBtn } from "../Utils";

const Sidebar = ({ history }) => {
  const {
    value: { winHeight, tenthWidth }
  } = useContext(StyleContext);

  return (
    <>
      <div className="box box-sidebar" style={{ height: `${winHeight}px`, width: `${tenthWidth * 2}px` }}>
        <BackBtn history={history} />
        <p>Sidebar</p>
      </div>
    </>
  );
};

export default Sidebar;
