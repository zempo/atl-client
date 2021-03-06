import React, { useState, useEffect, useRef } from "react";
import {
  validatePwd,
  validateUsername,
  validateEmail,
} from "../../../Services/validation/auth-form-service";
import { useForm } from "../../../Hooks/use-files";
import { AuthService } from "../../../Services/Auth/auth-service";
import { AtlNotification, Required } from "../../Utils/Utils";
import "../Styles/Forms.css";
import "../Styles/Auth.css";

const RegisterForm = (props) => {
  // eslint-disable-next-line
  const { values, errors, handleChange, reset } = useForm(
    { username: "", email: "", password: "" },
    { 1: [], 2: [], 3: [] },
    {},
    { 1: validateUsername, 2: validateEmail, 3: validatePwd }
  );
  const [err, setErr] = useState({
    resMsg: "",
    resStatus: 0,
  });
  const [validReq, setValidReq] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();

  useEffect(() => {
    if (
      errors["1"].length > 0 ||
      errors["2"].length > 0 ||
      errors["3"].length > 0
    ) {
      return setValidReq(false);
    } else {
      return setValidReq(true);
    }
  }, [errors]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let { password, email, username } = values;
    let newUser = { password, email };
    newUser.user_name = username;

    setErr({
      resMsg: "",
      resStatus: 0,
    });
    try {
      // eslint-disable-next-line
      const createdUser = await AuthService.postUser(newUser);

      setErr({
        resMsg: "Sign Up Successful",
        resStatus: 200,
      });
      setValidReq(false);
      setTimeout(() => {
        if (createdUser.status === 201) {
          props.onRegistrationSuccess(email, password);
        }
      }, 600);
      // reset();
      // console.clear();
    } catch (error) {
      setErr({
        resStatus: error.response.status,
        resMsg: Object.values(error.response.data.message),
      });
      setTimeout(() => {
        setErr({
          resMsg: "",
          resStatus: 0,
        });
      }, 5000);
    }
  };

  return (
    <>
      <form
        className='atl-form register-form'
        onSubmit={handleSubmit}
        autoComplete='off'
      >
        {err.resStatus === 0 ? null : (
          <AtlNotification type={err.resStatus} msg={err.resMsg} />
        )}
        <fieldset>
          <ul>
            {errors["1"].map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <label htmlFor='username'>
            <Required met={values.username.length === 0 ? false : true} />
            Username
          </label>
          <br />
          <br />
          <input
            ref={usernameRef}
            type='text'
            name='username'
            placeholder='Steven SpielBerg'
            id={1}
            value={values.username}
            onChange={handleChange}
          />
          <br />
          <ul>
            {errors["2"].map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <label htmlFor='email'>
            <Required met={values.email.length === 0 ? false : true} />
            Email
          </label>
          <br />
          <br />
          <input
            ref={emailRef}
            type='text'
            name='email'
            placeholder='notspielberg@gmail.com'
            id={2}
            value={values.email}
            onChange={handleChange}
          />
          <br />
          <ul>
            {errors["3"].map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <label htmlFor='password'>
            <Required met={values.password.length === 0 ? false : true} />
            Password
          </label>
          <br />
          <br />
          <input
            ref={pwdRef}
            type='text'
            name='password'
            placeholder='etGoHome1234$'
            id={3}
            value={values.password}
            onChange={handleChange}
          />
        </fieldset>
        <button
          className='action-auth'
          disabled={
            !validReq ||
            usernameRef.current.value.length === 0 ||
            emailRef.current.value.length === 0 ||
            pwdRef.current.value.length === 0
          }
          type='submit'
        >
          Start Creating
        </button>
      </form>
    </>
  );
};

RegisterForm.defaultProps = {
  onRegistrationSuccess: () => {},
};

export default RegisterForm;
