import React, { useContext, useState, useEffect, useRef } from "react";
import { ResizableBox as Box } from "react-resizable";
import { StyleContext } from "../../../Contexts/StyleContext";
import { EditContext } from "../../../Contexts/EditContext";
import { UserContext } from "../../../Contexts/UserContext";
import { ScriptsContext } from "../../../Contexts/ScriptsContext";
import { readScripts } from "../../../Services/endpoints-service";
import { useModal } from "../../../Hooks/use-modal";
import Modal from "../../../Modals/Modal";
import Moment from "react-moment";
import { HotKeys } from "react-hotkeys";
import { SkeletonTags } from "../Utils";
import "../Styles/Editor.css";

const Input = ({ currentId, body, history }) => {
  const {
    value: { editScripts, scripts, searchScripts },
  } = useContext(ScriptsContext);
  const { isShowing: isShowingCopy, toggle: toggleCopy } = useModal();
  const { isShowing: isShowingDelete, toggle: toggleDelete } = useModal();
  const {
    value: { tenthHeight, tenthWidth, mobile },
  } = useContext(StyleContext);
  const {
    value: { userColor },
  } = useContext(UserContext);
  const {
    value: {
      error,
      loading,
      setLoading,
      rmvFromActors,
      rmvFromTags,
      currentScript,
      updateScriptBody,
      updateScript,
    },
  } = useContext(EditContext);
  const [date, setDate] = useState("");
  const [currentBody, setCurrentBody] = useState(body);
  const [updated, setUpdated] = useState(false);
  const [actors, setActors] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsLoading, setTagsLoading] = useState(true);
  const inputRef = useRef();

  useEffect(() => {
    const findScript = async () => {
      let date;
      try {
        const result = await readScripts.get(`/${currentId}`);
        setCurrentBody(result.data.payload[0].body);
        setTagsLoading(false);
        setActors(result.data.payload[0].actors);
        setTags(result.data.payload[0].tags);
        date = result.data.payload[0].date_created;
        if (result.data.payload[0].date_updated !== null) {
          date = result.data.payload[0].date_updated;
        }
        setDate(date);
      } catch (error) {
        console.log(error);
      }
    };

    findScript();
    let len = inputRef.current.value.length;
    inputRef.current.setSelectionRange(len, len);
  }, [currentId]);

  const handleSave = async (e) => {
    e.preventDefault();
    setUpdated(true);

    try {
      const scriptDidUpdate = await updateScriptBody(
        currentScript,
        currentBody
      );
      editScripts(scripts, searchScripts, scriptDidUpdate[0]);
      updateScript(scriptDidUpdate[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setCurrentBody(e.target.value);
  };

  const appendActor = async (e) => {
    e.preventDefault();
    setUpdated(true);
    inputRef.current.focus();
    let currentTag = ` {${e.target.innerHTML}} `;
    let newBody = currentBody + currentTag;
    setCurrentBody(newBody);
    try {
      const scriptDidUpdate = await updateScriptBody(currentScript, newBody);
      editScripts(scripts, searchScripts, scriptDidUpdate[0]);
      updateScript(scriptDidUpdate[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const appendTag = async (e) => {
    e.preventDefault();
    setUpdated(true);
    inputRef.current.focus();
    let currentTag = ` [${e.target.innerHTML}] `;
    let newBody = currentBody + currentTag;
    setCurrentBody(newBody);
    try {
      const scriptDidUpdate = await updateScriptBody(currentScript, newBody);
      editScripts(scripts, searchScripts, scriptDidUpdate[0]);
      updateScript(scriptDidUpdate[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const removeActor = async (e) => {
    e.preventDefault();
    let actorToRmv = e.target.id;
    try {
      // eslint-disable-next-line
      const removed = await rmvFromActors(currentScript, actors, actorToRmv);

      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (err) {
      console.log(err);
    }
  };

  const removeTag = async (e) => {
    e.preventDefault();
    let tagToRmv = e.target.id;
    try {
      // eslint-disable-next-line
      const removed = await rmvFromTags(currentScript, tags, tagToRmv);

      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (err) {
      console.log(err);
    }
  };

  let hotSave = React.useCallback(async () => {
    let bodyToUpdate;
    let fieldsToUpdate = {};
    bodyToUpdate = inputRef.current.value;
    fieldsToUpdate.body = bodyToUpdate;
    setUpdated(true);
    setLoading(true);
    try {
      // eslint-disable-next-line
      const result = await readScripts.patch(`/${currentId}`, fieldsToUpdate);
      const scriptDidUpdate = await readScripts.get(`${currentId}`);
      const regularScripts = await readScripts.get("/");

      editScripts(
        regularScripts.data.payload,
        regularScripts.data.payload,
        scriptDidUpdate.data.payload[0]
      );
      updateScript(scriptDidUpdate.data.payload[0]);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  let hotCopy = React.useCallback(() => {
    toggleCopy();
    // eslint-disable-next-line
  }, []);

  let hotDelete = React.useCallback(() => {
    toggleDelete();
    // eslint-disable-next-line
  }, []);

  const handlers = {
    HOT_SAVE: hotSave,
    HOT_COPY: hotCopy,
    HOT_DELETE: hotDelete,
  };

  return (
    <HotKeys handlers={handlers} attach={window}>
      <Box
        className='box box-top'
        height={tenthHeight * 10}
        width={mobile ? tenthWidth * 10 : tenthWidth * 7.92}
        axis='both'
        resizeHandles={["s"]}
      >
        <form className='alt-form editor-form'>
          <div className='document-controls'>
            <button className='save-btn' onClick={handleSave}>
              {loading ? "Saving" : "Save"}
            </button>
            <button
              className='copy-btn'
              onClick={(e) => {
                e.preventDefault();
                toggleCopy();
              }}
            >
              Copy
            </button>
            <button
              className='delete-btn'
              onClick={(e) => {
                e.preventDefault();
                toggleDelete();
              }}
            >
              Delete
            </button>
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
          </div>
          {error ? error : null}
          <fieldset className='input-top'>
            <ul className='actors'>
              {!tagsLoading ? (
                actors.map((actor, i) => {
                  return (
                    <li key={i} className='actor-control'>
                      <button
                        className='append-tag'
                        id={i}
                        style={{
                          background: userColor,
                          border: `2px solid ${userColor}`,
                        }}
                        onClick={appendActor}
                      >
                        {actor}
                      </button>
                      <button
                        className='delete-tag'
                        id={i}
                        onClick={removeActor}
                        style={{
                          background: `${userColor}b3`,
                          border: `2px solid ${userColor}`,
                        }}
                      >
                        x
                      </button>
                    </li>
                  );
                })
              ) : (
                <SkeletonTags />
              )}
            </ul>
          </fieldset>
          <fieldset className='input-bottom'>
            <ul className='tags'>
              {!tagsLoading ? (
                tags.map((tag, i) => {
                  return (
                    <li key={i} className='tag-control'>
                      <button
                        className='append-tag'
                        id={i}
                        style={{
                          background: userColor,
                          border: `2px solid ${userColor}`,
                        }}
                        onClick={appendTag}
                      >
                        {tag}
                      </button>
                      <button
                        className='delete-tag'
                        // these tags can't be removed!
                        disabled={
                          tag === "Header" ||
                          tag === "Action" ||
                          tag === "Shot" ||
                          tag === "Transition"
                        }
                        id={i}
                        onClick={removeTag}
                        style={{
                          background: `${userColor}b3`,
                          border: `2px solid ${userColor}`,
                        }}
                      >
                        x
                      </button>
                    </li>
                  );
                })
              ) : (
                <SkeletonTags />
              )}
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
          action='copy-script'
        />
        <Modal
          isShowing={isShowingDelete}
          hide={toggleDelete}
          item={currentId}
          history={history}
          action='delete-script'
        />
      </Box>
    </HotKeys>
  );
};

export default Input;
