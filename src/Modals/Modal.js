import React from "react";
import ReactDOM from "react-dom";
import "./css/Modals.css";

const Modal = ({ item, payload, action, isShowing, hide }) => {
  if (isShowing) {
    return ReactDOM.createPortal(
      <div onClick={hide} className="Modal">
        <div onClick={(e) => e.stopPropagation()} className={`Modal__inner ${isShowing}`}>
          {action === "add-script"
            ? "add modal"
            : action === "copy-script"
            ? "copy modal"
            : action === "print-script"
            ? "print modal"
            : action === "delete-script"
            ? "delete modal"
            : "other modal"}
        </div>
      </div>,
      document.querySelector("#modal")
    );
  } else {
    return null;
  }
};

export default Modal;
