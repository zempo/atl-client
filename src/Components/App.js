import React, { Component } from "react";
import { BrowserRouter as ROUTER, Route, Switch } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
// SERVICES
// eslint-disable-next-line
import { AuthService } from "../Services/Auth/auth-service";
import IdleService from "../Services/Auth/idle-service";
import TokenService from "../Services/Auth/token-service";
// Static Components
import Nav from "./Static/Nav";
import Footer from "./Static/Footer";
// Routes
import ErrorPage from "./Routes/ErrorPage";
import Landing from "./Routes/Landing";
import ScriptsPage from "./Routes/ScriptsPage";
import ScriptEditor from "./Routes/ScriptEditor";
import UserGuide from "./Routes/UserGuide";
import UserSettings from "./Routes/UserSettings";
import RegisterPage from "./Routes/RegisterPage";
import LoginPage from "./Routes/LoginPage";
// Utils + Styles
import AuthorizedRoute from "./Utils/Auth/AuthorizedRoute";
import PublicRoute from "./Utils/Auth/PublicRoute";
import { configure } from "react-hotkeys";
import "./App.css";
import { UsersPage } from "./Routes/UsersPage";

class App extends Component {
  state = { hasError: false };

  static contextType = UserContext;

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidMount() {
    // IdleService.setIdleCallback(this.logoutFromIdle);
    configure({
      customKeyCodes: {
        32: "SPACE_BAR",
      },
      ignoreTags: [],
    });

    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthService.postRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();

    this.forceUpdate();
  };

  render() {
    let { userColor } = this.context.value;
    return (
      <>
        <ROUTER>
          <header className='atl-header'>
            <Nav />
          </header>
          <main className='atl-main' style={{ background: `${userColor}e0` }}>
            <ErrorPage>
              <Switch>
                <Route exact path={"/"} component={Landing} />
                <AuthorizedRoute exact path={"/admin"} component={UsersPage} />
                <AuthorizedRoute
                  exact
                  path={"/scripts"}
                  component={ScriptsPage}
                />
                <AuthorizedRoute
                  exact
                  path={"/script-editor"}
                  component={ScriptEditor}
                />
                <AuthorizedRoute
                  exact
                  path={"/user-guide"}
                  component={UserGuide}
                />
                <AuthorizedRoute
                  exact
                  path={"/user-settings"}
                  component={UserSettings}
                />
                <PublicRoute exact path={"/login"} component={LoginPage} />
                <PublicRoute
                  exact
                  path={"/register"}
                  component={RegisterPage}
                />
              </Switch>
            </ErrorPage>
          </main>
          <Footer />
        </ROUTER>
      </>
    );
  }
}

export default App;
