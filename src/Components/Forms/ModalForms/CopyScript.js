import React from "react";

const CopyScript = ({ item, cancel }) => {
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
        Copy
      </button>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default CopyScript;
