import React from "react";

const DeleteScript = ({ item, cancel }) => {
  const handleCopy = e => {
    e.preventDefault();
  };
  return (
    <div className="modal-action copy-script">
      {item}
      <button className="modal-btn" onClick={cancel}>
        Cancel
      </button>
      <button className="modal-btn action" onClick={handleCopy}>
        Delete
      </button>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default DeleteScript;
