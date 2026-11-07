import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const jwtToken = sessionStorage.getItem("jwtToken")?.trim();

  if (jwtToken) {
    config.headers.set("Authorization", `Bearer ${jwtToken}`);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url ?? "";
    const isAuthenticationRequest = requestUrl.includes("/auth/dangnhap");

    if (
      error.response?.status === 401 &&
      sessionStorage.getItem("jwtToken") &&
      !isAuthenticationRequest
    ) {
      sessionStorage.removeItem("jwtToken");
      sessionStorage.removeItem("vaiTro");
      window.dispatchEvent(new Event("authChanged"));
    }

    return Promise.reject(error);
  },
);

export default apiClient;
