import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import TokenService from "../../Services/Auth/token-service";
import IdleService from "../../Services/Auth/idle-service";
import { UserContext } from "../../Contexts/UserContext";
import { Hyph, NavMenuOption } from "../Utils/Utils";
import { LightLogo } from "../../Images/SVGS";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      showing: false,
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
      <div className='logged-in auth-link'>
        <h3>
          <i className='far fa-user-circle'></i> &nbsp;
          {user_name && user_name.length > 15
            ? `${user_name.slice(0, 15)}... `
            : `${user_name} `}
          <button
            className='nav-menu-btn'
            onClick={() => this.setState({ showing: !this.state.showing })}
            title='show-menu'
          >
            {!showing ? <p>&#9662;</p> : <p>&#9652;</p>}
          </button>
        </h3>
      </div>
    );
  }

  renderLoginLink() {
    // window.location.reload();
    // console.log("reload");
    return (
      <div className='logged-out auth-link'>
        <h3>
          <NavLink exact activeClassName='active-auth' to='/login'>
            Login
          </NavLink>
          <Hyph />
          <NavLink exact activeClassName='active-auth' to='/register'>
            Register
          </NavLink>
        </h3>
      </div>
    );
  }

  render() {
    const { userColor, admin } = this.context.value;
    // let error = this.context.value.error;

    return (
      <>
        <nav className='atl-nav-menu' style={{ background: `${userColor}` }}>
          <NavLink exact activeClassName='active' to='/scripts'>
            {/* created with https://svg2jsx.com/, conditional dark or light logo */}
            <LightLogo width='120' height='90' />
          </NavLink>
          <div className='nav-menu'>
            {/* && this.context.value.error !== 401 */}
            {TokenService.hasAuthToken() == true
              ? this.renderLogoutLink()
              : this.renderLoginLink()}
          </div>
        </nav>
        <div
          className={`accordion-menu ${this.state.showing ? "open" : "closed"}`}
          style={{ background: `${userColor}` }}
        >
          <ul onClick={() => this.setState({ showing: !this.state.showing })}>
            {admin ? (
              <NavMenuOption
                to='/admin'
                icon={<i className='fas fa-tools'></i>}
                text='Admin Pg'
              />
            ) : null}
            <NavMenuOption
              to='/user-settings'
              icon={<i className='fas fa-sliders-h'></i>}
              text='Appearance'
            />
            <NavMenuOption
              to='/scripts'
              icon={<i className='fas fa-scroll'></i>}
              text='My Projects'
            />
            <NavMenuOption
              to='/user-guide'
              icon={<i className='far fa-question-circle'></i>}
              text='Get Started'
            />
            <li className='nav-link'>
              <Link onClick={this.handleLogoutClick} to='/'>
                <h3>
                  <i className='fas fa-sign-out-alt'></i> Log Out
                </h3>
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default Nav;
