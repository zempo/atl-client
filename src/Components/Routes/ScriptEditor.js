import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { AtlSection } from "../Utils/Utils";
import Input from "../Utils/Editor/Inputs";
import Output from "../Utils/Editor/Outputs";
import Sidebar from "../Utils/Editor/Sidebar";

const ScriptEditor = (props) => {
  // Script Data
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [body, setBody] = useState("");
  const [actors, setActors] = useState([]);
  const [tags, setTags] = useState([]);

  // Layout Data

  //

  useEffect(() => {
    window.scrollTo(0, 0);

    if (props.location.state !== undefined) {
      const { item } = props.location.state;
      console.log(item.id);
      setTitle(item.title);
      setSubtitle(item.subtitle);
      setAuthor(item.author);
      setActors(item.actors);
      setTags(item.tags);
      setBody(item.body);
      let date;
      date = dateFormat(item.date_created, "mmmm d, yyyy");
      if (item.date_updated !== null) {
        date = dateFormat(item.date_updated, "mmmm d, yyyy");
      }
      setDate(date);
    }
  }, []);

  return (
    <AtlSection className="atl-page editor-pg">
      <Input />
      <Output />
      <Sidebar history={props.history} />
    </AtlSection>
  );
};

export default ScriptEditor;
