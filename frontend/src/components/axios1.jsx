import axios from "axios";
import Cookies from 'js-cookie';

const baseUrl = 'http://127.0.0.1:8000/';

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Request interceptor to add token
AxiosInstance.interceptors.request.use(config => {
  const token = Cookies.get('accessToken'); // Retrieve token from cookies
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor to handle token refresh
AxiosInstance.interceptors.response.use(response => {
  return response;
}, async error => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const refreshToken = Cookies.get('refreshToken'); // Retrieve refresh token
      const response = await axios.post(`${baseUrl}api/token/refresh/`, { refresh: refreshToken });
      const newAccessToken = response.data.access;
      Cookies.set('accessToken', newAccessToken); // Update access token in cookies
      AxiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return AxiosInstance(originalRequest); // Retry original request
    } catch (err) {
      // Handle refresh token errors (e.g., redirect to login)
      console.error('Refresh token failed', err);
      return Promise.reject(err);
    }
  }
  return Promise.reject(error);
});

export default AxiosInstance;
