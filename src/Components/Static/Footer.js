import React, { useContext } from "react";
import "./Styles/Static.css";
import { UserContext } from "../../Contexts/UserContext";

const Footer = () => {
  // add a scroll to top button, additional map menu, eventual site map, and custom signature
  const {
    value: { userColor }
  } = useContext(UserContext);
  return (
    <footer className="atl-footer" style={{ background: `${userColor}` }}>
      <h2>Above The Line</h2>
      <h3>Created by Solomon Zelenko</h3>
    </footer>
  );
};

export default Footer;
