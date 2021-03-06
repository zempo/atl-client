import React, { useEffect, useContext } from "react";
import { ScriptsContext } from "../../Contexts/ScriptsContext";
import { AtlSection, AddBtn, PaginateScripts } from "../Utils/Utils";
import ListScript from "../Utils/Scripts/ListScript";
import ListSearchScript from "../Utils/Scripts/ListSearchScript";
import "./Styles/ScriptsPage.css";
import { SkeletonLoaderScripts } from "../Utils/Scripts/SkeletonScripts";
import ScriptsSearch from "../Forms/Search/ScriptsSearch";

const ScriptsPage = (props) => {
  const {
    value: {
      scripts,
      scriptsPerPg,
      currentScripts,
      currentSearchScripts,
      searchScripts,
      searchScriptsPerPg,
      searching,
      currentPg,
      currentSearchPg,
      paginate,
      paginateSearch,
      lastPg,
      lastSearchPg,
      direction,
      setDirection,
      loading,
    },
  } = useContext(ScriptsContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    setDirection("");
  }, [setDirection]);

  useEffect(() => {
    if (props.history.location.state && props.history.location.state.new) {
      props.history.push({
        state: { new: false },
        pathname: "/scripts",
      });
      window.location.reload();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AtlSection className='atl-pg scripts-pg'>
      <h1 className='animated-h1'>My Projects</h1>
      <ScriptsSearch />
      <hr />
      <AddBtn />
      <div className={`scripts-container ${direction}`}>
        {loading ? <SkeletonLoaderScripts /> : null}
        {!searching
          ? currentScripts.map((script, i) => {
              return (
                <div key={i}>
                  <ListScript direction={direction} script={script} />
                </div>
              );
            })
          : currentSearchScripts.map((script, i) => {
              return (
                <div key={i}>
                  <ListSearchScript direction={direction} script={script} />
                </div>
              );
            })}
      </div>
      {scripts.length > scriptsPerPg && !searching ? (
        <PaginateScripts
          currentScripts={currentScripts}
          currentPg={currentPg}
          lastPg={lastPg}
          paginate={paginate}
        />
      ) : searchScripts.length > searchScriptsPerPg && searching ? (
        <PaginateScripts
          currentScripts={currentSearchScripts}
          currentPg={currentSearchPg}
          lastPg={lastSearchPg}
          paginate={paginateSearch}
        />
      ) : null}
    </AtlSection>
  );
};

export default ScriptsPage;
