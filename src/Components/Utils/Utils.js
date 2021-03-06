import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Modal from "../../Modals/Modal";
import { useModal } from "../../Hooks/use-modal";
import "./Styles/Utils.css";
import { UserContext } from "../../Contexts/UserContext";

export const AtlNotification = ({ type, msg, done }) => {
  const [displaying, setDisplaying] = useState(true);

  const handleClick = e => {
    e.preventDefault();
    setDisplaying(false);
    // console.clear();
  };

  if (displaying) {
    return (
      <div id={type} className="atl-notification" onClick={handleClick}>
        <h3>
          {type < 208 ? ( 
            <i className="fas fa-check"></i>
          ) : (
            <i className="fas fa-times-circle"></i>
          )}
          &nbsp;
          {msg}
        </h3>
      </div>
    );
  } else {
    return null;
  }
};

export const SkeletonTags = () => {
  const {
    value: { userColor }
  } = useContext(UserContext);

  return (
    <>
      <li className="tag-control skeleton-tag">
        <button
          className="append-tag"
          style={{
            background: userColor,
            border: `2px solid ${userColor}`
          }}
        >
          Loading
        </button>
        <button
          className="delete-tag"
          disabled={true}
          style={{
            background: `${userColor}b3`,
            border: `2px solid ${userColor}`
          }}
        >
          x
        </button>
      </li>
      <li className="tag-control skeleton-tag">
        <button
          className="append-tag"
          style={{
            background: userColor,
            border: `2px solid ${userColor}`
          }}
        >
          Load
        </button>
        <button
          className="delete-tag"
          disabled={true}
          style={{
            background: `${userColor}b3`,
            border: `2px solid ${userColor}`
          }}
        >
          x
        </button>
      </li>
      <li className="tag-control skeleton-tag">
        <button
          className="append-tag"
          style={{
            background: userColor,
            border: `2px solid ${userColor}`
          }}
        >
          Loader
        </button>
        <button
          className="delete-tag"
          disabled={true}
          style={{
            background: `${userColor}b3`,
            border: `2px solid ${userColor}`
          }}
        >
          x
        </button>
      </li>
      <li className="tag-control skeleton-tag">
        <button
          className="append-tag"
          style={{
            background: userColor,
            border: `2px solid ${userColor}`
          }}
        >
          Loa
        </button>
        <button
          className="delete-tag"
          disabled={true}
          style={{
            background: `${userColor}b3`,
            border: `2px solid ${userColor}`
          }}
        >
          x
        </button>
      </li>
      <li className="tag-control skeleton-tag">
        <button
          className="append-tag"
          style={{
            background: userColor,
            border: `2px solid ${userColor}`
          }}
        >
          Loader
        </button>
        <button
          className="delete-tag"
          disabled={true}
          style={{
            background: `${userColor}b3`,
            border: `2px solid ${userColor}`
          }}
        >
          x
        </button>
      </li>
      <li className="tag-control skeleton-tag">
        <button
          className="append-tag"
          style={{
            background: userColor,
            border: `2px solid ${userColor}`
          }}
        >
          Loadin
        </button>
        <button
          className="delete-tag"
          disabled={true}
          style={{
            background: `${userColor}b3`,
            border: `2px solid ${userColor}`
          }}
        >
          x
        </button>
      </li>
      <li className="tag-control skeleton-tag">
        <button
          className="append-tag"
          style={{
            background: userColor,
            border: `2px solid ${userColor}`
          }}
        >
          Loading
        </button>
        <button
          className="delete-tag"
          disabled={true}
          style={{
            background: `${userColor}b3`,
            border: `2px solid ${userColor}`
          }}
        >
          x
        </button>
      </li>
      <li className="tag-control skeleton-tag">
        <button
          className="append-tag"
          style={{
            background: userColor,
            border: `2px solid ${userColor}`
          }}
        >
          Loaded
        </button>
        <button
          className="delete-tag"
          disabled={true}
          style={{
            background: `${userColor}b3`,
            border: `2px solid ${userColor}`
          }}
        >
          x
        </button>
      </li>
      <li className="tag-control skeleton-tag">
        <button
          className="append-tag"
          style={{
            background: userColor,
            border: `2px solid ${userColor}`
          }}
        >
          Lo
        </button>
        <button
          className="delete-tag"
          disabled={true}
          style={{
            background: `${userColor}b3`,
            border: `2px solid ${userColor}`
          }}
        >
          x
        </button>
      </li>
      <li className="tag-control skeleton-tag">
        <button
          className="append-tag"
          style={{
            background: userColor,
            border: `2px solid ${userColor}`
          }}
        >
          Loaded
        </button>
        <button
          className="delete-tag"
          disabled={true}
          style={{
            background: `${userColor}b3`,
            border: `2px solid ${userColor}`
          }}
        >
          x
        </button>
      </li>
      <li className="tag-control skeleton-tag">
        <button
          className="append-tag"
          style={{
            background: userColor,
            border: `2px solid ${userColor}`
          }}
        >
          Lo
        </button>
        <button
          className="delete-tag"
          disabled={true}
          style={{
            background: `${userColor}b3`,
            border: `2px solid ${userColor}`
          }}
        >
          x
        </button>
      </li>
      <li className="tag-control skeleton-tag">
        <button
          className="append-tag"
          style={{
            background: userColor,
            border: `2px solid ${userColor}`
          }}
        >
          Loaded
        </button>
        <button
          className="delete-tag"
          disabled={true}
          style={{
            background: `${userColor}b3`,
            border: `2px solid ${userColor}`
          }}
        >
          x
        </button>
      </li>
      <li className="tag-control skeleton-tag">
        <button
          className="append-tag"
          style={{
            background: userColor,
            border: `2px solid ${userColor}`
          }}
        >
          Lo
        </button>
        <button
          className="delete-tag"
          disabled={true}
          style={{
            background: `${userColor}b3`,
            border: `2px solid ${userColor}`
          }}
        >
          x
        </button>
      </li>
    </>
  );
};

export function AtlSection({ className, list, ...props }) {
  const classes = ["Section", list && "Section--list", className]
    .filter(Boolean)
    .join(" ");
  return <section className={classes} {...props} />;
}

export const Hyph = () => {
  return <span className="Hyph">{" - "}</span>;
};

export const Required = ({ met }) => {
  if (!met) {
    return <span className="required"></span>;
  } else {
    return <span className="met">&#10003;</span>;
  }
};

export const MenuOption = ({ to, text, script }) => {
  return (
    <div className="menu-btn">
      <Link
        to={{
          pathname: to,
          state: {
            item: script
          }
        }}
      >
        {text}
      </Link>
    </div>
  );
};

export const NavMenuOption = ({ to, text, icon, payload }) => {
  return (
    <li className="nav-link" tabIndex="0">
      <Link
        to={{
          pathname: to,
          state: {
            item: payload
          }
        }}
      >
        <h3>
          {icon}&nbsp;
          {text}
        </h3>
      </Link>
    </li>
  );
};

export const AddBtn = () => {
  const {
    value: { userColor }
  } = useContext(UserContext);
  // do conditional for all colors
  const { isShowing: isShowingAdd, toggle: toggleAdd } = useModal();
  return (
    <>
      <button
        style={{ background: userColor }}
        className="btn btn-add"
        title="add script"
        onClick={toggleAdd}
      >
        <i className="fas fa-plus fa-3x" />
      </button>
      <Modal isShowing={isShowingAdd} hide={toggleAdd} action="add-script" />
    </>
  );
};

export const BackBtn = ({ history }) => {
  const {
    value: { userColor }
  } = useContext(UserContext);
  // do conditional for all colors
  return (
    <>
      <Link
        to="/scripts"
        style={{ background: userColor }}
        className="btn btn-back"
        title="go back"
        onClick={() => window.scrollTo(0, 0)}
      >
        <i className="fas fa-arrow-left"></i>
      </Link>
    </>
  );
};

export const PaginateScripts = ({
  currentScripts,
  paginate,
  currentPg,
  lastPg
}) => {
  return (
    <AtlSection className="paginate-scripts">
      <ul className="pagination-controls">
        <li className="pagination-item">
          <button
            id="prev"
            disabled={!currentScripts || currentPg === 1}
            className="page-btn"
            onClick={e => paginate(e)}
          ></button>
        </li>
        <li className="pagination-counter">
          Page {Number(currentPg)} of {Number(lastPg)}
        </li>
        <li className="pagination-item">
          <button
            id="next"
            disabled={!currentScripts || currentPg === lastPg}
            className="page-btn"
            onClick={e => paginate(e)}
          ></button>
        </li>
      </ul>
    </AtlSection>
  );
};
