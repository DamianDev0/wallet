import axios from 'axios';
import { useAuthStore } from '@core/shared/store/auth.store';
import { Config } from './env.config';

const apiUrl = axios.create({
  baseURL: Config.api.url,
  timeout: Config.api.timeout,
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
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default apiUrl;
