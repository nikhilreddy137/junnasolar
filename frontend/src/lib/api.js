import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API, timeout: 15000 });

export const submitLead = (data) => api.post("/leads", data).then((r) => r.data);
export const getEstimate = (data) => api.post("/estimate", data).then((r) => r.data);
