import React, { useContext, useState, useEffect } from "react";
import { ResizableBox as Box } from "react-resizable";
import { StyleContext } from "../../../Contexts/StyleContext";
import "../Styles/Editor.css";
// import { UserContext } from "../../../Contexts/UserContext";
import { PDFViewer } from "@react-pdf/renderer";
import { ScriptDoc } from "../Scripts/ScriptDoc";
import { readScripts } from "../../../Services/endpoints-service";
import {
  sortScriptSentences,
  formateScriptDate
} from "../../../Services/algos-service";
import "../Styles/Output.css";

const Output = ({ currentId }) => {
  const {
    value: { tenthHeight, tenthWidth }
  } = useContext(StyleContext);
  // const {
  //   value: { userColor }
  // } = useContext(UserContext);

  const [titlePg, setTitlePg] = useState({
    title: "",
    author: "",
    subtitle: "",
    datePublished: ""
  });
  const [scriptTxt, setScriptTxt] = useState([
    { tag: "", actor: "", lines: [""] }
  ]);
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const findScript = async () => {
      try {
        const result = await readScripts.get(`/${currentId}`);
        let date;
        date = result.data[0].date_created;
        if (result.data[0].date_updated !== null) {
          date = result.data[0].date_updated;
        }
        const sort = await sortScriptSentences(result.data[0].body);
        const formatDate = await formateScriptDate(date);

        setTitlePg({
          title: result.data[0].title,
          author: result.data[0].author,
          subtitle: result.data[0].subtitle,
          datePublished: formatDate
        });
        if (sort.length !== 0) {
          setScriptTxt(sort);
        }
        setShow(true);
      } catch (error) {
        console.log(error);
      }
    };

    findScript();
  }, [currentId]);

  const updateOutput = async e => {
    e.preventDefault();
    setLoad(true);
    try {
      const result = await readScripts.get(`/${currentId}`);
      // console.log(result);
      let date;
      date = result.data[0].date_created;
      if (result.data[0].date_updated !== null) {
        date = result.data[0].date_updated;
      }
      const sort2 = await sortScriptSentences(result.data[0].body);
      const formatDate = await formateScriptDate(date);

      setTitlePg({
        title: result.data[0].title,
        author: result.data[0].author,
        subtitle: result.data[0].subtitle,
        datePublished: formatDate
      });
      if (sort2.length !== 0) {
        setScriptTxt(sort2);
      }
      setShow(true);
      setLoad(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  };

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
          <button className="output-update-btn" onClick={updateOutput}>
            {!load ? "Format Your Scene" : "Writing..."}
          </button>
          <p>*Select 'Fit to Page' when printing*</p>
        </div>
        {show && scriptTxt.length > 0 ? (
          <PDFViewer width="100%" height="80%" className="script-viewer-output">
            <ScriptDoc titlePg={titlePg} scriptTxt={scriptTxt} />
          </PDFViewer>
        ) : (
          "Loading Script..."
        )}
      </Box>
    </>
  );
};

export default Output;
