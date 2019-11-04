import React, { useEffect } from "react";
import RegisterForm from "../Forms/Auth/RegisterForm";
import { AuthService } from "../../Services/Auth/auth-service";
import { AtlSection } from "../Utils/Utils";

const RegistrationPage = (props) => {
  const handleRegistrationSuccess = async (email, password) => {
    // console.log(email, password);
    try {
      const validLogin = await AuthService.postLogin({
        email,
        password
      });

      if (!validLogin) {
        console.log("Failed Login");
      }
      const { history } = props;
      history.push("/scripts");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
