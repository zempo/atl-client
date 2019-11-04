import Config from "../../config";
import jwtDecode from "jwt-decode";

let _timeoutId;
const _TEN_SECONDS_IN_MS = 10000;

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(Config.TOKEN_KEY, token);
    window.location.reload();
  },
  getAuthToken() {
    return window.localStorage.getItem(Config.TOKEN_KEY);
  },
  clearAuthToken() {
    window.localStorage.removeItem(Config.TOKEN_KEY);
    window.location.reload();
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  makeBasicAuthToken(email, password) {
    return window.btoa(`${email}:${password}`);
  },
  parseJwt(jwt) {
    if (jwt) {
      return jwtDecode(jwt);
    }
  },
  readJwtToken() {
    return TokenService.parseJwt(TokenService.getAuthToken());
  },
  getId() {
    if (TokenService.hasAuthToken()) {
      const currentUser = TokenService.readJwtToken().user_id;

      return currentUser;
    }
  },
  _getMsUntilExpiry(payload) {
    return payload.exp * 1000 - Date.now();
  },
  queueCallbackBeforeExpiry(callback) {
    const msUntilExpiry = TokenService._getMsUntilExpiry(TokenService.readJwtToken());
    _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS);
  },
  clearCallbackBeforeExpiry() {
    clearTimeout(_timeoutId);
  }
};

export default TokenService;
