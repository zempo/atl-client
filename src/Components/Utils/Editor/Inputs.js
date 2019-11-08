import React, { useContext, useState, useEffect } from "react";
import { ResizableBox as Box } from "react-resizable";
import { StyleContext } from "../../../Contexts/StyleContext";
import { EditContext } from "../../../Contexts/EditContext";
import { UserContext } from "../../../Contexts/UserContext";
import { readScripts } from "../../../Services/endpoints-service";
import "../Styles/Editor.css";

const Input = ({ currentId, body }) => {
  const {
    value: { tenthHeight, tenthWidth }
  } = useContext(StyleContext);
  const {
    value: { userColor }
  } = useContext(UserContext);
  const {
    value: { error, loading, rmvFromActors, rmvFromTags, currentScript, updateScriptBody }
  } = useContext(EditContext);
  const [actors, setActors] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentBody, setCurrentBody] = useState(body);

  useEffect(() => {
    const findScript = async () => {
      try {
        const result = await readScripts.get(`/${currentId}`);
        setCurrentBody(result.data[0].body);
        setActors(result.data[0].actors);
        setTags(result.data[0].tags);
      } catch (error) {
        console.log(error);
      }
    };

    findScript();
  }, []);

  const handleChange = (e) => {
    setCurrentBody(e.target.value);
    updateScriptBody(currentScript, e.target.value);
  };

  const appendTag = (e) => {
    e.preventDefault();
    let currentTag = ` [${e.target.innerHTML}]`;
    let newBody = currentBody + currentTag;
    setCurrentBody(newBody);
    updateScriptBody(currentScript, newBody);
  };

  const removeActor = (e) => {
    e.preventDefault();
    let actorToRmv = e.target.id;
    rmvFromActors(currentScript, actors, actorToRmv);
  };

  const removeTag = (e) => {
    e.preventDefault();
    let tagToRmv = e.target.id;
    rmvFromTags(currentScript, tags, tagToRmv);
    window.location.reload();
  };

  return (
    <>
      <Box className="box box-top" height={tenthHeight * 5} width={tenthWidth * 7.92} axis="both" resizeHandles={["s"]}>
        {loading ? "loading..." : "saved"}
        <form className="input-tags">
          <fieldset>
            <ul className="actors">
              {actors.map((actor, i) => {
                return (
                  <li key={i} className="actor-control">
                    <button
                      className="append-tag"
                      id={i}
                      style={{ background: userColor, border: `1px solid ${userColor}` }}
                      onClick={appendTag}
                    >
                      {actor}
                    </button>
                    <button
                      className="delete-tag"
                      id={i}
                      onClick={removeActor}
                      style={{ background: `${userColor}b3`, border: `1px solid ${userColor}` }}
                    >
                      x
                    </button>
                  </li>
                );
              })}
            </ul>
          </fieldset>
          <fieldset>
            <ul className="tags">
              {tags.map((tag, i) => {
                return (
                  <li key={i} className="tag-control">
                    <button
                      className="append-tag"
                      id={i}
                      style={{ background: userColor, border: `1px solid ${userColor}` }}
                      onClick={appendTag}
                    >
                      {tag}
                    </button>
                    <button
                      className="delete-tag"
                      id={i}
                      onClick={removeTag}
                      style={{ background: `${userColor}b3`, border: `1px solid ${userColor}` }}
                    >
                      x
                    </button>
                  </li>
                );
              })}
            </ul>
          </fieldset>
          <textarea value={currentBody} onChange={handleChange} />
        </form>
      </Box>
    </>
  );
};

export default Input;
