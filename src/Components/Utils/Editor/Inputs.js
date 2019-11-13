import React, { useContext, useState, useEffect, useRef } from "react";
import { ResizableBox as Box } from "react-resizable";
import { StyleContext } from "../../../Contexts/StyleContext";
import { EditContext } from "../../../Contexts/EditContext";
import { UserContext } from "../../../Contexts/UserContext";
import { readScripts } from "../../../Services/endpoints-service";
import { useModal } from "../../../Hooks/use-modal";
import Modal from "../../../Modals/Modal";
import Moment from "react-moment";
import { HotKeys } from "react-hotkeys";
import "../Styles/Editor.css";

const Input = ({ currentId, body }) => {
  const { isShowing: isShowingCopy, toggle: toggleCopy } = useModal();
  const { isShowing: isShowingDelete, toggle: toggleDelete } = useModal();
  const {
    value: { tenthHeight, tenthWidth }
  } = useContext(StyleContext);
  const {
    value: { userColor }
  } = useContext(UserContext);
  const {
    value: {
      error,
      loading,
      setLoading,
      rmvFromActors,
      rmvFromTags,
      currentScript,
      updateScriptBody
    }
  } = useContext(EditContext);
  const [date, setDate] = useState("");
  const [currentBody, setCurrentBody] = useState(body);
  const [updated, setUpdated] = useState(false);
  const [actors, setActors] = useState([]);
  const [tags, setTags] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const findScript = async () => {
      let date;
      try {
        const result = await readScripts.get(`/${currentId}`);
        setCurrentBody(result.data[0].body);
        setActors(result.data[0].actors);
        setTags(result.data[0].tags);
        date = result.data[0].date_created;
        if (result.data[0].date_updated !== null) {
          date = result.data[0].date_updated;
        }
        setDate(date);
      } catch (error) {
        console.log(error);
      }
    };

    findScript();
    let len = inputRef.current.value.length;
    inputRef.current.setSelectionRange(len, len);
    // inputRef.current.setAttribute("data-gramm", "false");
  }, []);

  const handleSave = e => {
    e.preventDefault();
    setUpdated(true);
    updateScriptBody(currentScript, currentBody);
  };

  const handleChange = e => {
    setCurrentBody(e.target.value);
  };

  const appendActor = e => {
    e.preventDefault();
    inputRef.current.focus();
    let currentTag = ` {${e.target.innerHTML}} `;
    let newBody = currentBody + currentTag;
    setCurrentBody(newBody);
    updateScriptBody(currentScript, newBody);
  };

  const appendTag = e => {
    e.preventDefault();
    inputRef.current.focus();
    let currentTag = ` [${e.target.innerHTML}] `;
    let newBody = currentBody + currentTag;
    setCurrentBody(newBody);
    updateScriptBody(currentScript, newBody);
  };

  const removeActor = e => {
    e.preventDefault();
    let actorToRmv = e.target.id;
    rmvFromActors(currentScript, actors, actorToRmv);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const removeTag = e => {
    e.preventDefault();
    let tagToRmv = e.target.id;
    rmvFromTags(currentScript, tags, tagToRmv);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  let hotSave = React.useCallback(async () => {
    let bodyToUpdate;
    let fieldsToUpdate = {};
    bodyToUpdate = inputRef.current.value;
    fieldsToUpdate.body = bodyToUpdate;
    setUpdated(true);
    setLoading(true);
    try {
      const result = await readScripts.patch(`/${currentId}`, fieldsToUpdate);

      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);

  const handlers = {
    HOT_SAVE: hotSave
  };

  return (
    <HotKeys handlers={handlers} attach={window}>
      <Box
        className="box box-top"
        height={tenthHeight * 7}
        width={tenthWidth * 7.92}
        axis="both"
        resizeHandles={["s"]}
      >
        <form className="input-tags">
          {loading ? (
            <p>Saving...</p>
          ) : (
            <p title={`Your changes are automatically saved.`}>
              <u>
                Updated{" "}
                {updated ? (
                  <Moment fromNow></Moment>
                ) : (
                  <Moment fromNow>{date}</Moment>
                )}
              </u>
            </p>
          )}{" "}
          <div className="document-controls">
            <button className="save-btn" onClick={handleSave}>
              {loading ? "Saving" : "Save"}
            </button>
            <button
              className="copy-btn"
              onClick={e => {
                e.preventDefault();
                toggleCopy();
              }}
            >
              Copy
            </button>
            <button
              className="delete-btn"
              onClick={e => {
                e.preventDefault();
                toggleDelete();
              }}
            >
              Delete
            </button>
          </div>
          {error ? error : null}
          <fieldset className="input-top">
            <ul className="actors">
              {actors.map((actor, i) => {
                return (
                  <li key={i} className="actor-control">
                    <button
                      className="append-tag"
                      id={i}
                      style={{
                        background: userColor,
                        border: `2px solid ${userColor}`
                      }}
                      onClick={appendActor}
                    >
                      {actor}
                    </button>
                    <button
                      className="delete-tag"
                      id={i}
                      onClick={removeActor}
                      style={{
                        background: `${userColor}b3`,
                        border: `2px solid ${userColor}`
                      }}
                    >
                      x
                    </button>
                  </li>
                );
              })}
            </ul>
          </fieldset>
          <fieldset className="input-bottom">
            <ul className="tags">
              {tags.map((tag, i) => {
                return (
                  <li key={i} className="tag-control">
                    <button
                      className="append-tag"
                      id={i}
                      style={{
                        background: userColor,
                        border: `2px solid ${userColor}`
                      }}
                      onClick={appendTag}
                    >
                      {tag}
                    </button>
                    <button
                      className="delete-tag"
                      id={i}
                      onClick={removeTag}
                      style={{
                        background: `${userColor}b3`,
                        border: `2px solid ${userColor}`
                      }}
                    >
                      x
                    </button>
                  </li>
                );
              })}
            </ul>
          </fieldset>
          <textarea
            spellCheck={true}
            autoFocus={true}
            ref={inputRef}
            value={currentBody}
            onChange={handleChange}
          />
        </form>
        <Modal
          isShowing={isShowingCopy}
          hide={toggleCopy}
          item={currentId}
          action="copy-script"
        />
        <Modal
          isShowing={isShowingDelete}
          hide={toggleDelete}
          item={currentId}
          action="delete-script"
        />
      </Box>
    </HotKeys>
  );
};

export default Input;
