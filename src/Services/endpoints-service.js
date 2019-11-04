import Config from "../config";
import axios from "axios";
import TokenService from "./Auth/token-service";

// AUTHENTICATION
export const register = axios.create({
  baseURL: `${Config.API_ENDPOINT}/users`,
  method: "POST",
  headers: {
    "content-type": "application/json"
  }
});

export const login = axios.create({
  baseURL: `${Config.API_ENDPOINT}/auth/login`,
  method: "POST",
  headers: {
    "content-type": "application/json"
  }
});

export const refresh = axios.create({
  baseURL: `${Config.API_ENDPOINT}/auth/refresh`,
  method: "POST",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`
  }
});

// USERS
export const readUser = axios.create({
  baseURL: `${Config.API_ENDPOINT}/users/${TokenService.getId()}`,
  method: "GET",
  headers: {
    authorization: `Bearer ${TokenService.getAuthToken()}`
  }
});
