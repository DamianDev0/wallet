import axios from 'axios';
import { useAuthStore } from '@core/shared/store/auth.store';

const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api'
  : 'https://api.yourapp.com';

const apiUrl = axios.create({
  baseURL: API_BASE_URL,
  timeout: 18000,
});

apiUrl.interceptors.request.use(
  async (config) => {

    const token = useAuthStore.getState().getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiUrl.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default apiUrl;
