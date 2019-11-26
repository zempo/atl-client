import React, { useContext, useRef, useState } from "react";
import { useInput } from "../../../Hooks/use-input";
import MagGlass from "../../../Images/mGlass.svg.png";
import { ScriptsContext } from "../../../Contexts/ScriptsContext";
import { readScripts } from "../../../Services/endpoints-service";
import {
  sortByKeyword,
  sortBySelection
} from "../../../Services/algos-service";
import "../Styles/Forms.css";

export const ScriptsSearch = () => {
  const { value: keyword, bind: bindKeyword, reset: resetKeyword } = useInput(
    ""
  );
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortVal, setSortVal] = useState("abc");
  const {
    value: { setSearchScripts, setSearching, setLoading }
  } = useContext(ScriptsContext);

  const handleKeywordSearch = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const resetScripts = await readScripts.get("/");
      setLoading(false);
      const keywordSearch = await sortByKeyword(resetScripts.data, keyword);

      setSearchScripts(keywordSearch);
      setSearching(true);
      resetKeyword();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const handleSort = async e => {
    e.preventDefault();
    let sortBy = e.target.value;
    setSortVal(sortBy);
    setLoading(true);
    try {
      const resetScripts = await readScripts.get("/");
      setLoading(false);
      const sortSearch = await sortBySelection(
        resetScripts.data,
        sortBy,
        sortDirection
      );

      setSearchScripts(sortSearch);
      setSearching(true);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const toggleSortDirection = async e => {
    e.preventDefault();
    setLoading(true);
    if (sortDirection === "desc") {
      setSortDirection("asc");
      try {
        const resetScripts = await readScripts.get("/");
        setLoading(false);
        const sortSearch = await sortBySelection(
          resetScripts.data,
          sortVal,
          sortDirection
        );
        setSearchScripts(sortSearch);
        setSearching(true);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    } else {
      setSortDirection("desc");
      try {
        const resetScripts = await readScripts.get("/");
        setLoading(false);
        const sortSearch = await sortBySelection(
          resetScripts.data,
          sortVal,
          sortDirection
        );
        setSearchScripts(sortSearch);
        setSearching(true);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
  };
  return (
    <>
      <form className="atl-form search-form">
        <fieldset className="keyword-search">
          <input
            type="text"
            name="keyword"
            placeholder="Search Your Scripts"
            {...bindKeyword}
          />
          <button
            className="scripts-search-btn"
            onClick={handleKeywordSearch}
            title="search"
          >
            <img width="20" height="20" src={MagGlass} alt="search scripts" />
          </button>
        </fieldset>
        <fieldset className="sort-search">
          <select name="sort" onChange={handleSort} defaultValue="abc">
            <option value="abc">Alphabetically</option>
            <option value="date">Last Modified</option>
            <option value="size">Script Length</option>
          </select>
          {/* descending means smaller/least amount of a quality will be last, ascending means smaller will be first */}
          <button className="search-btn-sort" onClick={toggleSortDirection}>
            {sortDirection === "desc" ? <span>↑</span> : <span>↓</span>}
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default ScriptsSearch;
