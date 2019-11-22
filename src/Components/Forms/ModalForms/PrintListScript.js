import React, { useEffect, useState } from "react";
import { readScripts } from "../../../Services/endpoints-service";
import { sortScriptSentences } from "../../../Services/algos-service";

const PrintListScript = ({ item, cancel }) => {
  const [titlePg, setTitlePg] = useState({
    title: "",
    author: "",
    subtitle: ""
  });
  const [scriptTxt, setScriptTxt] = useState({});

  useEffect(() => {
    const findScript = async () => {
      try {
        const result = await readScripts.get(`/${item}`);
        const sort = await sortScriptSentences(result.data[0].body)

        setTitlePg({
          title: result.data[0].title,
          author: result.data[0].author,
          subtitle: result.data[0].subtitle
        });
        setScriptTxt(sort)
      } catch (error) {
        console.log(error);
      }
    };

    findScript();
  }, []);

  return (
    <div className="modal-action print-script">
      {titlePg.title} {titlePg.author}  
      <button className="modal-btn" onClick={cancel}>
        Cancel
      </button>
      <button className="modal-btn action">Print</button>
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default PrintListScript;
