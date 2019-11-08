import React, { useContext, useState, useEffect } from "react";
import { ResizableBox as Box } from "react-resizable";
import { StyleContext } from "../../../Contexts/StyleContext";
import "../Styles/Editor.css";
import { EditContext } from "../../../Contexts/EditContext";
import { readScripts } from "../../../Services/endpoints-service";

const Input = ({ currentId, body }) => {
  const {
    value: { tenthHeight, tenthWidth }
  } = useContext(StyleContext);
  const {
    value: { currentScript, updateScriptBody }
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
    setCurrentBody(currentBody + currentTag);
  };

  return (
    <>
      <Box className="box box-top" height={tenthHeight * 5} width={tenthWidth * 7.92} axis="both" resizeHandles={["s"]}>
        <form className="input-tags">
          <fieldset className="actors">
            {actors.map((actor, i) => {
              return (
                <div key={i} className="actor-control">
                  <button className="append-tag" id={i} onClick={appendTag}>
                    {actor}
                  </button>
                  <button className="delete-tag" id={i}>
                    x
                  </button>
                </div>
              );
            })}
          </fieldset>
          <fieldset className="tags">
            {tags.map((tag, i) => {
              return (
                <div key={i} className="tag-control">
                  <button className="append-tag" id={i} onClick={appendTag}>
                    {tag}
                  </button>
                  <button className="delete-tag" id={i}>
                    x
                  </button>
                </div>
              );
            })}
          </fieldset>
          <textarea value={currentBody} onChange={handleChange} />
        </form>
      </Box>
    </>
  );
};

export default Input;
