import React, { useState } from "react";
import { AtlNotification } from "../../Utils/Utils";
import { readScripts, newScript } from "../../../Services/endpoints-service";
import {ScriptsContext} from '../../../Contexts/ScriptsContext';


const CopyScript = ({ item, cancel }) => {
  const {value: {addToScripts, scripts, searchScripts}} = useContext(ScriptsContext)
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);

  const handleCopy = async e => {
    e.preventDefault();
    setResStatus(0);
    setResMsg("");
    let scriptToCopy = {};
 
    try {
      const getScript = await readScripts.get(`/${item}`);
      scriptToCopy.title = getScript.data[0].title + " Copy";
      scriptToCopy.author = getScript.data[0].author;
      scriptToCopy.subtitle = getScript.data[0].subtitle;
      scriptToCopy.body = getScript.data[0].body;
      scriptToCopy.actors = getScript.data[0].actors;
      scriptToCopy.tags = getScript.data[0].tags;
      const copyScipt = await newScript.post("/", scriptToCopy);

      let addedToScripts = await addToScripts(scripts, searchScripts, copyScipt.data) 

      setResStatus(200);
      setResMsg("Copied Script");

      setTimeout(() => {
        setResStatus(0);
        cancel();
        // window.location.reload();
      }, 500);
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
