import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Modal from "../../Modals/Modal";
import { useModal } from "../../Hooks/use-modal";

export const AtlNotification = ({ type, msg, done }) => {
  const [displaying, setDisplaying] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    setDisplaying(false);
    // console.clear();
  };

  if (displaying) {
    return (
      <div id={type} className="jto-notification">
        <h3>
          <i className="fas fa-exclamation" />
          &nbsp;
          {msg}
        </h3>
        <button className="close-button" onClick={handleClick}>
          X
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export const Loader = ({ loading, status }) => {
  // little spinner for editor on "save"
};

export function AtlSection({ className, list, ...props }) {
  const classes = ["Section", list && "Section--list", className].filter(Boolean).join(" ");
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

export const AddBtn = () => {
  const { isShowing: isShowingAdd, toggle: toggleAdd } = useModal();
  return (
    <>
      <div className="btn btn-add" onClick={toggleAdd}>
        <i className="fas fa-plus fa-3x" title="add card" />
      </div>
      <Modal isShowing={isShowingAdd} hide={toggleAdd} action="add-script" />
    </>
  );
};

export const BackBtn = ({ history }) => {
  return (
    <>
      <button className="btn btn-back" title="go back" onClick={() => history.goBack()}>
        <span className="back-arrow">&#8592;</span>
      </button>
    </>
  );
};
