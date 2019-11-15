import React from "react";
import ReactDOM from "react-dom";
import "./css/Modals.css";
import AddScript from "../Components/Forms/ModalForms/AddScript";
import CopyScript from "../Components/Forms/ModalForms/CopyScript";
import DeleteScript from "../Components/Forms/ModalForms/DeleteScript";
import DeleteListScript from "../Components/Forms/ModalForms/DeleteListScript";
import PrintListScript from "../Components/Forms/ModalForms/PrintListScript";

const Modal = ({ item, history, payload, action, isShowing, hide }) => {
  if (isShowing) {
    return ReactDOM.createPortal(
      <div onClick={hide} className="Modal">
        <div
          onClick={e => e.stopPropagation()}
          className={`Modal__inner ${isShowing}`}
        >
          {action === "add-script" ? (
            <AddScript cancel={hide} />
          ) : action === "copy-script" ? (
            <CopyScript item={item} cancel={hide} />
          ) : action === "print-list-script" ? (
            <PrintListScript item={item} payload={payload} cancel={hide} />
          ) : action === "delete-script" ? (
            <DeleteScript item={item} history={history} cancel={hide} />
          ) : action === "delete-list-script" ? (
            <DeleteListScript item={item} cancel={hide} />
          ) : (
            "other modal"
          )}
        </div>
      </div>,
      document.querySelector("#modal")
    );
  } else {
    return null;
  }
};

export default Modal;
