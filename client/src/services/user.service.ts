import axios from "axios";
import authHeader from "./auth-header";

const production = 'https://react-todo-list-js.herokuapp.com/api/auth/';
const development = 'http://localhost:8080/api/auth/';
const API_URL = process.env.NODE_ENV === "production"  ? production : development;

export const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

export const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

export const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

export const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
