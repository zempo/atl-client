import React, { Component } from "react";
import { BrowserRouter as ROUTER, Route, Switch } from "react-router-dom";
// SERVICES
import { AuthService } from "../services/auth/auth-service";
import IdleService from "../services/auth/idle-service";
import TokenService from "../services/auth/token-service";
// Static
import Nav from "./static/Nav";
import Footer from "./static/Footer";

// Routes
import Landing from "./routes/Landing";
import ScriptsPage from "./routes/ScriptsPage";
import ScriptEditor from "./routes/ScriptEditor";
import UserGuide from "./routes/UserGuide";
import UserSettings from "./routes/UserSettings";
import RegisterPage from "./routes/RegisterPage";
import LoginPage from "./routes/LoginPage";
// Utils + Styles
import AuthorizedRoute from "./Utils/Auth/AuthorizedRoute";
import PublicRoute from "./Utils/Auth/PublicRoute";
import "./App.css";

class App extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle);

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
    return (
      <>
        <ROUTER>
          <header className="atl-header">
            <Nav />
          </header>
          <main className="atl-main">
            <ErrorPage>
              <Switch>
                <Route exact path={"/"} component={Landing} />
                <AuthorizedRoute exact path={"/scripts"} component={ScriptsPage} />
                <AuthorizedRoute exact path={"/script-editor"} component={ScriptEditor} />
                <AuthorizedRoute exact path={"/user-guide"} component={UserGuide} />
                <AuthorizedRoute exact path={"/user-settings"} component={UserSettings} />
                <PublicRoute exact path={"/login"} component={LoginPage} />
                <PublicRoute exact path={"/register"} component={RegisterPage} />
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
