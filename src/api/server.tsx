import axios from "axios";
import { envs } from "../config/envs";

export const API = axios.create({
    baseURL: envs.API_URL,
})