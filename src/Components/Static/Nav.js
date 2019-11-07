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
            <svg
              className="menu-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              version="1.1"
              viewBox="0 0 238.125 169.07"
            >
              <g
                fill="none"
                stroke="#dbd9d9"
                strokeDasharray="none"
                strokeLinecap="round"
                strokeMiterlimit="4"
                strokeOpacity="1"
                strokeWidth="22.796"
              >
                <path
                  strokeLinejoin="round"
                  d="M219.724 154.195s-21.632 22.408-36.016 25.28c-27.245 5.442-62.185-38.092-81.382-18.008-8.59 8.988-2.608 34.232 9.696 36.017 14.617 2.12 23.203-16.97 23.203-37.748 0-20.779-7.965-95.235-10.043-101.468-.961-2.884-20.503 16.39-38.623 39.056-21.05 26.33-37.911 52.716-37.911 52.716"
                  transform="translate(0 -42.598)"
                ></path>
                <path
                  strokeLinejoin="miter"
                  d="M24.753 130.3s44.327-27.012 77.226-15.238c32.9 11.775 54.37 7.62 70.647-3.116"
                  transform="translate(0 -42.598)"
                ></path>
              </g>
            </svg>
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
