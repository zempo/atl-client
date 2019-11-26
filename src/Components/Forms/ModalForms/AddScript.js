import React, { useState, useContext } from "react";
import { useInput } from "../../../Hooks/use-input";
import { AtlNotification } from "../../Utils/Utils";
import { newScript } from "../../../Services/endpoints-service";
import { ScriptsContext } from "../../../Contexts/ScriptsContext";

const AddScript = ({ cancel }) => {
  const {
    value: { addToScripts, scripts, searchScripts }
  } = useContext(ScriptsContext);
  const { value: title, bind: bindTitle } = useInput("");
  const { value: author, bind: bindAuthor } = useInput("");
  const { value: subtitle, bind: bindSubtitle } = useInput("");
  const [err, setErr] = useState({
    resMsg: "",
    resStatus: 0
  });

  const postNewScript = async e => {
    e.preventDefault();
    let scriptToPost = {};
    if (title !== "") {
      scriptToPost.title = title;
    }
    if (author !== "") {
      scriptToPost.author = author;
    }
    if (subtitle !== "") {
      scriptToPost.subtitle = subtitle;
    }

    setErr({
      resMsg: "",
      resStatus: 0
    });

    try {
      const result = await newScript.post(`/`, scriptToPost);
      console.log(result.data);
      let addedToScripts = await addToScripts(
        scripts,
        searchScripts,
        result.data
      );
      console.log(addedToScripts);
      setTimeout(() => {
        setErr({
          resMsg: "Created Script",
          resStatus: 201
        });
        cancel();
        // window.location.reload();
      }, 500);
    } catch (error) {
      setErr({
        resStatus: error.response.status,
        resMsg: Object.values(error.response.data.error)
      });
      setTimeout(() => {
        setErr({
          resMsg: "",
          resStatus: 0
        });
      }, 5000);
    }
  };
  return (
    <div className="modal-action add-script">
      {err.resStatus === 0 ? null : (
        <AtlNotification type={err.resStatus} msg={err.resMsg} />
      )}
      <form className="atl-form script-form">
        <label htmlFor="title">What's Your Working Title?</label>
        <br />
        <input type="text" name="title" {...bindTitle} />
        <br />
        <label htmlFor="" htmlFor="author">
          Author or Pen-Name?
        </label>
        <br />
        <input type="text" name="author" {...bindAuthor} />
        <br />
        <label htmlFor="" htmlFor="subtitle">
          Tagline or Subtitle?
        </label>
        <br />
        <input type="text" name="subtitle" {...bindSubtitle} />
      </form>
      <button className="modal-btn" onClick={cancel}>
        Cancel
      </button>
      <button className="modal-btn action" onClick={postNewScript}>
        Add
      </button>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default AddScript;
