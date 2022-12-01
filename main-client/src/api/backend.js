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

export const home = (email, password) =>
  instance.get("/HomePage", { email, password });

export const hire = (email, password) =>
  instance.get("/HireStaff", { email, password });

export const fire = (email) =>
  instance.post("/fire", { email });

export const ViewInv = (email, password) =>
  instance.get("/ViewInv", { email, password });

export const updateinv = (email, password) =>
  instance.get("/UpdateInv", { email, password });

export const staffpage = (email, password) =>
  instance.get("/StaffPage", { email, password });

export const book = (email, password) =>
  instance.get("/MakeBooking", { email, password });

export const cancelbook = (email, password) =>
  instance.get("/CancelBooking", { email, password });

export const editprofile = (email, password) =>
  instance.get("/EditProfile", { email, password });

export const authenticate = () => instance.get("/authenticate");

export default instance;
