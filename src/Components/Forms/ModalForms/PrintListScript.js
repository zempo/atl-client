import React, { useEffect, useState } from "react";
import { readScripts } from "../../../Services/endpoints-service";
import { sortScriptSentences } from "../../../Services/algos-service";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {ScriptDoc} from '../../Utils/Scripts/ScriptDoc'

const PrintListScript = ({ item, cancel }) => {
  const [titlePg, setTitlePg] = useState({
    title: "",
    author: "",
    subtitle: ""
  });
  const [scriptTxt, setScriptTxt] = useState([]);
  const [show, setShow] = useState(false)

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
        setShow(true)
      } catch (error) {
        console.log(error);
      }
    };

    findScript();
  }, []);

  return (
    <div className="modal-action print-script"> 
{show && scriptTxt.length > 0 ? <PDFDownloadLink document={<ScriptDoc titlePg={titlePg} scriptTxt={scriptTxt}/>} fileName="script.pdf"
 >
      Download Script
      </PDFDownloadLink>: "Loading Script..."}
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
