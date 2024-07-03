import axios from "axios";
import { Envs } from "./env";

const baseURL = Envs.apiLocal;

const baseApi = axios.create({
  baseURL,
  timeout: 10000,
  maxRedirects: 0,
  // withCredentials: true,
});

export default baseApi;
