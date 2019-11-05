import React from "react";
import Modal from "../../../Modals/Modal";
import { useModal } from "../../../Hooks/use-modal";
import { MenuOption } from "../Utils";
import "../Styles/Scripts.css";

const ListScript = ({ script }) => {
  const { isShowing: isShowingDelete, toggle: toggleDelete } = useModal();
  return (
    <>
      <div class="script">
        <input type="checkbox" id={`script-toggle-${script.id}`} class="script-toggle" value="selected" />
        <label class="script-container" htmlFor={`script-toggle-${script.id}`}>
          <div class="script-menu">
            <MenuOption to="/script-editor" text={<i className="fas fa-pencil-alt" title="edit" />} script={script} />
            <button class="menu-btn" title="copy">
              <img src="https://cdn4.iconfinder.com/data/icons/feather/24/copy-512.png" />
            </button>
            <button class="menu-btn" title="delete" onClick={toggleDelete}>
              <img src="http://cdn.onlinewebfonts.com/svg/img_275205.png" />
            </button>
          </div>
          <div class="script-pg">
            <p>{script.title}</p>
          </div>
        </label>
      </div>
      <Modal isShowing={isShowingDelete} hide={toggleDelete} item={script.id} action="delete-script" />
    </>
  );
};

export default ListScript;
