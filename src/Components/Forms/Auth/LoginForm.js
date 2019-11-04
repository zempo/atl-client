import React, { useState, useRef } from "react";
import { useForm } from "../../../Hooks/use-files";
import { AuthService } from "../../../Services/auth/auth-service";
import { validateLogin } from "../../../Services/validation/auth-form-service";
import { AtlNotification, Required } from "../../Utils/Utils";
import "../css/Forms.css";

const LoginForm = (props) => {
  // eslint-disable-next-line
  const { values, errors, handleChange, reset } = useForm(
    { email: "", password: "" },
    { 1: [], 2: [] },
    {},
    { 1: validateLogin, 2: validateLogin }
  );
  const [resMsg, setResMsg] = useState("");
  const [resStatus, setResStatus] = useState(0);
  const emailRef = useRef();
  const pwdRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = values;
    setResStatus(0);
    setResMsg("");
    try {
      const validLogin = await AuthService.postLogin({
        email,
        password
      });

      if (!validLogin) {
        console.log("Failed Login");
      }

      setResStatus(200);
      setResMsg("Successful Login");
      reset();
      props.onLoginSuccess();
      console.clear();
    } catch (error) {
      setResStatus(error.response.status);
      setResMsg(Object.values(error.response.data.error));
      setTimeout(() => {
        setResStatus(0);
      }, 5000);
    }
  };

  return (
    <form className="atl-form login-form" onSubmit={handleSubmit} autoComplete="dumb">
      {resStatus === 0 ? null : <AtlNotification type={resStatus} msg={resMsg} />}
      <fieldset>
        <br />
        <label htmlFor="email">
          <Required met={values.email.length === 0 ? false : true} />
          Email
        </label>
        <br />
        <input
          ref={emailRef}
          placeholder="john@doemail.com"
          name="email"
          type="text"
          id={1}
          value={values.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">
          <Required met={values.password.length === 0 ? false : true} />
          Password
        </label>
        <br />
        <input
          ref={pwdRef}
          placeholder="Secret@123"
          name="password"
          type="password"
          id={2}
          value={values.password}
          onChange={handleChange}
        />
      </fieldset>
      <button className="action" disabled={values.email.length === 0 || values.password.length === 0}>
        Login
      </button>
    </form>
  );
};

LoginForm.defaultProps = {
  onLoginSuccess: () => {}
};

export default LoginForm;
