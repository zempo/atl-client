import React from "react";
import RegisterForm from "../Forms/Auth/RegisterForm";
import { AtlSection } from "../Utils/Utils";

const RegistrationPage = (props) => {
  const handleRegistrationSuccess = (user) => {
    const { history } = props;
    history.push("/login");
  };

  return (
    <AtlSection className="atl-page registration-page">
      <h1 className="animated-h1">Register</h1>
      <RegisterForm onRegistrationSuccess={handleRegistrationSuccess} />
    </AtlSection>
  );
};

RegistrationPage.defaultProps = {
  history: {
    push: () => {}
  }
};

export default RegistrationPage;
