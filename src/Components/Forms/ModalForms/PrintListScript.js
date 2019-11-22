import React, { useEffect, useState } from "react";
import { readScripts } from "../../../Services/endpoints-service";
import { sortScriptSentences } from "../../../Services/algos-service";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import {ScriptDoc} from '../../Utils/Scripts/ScriptDoc'

const PrintListScript = ({ item, cancel }) => {
  const [titlePg, setTitlePg] = useState({
    title: "",
    author: "",
    subtitle: ""
  });
  const [scriptTxt, setScriptTxt] = useState([{tag: "", actor: "", lines: [""]}]);
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
        console.log(sort)
        if (sort.length !== 0) { 
          setScriptTxt(sort)
        }
        setShow(true)
      } catch (error) {
        console.log(error);
      }
    };

    findScript();
  }, []);

  return (
    <div className="modal-action print-script"> 
      {show && scriptTxt.length > 0 ? <PDFViewer width="100%" height="500"><ScriptDoc titlePg={titlePg} scriptTxt={scriptTxt}/></PDFViewer>: "Loading Script..."}
      <button className="modal-btn" onClick={cancel}>
        Cancel
      </button>
{show && scriptTxt.length > 0 ? <PDFDownloadLink document={<ScriptDoc titlePg={titlePg} scriptTxt={scriptTxt}/>} fileName="script.pdf"
 >
      Download
      </PDFDownloadLink>: "Loading Script..."}
      <button className="close-modal" onClick={cancel}>
        X
      </button>
    </div>
  );
};

export default PrintListScript;
