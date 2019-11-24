import React, { useContext, useState, useEffect } from "react";
import { ResizableBox as Box } from "react-resizable";
import { StyleContext } from "../../../Contexts/StyleContext";
import "../Styles/Editor.css";
import { UserContext } from "../../../Contexts/UserContext";
import { PDFViewer } from "@react-pdf/renderer";
import { ScriptDoc } from "../Scripts/ScriptDoc";
import { readScripts } from "../../../Services/endpoints-service";
import { sortScriptSentences } from "../../../Services/algos-service";
import '../Styles/Output.css'


const Output = ({currentId}) => {
  const {
    value: { tenthHeight, tenthWidth }
  } = useContext(StyleContext);
  const {
    value: { userColor }
  } = useContext(UserContext);

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
        const result = await readScripts.get(`/${currentId}`);
        const sort = await sortScriptSentences(result.data[0].body)

        setTitlePg({
          title: result.data[0].title,
          author: result.data[0].author,
          subtitle: result.data[0].subtitle
        });
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

  const updateOutput = async e => {
    e.preventDefault()

    try {
      const result = await readScripts.get(`/${currentId}`);
      const sort = await sortScriptSentences(result.data[0].body)

      setTitlePg({
        title: result.data[0].title,
        author: result.data[0].author,
        subtitle: result.data[0].subtitle
      });
      if (sort.length !== 0) { 
        setScriptTxt(sort)
      }
      setShow(true)
    } catch (err) {
      console.log(err)
    }
  }
 
  return (
    <>
      <Box
        className="box box-bottom"
        height={tenthHeight * 7.5}
        width={tenthWidth * 7.92}
        axis="both"
        resizeHandles={["s"]}
      >
        <div className="output-controls">
          <button className="output-update-btn" onClick={updateOutput}>Update</button>
        </div>
      {show && scriptTxt.length > 0 ? <PDFViewer width="100%" height="90%" className="script-viewer-output"><ScriptDoc titlePg={titlePg} scriptTxt={scriptTxt}/></PDFViewer>: "Loading Script..."}
      </Box>
    </>
  );
};

export default Output;
