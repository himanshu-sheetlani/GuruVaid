import axios from "axios";

// Backend API URL
const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000/api/v1"
    : import.meta.env.VITE_BACKEND_URL;

// Axios instance for api's call
export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const axiosPredict = axios.create({
  baseURL:"http://127.0.0.1:5000",
})
