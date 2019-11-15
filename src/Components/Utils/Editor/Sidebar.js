import React, { useContext, useState, useEffect, useRef } from "react";
import { useInput } from "../../../Hooks/use-input";
import { useForm } from "../../../Hooks/use-files";
import { validationSpacer } from "../../../Services/validation/auth-form-service";
import { StyleContext } from "../../../Contexts/StyleContext";
import { EditContext } from "../../../Contexts/EditContext";
import { UserContext } from "../../../Contexts/UserContext";
import { BackBtn } from "../Utils";
import "../Styles/Editor.css";
import { readScripts } from "../../../Services/endpoints-service";

const Sidebar = ({ history, currentId }) => {
  const { values, errors, handleChange, reset } = useForm(
    { title: "", author: "", subtitle: "" },
    { 1: [], 2: [], 3: [] },
    {},
    { 1: validationSpacer, 2: validationSpacer, 3: validationSpacer }
  );
  const {
    value: { addToActors, addToTags, currentScript, updateTitlePage }
  } = useContext(EditContext);
  const {
    value: { winHeight, tenthWidth }
  } = useContext(StyleContext);
  const { value: tags, bind: bindTags, reset: resetTags } = useInput("");
  const { value: actors, bind: bindActors, reset: resetActors } = useInput("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  const [updating, setUpdating] = useState(false);
  const actorRef = useRef();
  const tagRef = useRef();

  useEffect(() => {
    const findScript = async () => {
      try {
        const result = await readScripts.get(`/${currentId}`);
        setCurrentAuthor(result.data[0].author);
        setCurrentSubtitle(result.data[0].subtitle);
        setCurrentTitle(result.data[0].title);
      } catch (error) {
        console.log(error);
      }
    };
    findScript();
  }, []);

  const updateTitlePg = e => {
    e.preventDefault();
    const { title, author, subtitle } = values;
    setUpdating(true);
    updateTitlePage(currentScript, title, author, subtitle);
    setTimeout(() => {
      setUpdating(false);
    }, 300);
  };

  const updateActors = e => {
    e.preventDefault();
    let newActor = actors;
    addToActors(currentScript, newActor);
    resetActors();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const updateTags = e => {
    e.preventDefault();
    let newTag = tags;
    addToTags(currentScript, newTag);
    resetTags();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <div
        className="box box-sidebar"
        style={{ height: `${winHeight * 1.5}px`, width: `${tenthWidth * 2}px` }}
      >
        <BackBtn history={history} />
        <form className="sidebar-inputs">
          <fieldset className="side-tags">
            <label htmlFor="actor"></label>
            <input
              ref={actorRef}
              placeholder="Anton Q."
              type="text"
              name="actors"
              {...bindActors}
            />
            <button
              className="side-add-btn"
              title="add actor"
              onClick={updateActors}
            >
              +
            </button>
            <input
              ref={tagRef}
              placeholder="FADE IN"
              type="text"
              name="tags"
              {...bindTags}
            />
            <button
              className="side-add-btn"
              title="add tag"
              onClick={updateTags}
            >
              +
            </button>
          </fieldset>
          <fieldset className="side-title">
            <label htmlFor="title">Title</label>
            <br />
            <input
              defaultValue={currentTitle}
              placeholder="amazing screenplay"
              name="title"
              type="text"
              id={1}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="author">Author</label>
            <br />
            <input
              defaultValue={currentAuthor}
              placeholder="Jimmy Dean"
              name="author"
              type="text"
              id={2}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="subtitle">Subtitle</label>
            <br />
            <input
              defaultValue={currentSubtitle}
              placeholder="Based on a True Story"
              name="subtitle"
              type="text"
              id={3}
              onChange={handleChange}
            />
            <button className="side-update-btn" onClick={updateTitlePg}>
              {updating ? "Updating" : "Update"}
            </button>
          </fieldset>
        </form>
        <div className="sidebar-info">
          <h3>Hotkeys</h3>
          <ol>
            <li>
              Save | <kbd>alt</kbd> + <kbd>s</kbd>{" "}
            </li>
            <li>
              Copy | <kbd>alt</kbd> + <kbd>c</kbd>
            </li>
            <li>
              Delete | <kbd>alt</kbd> + <kbd>d</kbd>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
