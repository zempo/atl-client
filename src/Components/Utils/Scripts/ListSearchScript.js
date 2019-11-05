import React from "react";
import { MenuOption } from "../Utils";

const ListSearchScript = ({ script }) => {
  return (
    <div class="script">
      <input type="checkbox" id={`script-toggle-${script.id}`} class="script-toggle" value="selected" />
      <label class="script-container" for={`script-toggle-${script.id}`}>
        <div class="script-menu">
          <MenuOption to="/script-editor" text={<i className="fas fa-pencil-alt" title="edit" />} script={script} />
          <button class="menu-btn" title="copy">
            <img src="https://cdn4.iconfinder.com/data/icons/feather/24/copy-512.png" />
          </button>
          <button class="menu-btn" title="delete">
            <img src="http://cdn.onlinewebfonts.com/svg/img_275205.png" />
          </button>
        </div>
        <div class="script-pg">
          <p>{script.title}</p>
        </div>
      </label>
    </div>
  );
};

export default ListSearchScript;
