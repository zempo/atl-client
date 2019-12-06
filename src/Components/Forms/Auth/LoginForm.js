import React, { useState, useRef } from "react";
import { useForm } from "../../../Hooks/use-files";
import { AuthService } from "../../../Services/Auth/auth-service";
import { validateLogin } from "../../../Services/validation/auth-form-service";
import { AtlNotification, Required } from "../../Utils/Utils";
import "../Styles/Forms.css";
import "../Styles/Auth.css";

const LoginForm = props => {
  const [err, setErr] = useState({
    resMsg: "",
    resStatus: 0
  });
  // eslint-disable-next-line
  const { values, errors, handleChange, reset } = useForm(
    { email: "", password: "" },
    { 1: [], 2: [] },
    {},
    { 1: validateLogin, 2: validateLogin }
  );
  const emailRef = useRef();
  const pwdRef = useRef();

  const handleSubmit = async e => {
    e.preventDefault();

    const { email, password } = values;

    setErr({
      resMsg: "",      
      resStatus: 0
    }); 

    try {

      const validLogin = await AuthService.postLogin({
        email,
        password
      });

      setErr({
        resMsg: "Successful Login!",
        resStatus: 200
      });

      // if (!validLogin) {
      //   console.log("Failed Login");
      // }
 
      setTimeout(() => {
        reset();
        props.onLoginSuccess();
      }, 500)
      console.clear();
    } catch (error) {
      setErr({
        resStatus: error.response.status,
        resMsg: Object.values(error.response.data.error)
      });
      setTimeout(() => {
        setErr({
          resMsg: "",
          resStatus: 0
        });
      }, 5000);
    }
  };

  return (
    <form
      className="atl-form login-form"
      onSubmit={handleSubmit}
      autoComplete="dumb"
    >
      {err.resStatus === 0 ? null : (
        <AtlNotification type={err.resStatus} msg={err.resMsg} />
      )}
      <fieldset>
        <br />
        <label htmlFor="email">
          <Required met={values.email.length === 0 ? false : true} />
          Email
        </label>
        <br />
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
        <br />
        <label htmlFor="password">
          <Required met={values.password.length === 0 ? false : true} />
          Password
        </label>
        <br />
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
      <button
        className="action-auth"
        disabled={values.email.length === 0 || values.password.length === 0}
      >
        Login
      </button>
    </form>
  );
};

LoginForm.defaultProps = {
  onLoginSuccess: () => {}
};

export default LoginForm;
