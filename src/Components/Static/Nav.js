import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import TokenService from "../../Services/Auth/token-service";
import IdleService from "../../Services/Auth/idle-service";
import { UserContext } from "../../Contexts/UserContext";
import { Hyph, NavMenuOption } from "../Utils/Utils";
import { LightLogo } from "../../Images/LightLogo";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      showing: false
    };
  }

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };

  static contextType = UserContext;

  renderLogoutLink() {
    // console.log(TokenService.getId());
    // window.location.reload();

    const { user_name } = this.context.value.user;
    const { showing } = this.state;

    return (
      <div className="logged-in auth-link">
        <h3>
          <i className="far fa-user-circle"></i> &nbsp;
          {user_name && user_name.length > 15 ? `${user_name.slice(0, 15)}... ` : `${user_name} `}
          <button onClick={() => console.log(showing)} title="show-menu">
            &#9662;
          </button>
          <Link onClick={this.handleLogoutClick} to="/">
            Logout
          </Link>
        </h3>
        <div className="accordion-menu" style={{ display: showing ? "block" : "none" }}>
          <ul>
            <NavMenuOption to="/user-guide" icon={`<i class="far fa-question-circle"></i>`} text="User Guide" />
            <NavMenuOption to="/user-settings" icon={`<i class="far fa-question-circle"></i>`} text="User Settings" />
          </ul>
        </div>
      </div>
    );
  }

  renderLoginLink() {
    // window.location.reload();
    // console.log("reload");
    return (
      <div className="logged-out auth-link">
        <h3>
          <NavLink exact activeClassName="active-auth" to="/login">
            Login
          </NavLink>
          <Hyph />
          <NavLink exact activeClassName="active-auth" to="/register">
            Register
          </NavLink>
        </h3>
      </div>
    );
  }

  render() {
    // let error = this.context.value.error;

    return (
      <>
        <nav className="atl-nav-menu">
          <NavLink exact activeClassName="active" to="/scripts">
            {/* created with https://svg2jsx.com/ */}
            <LightLogo width="120" height="90" />
          </NavLink>
          <div className="nav-menu">
            {TokenService.hasAuthToken() && this.context.value.error !== 401
              ? this.renderLogoutLink()
              : this.renderLoginLink()}
          </div>
        </nav>
      </>
    );
  }
}

export default Nav;
