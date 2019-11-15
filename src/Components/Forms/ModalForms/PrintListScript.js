import React, { useEffect } from "react";
// import { readScripts, newScript } from "../../../Services/endpoints-service";

const PrintListScript = ({ item, payload, cancel }) => {
  useEffect(() => {
    console.log(item, payload);
  }, []);

  return (
    <div className="modal-action print-script">
      <button className="modal-btn" onClick={cancel}>
        Cancel
      </button>
      <button className="modal-btn action">Print</button>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default PrintListScript;
