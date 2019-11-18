import React, { useEffect } from "react";
import RegisterForm from "../Forms/Auth/RegisterForm";
import { AuthService } from "../../Services/Auth/auth-service";
import { AtlSection } from "../Utils/Utils";
import { newScript } from "../../Services/endpoints-service";

const RegistrationPage = props => {
  const handleRegistrationSuccess = async (email, password) => {
    // console.log(email, password);
    const sampleScript = {
      title: "Sample Script",
      author: "You",
      subtitle: "Your Great Big Story",
      body:
        " [Int] The Script Editor [Description] Two extras from downtown LA glance down at their scripts. A web developer eagerly nods at a sound engineer. And the two actors --John and Jane begin their demo voiceover. {Jane} Click on the tags to add a speaker or direction to the scene. You can keep on typing after you click! {John} No need to add and format quotes, here!  {Jane} The script generator will take care of that for you! {John} But make sure to save your work! [Line-break] Use the sidebar controls to add new actors and scene directions!   [Line-break] {John} Once you're ready to download your script, click the generate button below!"
    };
    try {
      const validLogin = await AuthService.postLogin({
        email,
        password
      });

      if (!validLogin) {
        console.log("Failed Login");
      }

      console.log(validLogin);
      const created = await newScript.post(`/`, sampleScript);

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
