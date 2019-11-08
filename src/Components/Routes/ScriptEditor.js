import React, { useEffect, useState, useContext } from "react";
import dateFormat from "dateformat";
import { AtlSection } from "../Utils/Utils";
import Input from "../Utils/Editor/Inputs";
import Output from "../Utils/Editor/Outputs";
import Sidebar from "../Utils/Editor/Sidebar";
import { UserContext } from "../../Contexts/UserContext";
import { EditContext } from "../../Contexts/EditContext";

const ScriptEditor = (props) => {
  // Script Data
  const [currentId, setCurrentId] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [body, setBody] = useState("");
  const [actors, setActors] = useState([]);
  const [tags, setTags] = useState([]);

  // Layout Data

  // Style Data
  const {
    value: { userColor }
  } = useContext(UserContext);
  const {
    value: { updateScript }
  } = useContext(EditContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (props.location.state !== undefined) {
      const { item } = props.location.state;
      setCurrentId(item.id);
      setTitle(item.title);
      setSubtitle(item.subtitle);
      setAuthor(item.author);
      setActors(item.actors);
      setTags(item.tags);
      setBody(item.body);
      updateScript(item);
      let date;
      date = dateFormat(item.date_created, "mmmm d, yyyy");
      if (item.date_updated !== null) {
        date = dateFormat(item.date_updated, "mmmm d, yyyy");
      }
      setDate(date);
    }
  }, []);

  return (
    <AtlSection className="atl-page editor-pg" style={{ outline: `3.5rem solid ${userColor}` }}>
      <Input body={props.location.state.item.body} />
      <Output />
      <Sidebar history={props.history} />
    </AtlSection>
  );
};

export default ScriptEditor;
