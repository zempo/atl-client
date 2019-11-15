import React, { useState } from "react";
import { deleteScript } from "../../../Services/endpoints-service";
import { AtlNotification } from "../../Utils/Utils";

const DeleteScript = ({ item, history, cancel }) => {
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);

  const handleDelete = async e => {
    let scriptToDelete = item;
    e.preventDefault();
    history.goBack();

    try {
      const deleted = await deleteScript.delete(`/${scriptToDelete}`);

      setResStatus(deleted.status);
      setResMsg("Script Deleted");
      setTimeout(() => {
        setResStatus(0);
        window.location.reload();
      }, 300);
    } catch (error) {
      setResStatus(error.response.status);
      setResMsg(Object.values(error.response.data.error));
      setTimeout(() => {
        setResStatus(0);
      }, 5000);
    }
  };
  return (
    <div className="modal-action delete-script">
      {resStatus === 0 ? null : (
        <AtlNotification type={resStatus} msg={resMsg} />
      )}
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
