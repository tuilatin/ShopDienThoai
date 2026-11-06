import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const jwtToken = sessionStorage.getItem("jwtToken")?.trim();

  console.log("JWT Token:", jwtToken);
  console.log("Request URL:", config.url);

  if (jwtToken) {
    config.headers.set("Authorization", `Bearer ${jwtToken}`);
  }

  console.log("Authorization:", config.headers.get("Authorization"));

  return config;
});

export default apiClient;
