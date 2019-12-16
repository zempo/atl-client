import React, { useEffect } from "react";
import LoginForm from "../Forms/Auth/LoginForm";
import { AtlSection } from "../Utils/Utils";

const Login = props => {
  const handleLoginSuccess = () => {
    const { location, history } = props;
    const destination = (location.state || {}).from || "/scripts";
    history.push(destination);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AtlSection className="atl-page login-page">
      <h1 className="animated-h1">Login</h1>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </AtlSection>
  );
};

Login.defaultProps = {
  location: {},
  history: {
    push: () => {}
  }
};

export default Login;
