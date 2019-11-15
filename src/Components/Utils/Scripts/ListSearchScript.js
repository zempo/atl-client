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
            <button className="menu-btn" title="copy" onClick={toggleCopy}>
              <img src="https://cdn4.iconfinder.com/data/icons/feather/24/copy-512.png" />
            </button>
            <button className="menu-btn" title="print" onClick={togglePrint}>
              <img src="http://cdn.onlinewebfonts.com/svg/img_533275.png" />
            </button>
            <button className="menu-btn" title="delete" onClick={toggleDelete}>
              <img src="http://cdn.onlinewebfonts.com/svg/img_275205.png" />
            </button>
          </div>
          <div className="script-pg">
            <h3>{script.title}</h3>
            <p>{script.subtitle}</p>
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
        action="print-script"
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
