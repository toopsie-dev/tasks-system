import axios from "axios";

interface WindowEnv {
    env: {
        API_BASE_URL: string;
    };
}

const API_BASE_URL = (window as unknown as WindowEnv).env.API_BASE_URL;

const apiService = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

apiService.interceptors.request.use(
    (config) => {
        const token = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");

        if (token) {
            config.headers["X-CSRF-TOKEN"] = token;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default apiService;
