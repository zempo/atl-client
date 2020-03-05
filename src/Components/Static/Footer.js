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
      <h2 onClick={scrollUp}>Above The Line</h2>
      <h3>
      &copy; 2020, All Rights Reserved &nbsp; Website By 
        <a
          className="signature"
          href="https://github.com/zempo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Sig} alt="Solomon Zelenko" />
        </a>
      </h3>
    </footer>
  );
};

export default Footer;
