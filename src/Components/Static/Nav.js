import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import TokenService from "../../Services/Auth/token-service";
import IdleService from "../../Services/Auth/idle-service";
import { UserContext } from "../../Contexts/UserContext";
import { Hyph } from "../Utils/Utils";

class Nav extends Component {
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

    return (
      <div className="logged-in auth-link">
        <h3>
          <i className="far fa-user-circle"></i> &nbsp;
          {user_name && user_name.length > 10 ? `${user_name.slice(0, 10)}...` : user_name}
          <Hyph />
          <Link onClick={this.handleLogoutClick} to="/">
            Logout
          </Link>
        </h3>
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
            <img
              className="logo-link"
              src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7a3ec529632909.55fc107b84b8c.png"
              alt="homepage"
              width="70"
              height="70"
            />
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
