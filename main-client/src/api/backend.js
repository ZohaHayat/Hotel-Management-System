import axios from "axios";
import { getToken } from "../utilities/localStorage";

const instance = axios.create({
  baseURL: "/api",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

export const signup = (name, email, password) =>
  instance.post("/signup", { name, email, password });

export const login = (email, password) =>
  instance.post("/login", { email, password });

export const authenticate = () => instance.get("/authenticate");

export default instance;
