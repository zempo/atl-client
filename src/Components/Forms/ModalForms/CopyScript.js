import React, { useState } from "react";
import { AtlNotification } from "../../Utils/Utils";
import { readScripts } from "../../../Services/endpoints-service";

const CopyScript = ({ item, cancel }) => {
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);

  const handleCopy = async e => {
    e.preventDefault();
    setResStatus(0);
    setResMsg("");

    try {
      const scriptToCopy = await readScripts.get(`/${item}`);

      console.log(scriptToCopy.data[0]);
      setResStatus(200);
      setResMsg("Copied Script");
    } catch (error) {
      setResStatus(error.response.status);
      setResMsg(Object.values(error.response.data.error));
      setTimeout(() => {
        setResStatus(0);
      }, 5000);
    }
  };
  return (
    <div className="modal-action copy-script">
      {resStatus === 0 ? null : (
        <AtlNotification type={resStatus} msg={resMsg} />
      )}
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
