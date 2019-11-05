import React from "react";
import ReactDOM from "react-dom";
import "./css/Modals.css";

const Modal = ({ item, payload, action, isShowing, hide }) => {
  if (isShowing) {
    return ReactDOM.createPortal(
      <div onClick={hide} className="Modal">
        <div onClick={(e) => e.stopPropagation()} className={`Modal__inner ${isShowing}`}>
          {action === "delete-script" ? "delete script" : action === "demo" ? "some modal" : "other modal"}
        </div>
      </div>,
      document.querySelector("#modal")
    );
  } else {
    return null;
  }
};

export default Modal;
