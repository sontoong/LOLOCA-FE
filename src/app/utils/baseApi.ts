import axios from "axios";
import { Envs } from "./env";

const baseURL = Envs.api;

const baseApi = axios.create({
  baseURL,
  timeout: 60000,
  // withCredentials: true,
});

export default baseApi;
