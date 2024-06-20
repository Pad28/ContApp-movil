import axios from "axios";
import { envs } from "../config";

export const API = axios.create({
    baseURL: envs.API_URL,
})