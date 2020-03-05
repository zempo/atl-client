import React, { useEffect } from "react";
import { AtlSection } from "../Utils/Utils";
import { EditorLogo } from "../../Images/SVGS";
import { NavLink } from "react-router-dom";
import Img1 from "../../Images/section1.gif";
import Img2 from "../../Images/section2.gif";
import Img3 from "../../Images/section3.gif";
import "./Styles/Landing.css";
import { AuthService } from "../../Services/Auth/auth-service";
import TokenService from "../../Services/Auth/token-service";
 
const Landing = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const runDemo = async e => {
    e.preventDefault();
    let email = "guest@scodes.com";
    let password = "GreatGuest@@17";
    try {
      const { history } = props;
      history.push("/scripts");
      const validLogin = await AuthService.postLogin({
        email,
        password
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AtlSection className="atl-pg landing-pg">
      <h1 className="animated-h1">Above The Line</h1>
      <div className="landing-container">
        <div className="landing-1">
          <h2>Scripts & Screenplays</h2>
          <h3>As Fast as You Can Think</h3>
          <EditorLogo />
          <NavLink
            exact
            activeClassName="active-auth"
            to="/register"
            title="register"
          >
            <h3 className="register">Start Crafting Scenes</h3>
          </NavLink>
          <button disabled={TokenService.hasAuthToken()} onClick={runDemo} className="demo" title="demo">
            <h3>Try it Out</h3>
          </button>
        </div>
        <div className="landing-2">
          <h3>{`Introducing { Actors } & [ Tags ]`}</h3>
          <p className="script-txt line">
            "[Action] Kitt and Alex are hired to convince you to use this
            website. They will do their best.
          </p>
          <p className="script-txt line">
            {`{Kitt}`} I can't believe this website autoformats your scripts!{" "}
          </p>
          <p className="script-txt line">
            {`{Alex}`} I know, right? I've saved so much time!
          </p>
          <p className="script-txt line">
            (The producer agressively points to the teleprompter)
          </p>
          <p className="script-txt line">Oh, yeah! And it's totally free!</p>
          <p className="script-txt line">{`{Kitt}`} Wow! That's amazing!</p>
          <p className="script-txt line">
            {`{Alex}`} I'm contractually obligated to agree with you!
          </p>
          <p className="script-txt line">[Transition] Fade Out"</p>
          <p className="script-txt pg-num">1</p>
          <p className="script-txt slugline">Int. Above the Line HQ</p>
        </div>
        <div className="landing-3">
          <h3>Create at your Pace</h3> 
          <img className="landing-gif" src={Img1} alt="gif of website homepage" />
          <p className="landing-txt">
 Just add the title page info, insert actors and tags in your lines. <br/> And we'll take care of the rest.
          </p>
          <br/>
          <p className="landing-txt">Just be sure to save!</p>
          <p className="script-txt pg-num">2</p>
        </div>
        <div className="landing-4">
          <h3>Organize your Projects</h3>
          <img className="landing-gif" src={Img3} alt="gif of website search form" />
          <p className="landing-txt">Even when your projects start to pile up, find what you need. <br/> Above the Line is your script management system.</p>
          <br />
          <p className="script-txt pg-num">3</p>
        </div>
        <div className="landing-5">
          <h3>Customize your Workplace</h3>
          <img className="landing-gif" src={Img2} alt="gif of website" />
          <p className="landing-txt">Above the Line is your script writing environment. </p>
          <p className="script-txt pg-num">4</p>
        </div>
      </div>
    </AtlSection>
  );
};

Landing.defaultProps = {
  history: {
    push: () => {}
  }
};

export default Landing;
