import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { AtlSection } from "../Utils/Utils";

const ScriptEditor = (props) => {
  // Script Data
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
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
      let date;
      date = dateFormat(item.date_created, "mmmm d, yyyy");
      if (item.date_updated !== null) {
        date = dateFormat(item.date_updated, "mmmm d, yyyy");
      }
      setDate(date);
    }
  }, []);

  return (
    <AtlSection>
      <h1 className="animated-h1">Editor</h1>
      {title}
      <br />
      {subtitle}
      <br />
      {author}
      <br />
      {date}
    </AtlSection>
  );
};

export default ScriptEditor;
