import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Modal from "../../Modals/Modal";
import { useModal } from "../../Hooks/use-modal";
import "./Styles/Utils.css";
import { UserContext } from "../../Contexts/UserContext";

export const AtlNotification = ({ type, msg, done }) => {
  const [displaying, setDisplaying] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    setDisplaying(false);
    // console.clear();
  };

  if (displaying) {
    return (
      <div id={type} className="atl-notification">
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

export const NavMenuOption = ({ to, text, icon, payload }) => {
  return (
    <li className="nav-link">
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
        style={{ background: `none`, color: userColor, border: `5px solid ${userColor}` }}
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
      <button
        style={{ background: `none`, color: userColor, border: `5px solid ${userColor}` }}
        className="btn btn-back"
        title="go back"
        onClick={() => history.goBack()}
      >
        <i className="fas fa-arrow-left"></i>
      </button>
    </>
  );
};
