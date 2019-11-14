import React from "react";

const DeleteScript = ({ item, history, cancel }) => {
  const handleDelete = e => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <div className="modal-action copy-script">
      {item}
      <button className="modal-btn" onClick={cancel}>
        Cancel
      </button>
      <button className="modal-btn action" onClick={handleDelete}>
        Delete
      </button>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default DeleteScript;
