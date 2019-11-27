import React, { useEffect } from "react";
import { AtlSection } from "../Utils/Utils";
import { EditorLogo } from "../../Images/SVGS";
import { NavLink } from "react-router-dom";
import "./Styles/Landing.css";

const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AtlSection className="atl-pg landing-pg">
      <h1 className="animated-h1">Above The Line</h1>
      <div className="landing-container">
        <div className="landing-1">
          <h2>Scripts & Screenplays</h2>
          <h3>As Fast as You Can Think</h3>
          <EditorLogo />
          <h3 className="register">
            <NavLink exact activeClassName="active-auth" to="/register">
              Start Crafting Scenes
            </NavLink>
          </h3>
        </div>
        <div className="landing-2">
          <h3>{`Introducing { Actors } & [ Tags ]`}</h3>
          <p className="script-txt">
            "[Action] Kitt and Alex are hired to convince you to use this
            website. They will do their best.
          </p>
          <p className="script-txt">
            {`{Kitt}`} I can't believe this website autoformats your scripts!{" "}
          </p>
          <p className="script-txt">
            {`{Alex}`} I know, right? I've saved so much time!
          </p>
          <p className="script-txt">
            (The producer agressively points to the teleprompter)
          </p>
          <p className="script-txt">Oh, yeah! And it's totally free!</p>
          <p className="script-txt">{`{Kitt}`} Wow! That's amazing!</p>
          <p className="script-txt">
            {`{Alex}`} I'm contractually obligated to agree with you!
          </p>
          <p className="script-txt">[Transition] Fade Out"</p>
          <br />
          <p className="script-txt pg-num">1</p>
          <p className="script-txt slugline">Int. Above the Line HQ</p>
        </div>
        <div className="landing-3">
          <h3>Save Every Second</h3>
          <p className="landing-txt">
            Add actors and tags to your script. Then keep on typing.
            <br /> With a click of a button, everything gets formatted for you.
          </p>
          <p className="landing-txt">Just be sure to save your work!</p>
          <p className="script-txt pg-num">2</p>
        </div>
      </div>
    </AtlSection>
  );
};

export default Landing;
