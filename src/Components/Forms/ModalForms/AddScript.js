import React from "react";

const AddScript = ({ cancel }) => {
  const handleCopy = e => {
    e.preventDefault();
  };
  return (
    <div className="modal-action add-script">
      <button className="modal-btn" onClick={cancel}>
        Cancel
      </button>
      <button className="modal-btn action" onClick={handleCopy}>
        Add
      </button>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default AddScript;
