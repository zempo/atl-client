// import Config from "../config";
import TokenService from "./token-service";
import IdleService from "./idle-service";
import { login, register, refresh } from "../endpoints-service";

export const AuthService = {
  postUser(user) {
    return register.post("/", user);
  },
  postLogin(creds) {
    return login
      .post("/", JSON.stringify(creds))
      .then((res) => {
        if (res.status !== 200) {
          return res.data.then((e) => Promise.reject(e));
        }
        return res.data;
      })
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        IdleService.regiserIdleTimerResets();
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthService.postRefreshToken();
        });
        return res;
      });
  },
  postRefreshToken() {
    return refresh
      .post("/")
      .then((res) => {
        // console.log(res);
        if (!res.statusText) {
          res.data.then((e) => Promise.reject(e));
        }
        TokenService.saveAuthToken(res.data.authToken);
        TokenService.queueCallbackBeforeExpiry(() => {
          AuthService.postRefreshToken2();
        });
        return res.data;
      })
      .catch((err) => {
        // clear the local storage if the refresh doesn't work!
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
        console.log("Your session has expired. Please log back in.", err);
        console.error(err);
      });
  }
};
