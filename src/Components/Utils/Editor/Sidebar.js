import React, { useContext, useRef } from "react";
import { useInput } from "../../../Hooks/use-input";
import { StyleContext } from "../../../Contexts/StyleContext";
import { EditContext } from "../../../Contexts/EditContext";
import { UserContext } from "../../../Contexts/UserContext";
import { BackBtn } from "../Utils";
import "../Styles/Editor.css";

const Sidebar = ({ history }) => {
  const { value: tags, bind: bindTags, reset: resetTags } = useInput("");
  const { value: actors, bind: bindActors, reset: resetActors } = useInput("");
  const { value: title, bind: bindTitle, reset: resetTitle } = useInput("");
  const { value: author, bind: bindAuthor, reset: resetAuthor } = useInput("");
  const { value: subtitle, bind: bindSubtitle, reset: resetSubtitle } = useInput("");

  const {
    value: { winHeight, tenthWidth }
  } = useContext(StyleContext);
  const {
    value: { userColor }
  } = useContext(UserContext);
  const {
    value: { error, loading, addToActors, addToTags, updateScript, currentScript }
  } = useContext(EditContext);
  const actorRef = useRef();
  const tagRef = useRef();

  const updateTitle = (e) => {
    e.preventDefault();
    console.log("title");
  };

  const updateActors = (e) => {
    e.preventDefault();
    let newActor = actors;
    addToActors(currentScript.actors, newActor);
    resetActors();
  };

  const updateTags = (e) => {
    e.preventDefault();
    let newTag = tags;
    addToTags(currentScript.tags, newTag);
    resetTags();
  };

  return (
    <>
      <div className="box box-sidebar" style={{ height: `${winHeight * 1.5}px`, width: `${tenthWidth * 2}px` }}>
        <BackBtn history={history} />
        <form className="sidebar-inputs">
          <fieldset className="side-tags">
            <label htmlFor="actor"></label>
            <input ref={actorRef} placeholder="actor" type="text" name="actors" {...bindActors} />
            <button className="side-add-btn" title="add actor" onClick={updateActors}>
              +
            </button>
            <input ref={tagRef} placeholder="tag" type="text" name="tags" {...bindTags} />
            <button className="side-add-btn" title="add tag" onClick={updateTags}>
              +
            </button>
          </fieldset>
          <fieldset className="side-title">
            <label htmlFor="title">Title</label>
            <br />
            <input defaultValue={currentScript.title} placeholder="amazing screenplay" name="title" type="text" />
            <br />
            <label htmlFor="author">Author</label>
            <br />
            <input defaultValue={currentScript.author} placeholder="Jimmy Dean" name="author" type="text" />
            <br />
            <label htmlFor="subtitle">Subtitle</label>
            <br />
            <input
              defaultValue={currentScript.subtitle}
              placeholder="Based on a True Story"
              name="subtitle"
              type="text"
            />
            <button className="side-update-btn" onClick={updateTitle}>
              Update
            </button>
          </fieldset>
        </form>
        <div className="sidebar-info">
          <h3>Hotkeys</h3>
          {currentScript.title}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
