export const validateUsername = (username) => {
  // eslint-disable-next-line
  const REGEX_USERNAME = /(^[A-Za-z0-9\-\_]+$)/;
  let ERRORS = [];

  if (!REGEX_USERNAME.test(username) && username.length < 3) {
    ERRORS.push(`One word. Please use letters, numbers, underscores, or hyphens.`);
    ERRORS.push(`Please use 3+ characters`);
  } else if (!REGEX_USERNAME.test(username) && username.length > 20) {
    ERRORS.push(`One word. Please use letters, numbers, underscores, or hyphens.`);
    ERRORS.push(`Please use less than 72 characters`);
  } else if (!REGEX_USERNAME.test(username)) {
    ERRORS.push(`One word. Please use letters, numbers, underscores, or hyphens.`);
  } else if (username.length < 3) {
    ERRORS.push(`Please use at least 3+ characters`);
  } else if (username.length > 72) {
    ERRORS.push(`Please use less than 72 characters`);
  } else {
    ERRORS = [];
  }

  return ERRORS;
};

export const validatePwd = (pwd) => {
  // eslint-disable-next-line
  const REGEX_PWD = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
  let ERRORS = [];
  if (!REGEX_PWD.test(pwd) && pwd.length < 8 && (pwd.startsWith(" ") || pwd.endsWith(" "))) {
    ERRORS.push(`Please use at least 8 characters.`);
    ERRORS.push(`Please include 1 upper case letter, number and special character.`);
    ERRORS.push(`Avoid extra spaces`);
  } else if (!REGEX_PWD.test(pwd) && pwd.length > 72 && (pwd.startsWith(" ") || pwd.endsWith(" "))) {
    ERRORS.push(`Please use less than 72 characters.`);
    ERRORS.push(`Please include 1 upper case letter, number and special character.`);
    ERRORS.push(`Avoid extra spaces`);
  } else if (!REGEX_PWD.test(pwd) && pwd.length < 8) {
    ERRORS.push(`Please use at least 8 characters.`);
    ERRORS.push(`Please include 1 upper case letter, number and special character.`);
  } else if (!REGEX_PWD.test(pwd) && pwd.length > 72) {
    ERRORS.push(`Please use less than 72 characters.`);
    ERRORS.push(`Please include 1 upper case letter, number and special character.`);
  } else if (!REGEX_PWD.test(pwd) && (pwd.startsWith(" ") || pwd.endsWith(" "))) {
    ERRORS.push(`Please include 1 upper case letter, number and special character.`);
    ERRORS.push(`Avoid extra spaces`);
  } else if (!REGEX_PWD.test(pwd)) {
    ERRORS.push(`Please include 1 upper case letter, number and special character.`);
  } else if (pwd.length < 8) {
    ERRORS.push(`Please use at least 8 characters.`);
  } else if (pwd.length > 72) {
    ERRORS.push(`Please use less than 72 characters.`);
  } else if (pwd.startsWith(" ") || pwd.endsWith(" ")) {
    ERRORS.push(`Avoid extra spaces`);
  } else {
    ERRORS = [];
  }
  return ERRORS;
};

export const validateEmail = (email) => {
  // eslint-disable-next-line
  let REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let ERRORS = [];

  if (!REGEX_EMAIL.test(email)) {
    ERRORS.push(`Please use a valid email`);
  } else {
    ERRORS = [];
  }
  return ERRORS;
};

export const validateLogin = (input) => {
  let ERRORS = [];
  if (input.length === 0) {
    ERRORS.push("Please log in");
  }
  return ERRORS;
};

export const validationSpacer = (input) => {
  let ERRORS = [];
  return ERRORS;
};
