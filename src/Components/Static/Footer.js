import React, { useContext } from "react";
import "./Styles/Static.css";
import { UserContext } from "../../Contexts/UserContext";
import Sig from "../../Images/sig.svg";

const Footer = () => {
  // add a scroll to top button, additional map menu, eventual site map, and custom signature
  const {
    value: { userColor }
  } = useContext(UserContext);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="atl-footer" style={{ background: `${userColor}` }}>
      <h3 style={{fontSize: 30, cursor: 'pointer'}} onClick={scrollUp}>Above The Line</h3>
      <h4 style={{fontSize: 20, marginTop: -10}}><strong>&copy; 2020</strong> <a
          className="signature"
          href="https://solomonzelenko.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://i.imgur.com/LlMXxEm.png" alt="Solomon Zelenko" />
        </a></h4>
    </footer>
  );
};

export default Footer;
