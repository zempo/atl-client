import React from "react";
import Modal from "../../../Modals/Modal";
import { useModal } from "../../../Hooks/use-modal";
import { MenuOption } from "../Utils";
import "../Styles/Scripts.css";

const ListSearchScript = ({ script }) => {
  const { isShowing: isShowingCopy, toggle: toggleCopy } = useModal();
  const { isShowing: isShowingPrint, toggle: togglePrint } = useModal();
  const { isShowing: isShowingDelete, toggle: toggleDelete } = useModal();

  return (
    <>
    <div className="script">
      <input
        type="checkbox"
        id={`script-toggle-${script.id}`}
        className="script-toggle"
        value="selected"
      />
      <label
        className="script-container"
        htmlFor={`script-toggle-${script.id}`}
      >
        <div className="script-menu">
          <MenuOption
            to="/script-editor"
            text={<i className="fas fa-pencil-alt" title="edit" />}
            script={script}
          />
          <button
            className="menu-btn copy-b"
            title="copy"
            onClick={toggleCopy}
          >
            <i className="far fa-copy"></i>
          </button>
          <button
            className="menu-btn print-b"
            title="print"
            onClick={togglePrint}
          >
            <i className="fas fa-print"></i>
          </button>
          <button
            className="menu-btn del-b"
            title="delete"
            onClick={toggleDelete}
          >
            <i className="fas fa-minus-circle"></i>
          </button>
        </div>
        <div className="script-pg">
          <h3>{script.title}</h3>
          {script.subtitle !== "" || script.subtitle !== " " ? (
            <p>{script.subtitle}</p>
          ) : null}
          <p>By</p>
          <p>{script.author}</p>
        </div>
      </label>
    </div>
    <Modal
      isShowing={isShowingCopy}
      hide={toggleCopy}
      item={script.id}
      action="copy-script"
    />
    <Modal
      isShowing={isShowingPrint}
      hide={togglePrint}
      item={script.id}
      payload={script}
      action="print-list-script"
    />
    <Modal
      isShowing={isShowingDelete}
      hide={toggleDelete}
      item={script.id}
      payload={script}
      action="delete-list-script"
    />
  </>
  );
};

export default ListSearchScript;
