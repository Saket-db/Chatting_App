import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://localhost:5002/api",
    withCredentials: true,
});