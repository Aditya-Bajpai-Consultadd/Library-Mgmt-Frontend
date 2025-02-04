import axios from "axios";
const URL = import.meta.env.VITE_API_BASE_URL;

const apiCall = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
apiCall.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default apiCall;
