import axios from "axios";
import Cookies from 'js-cookie';

const baseUrl = 'http://127.0.0.1:8000/';
const token = Cookies.get('accessToken');

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  // timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
});


AxiosInstance.interceptors.request.use(config => {
  const token = Cookies.get('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
});


AxiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      Cookies.remove('accessToken');
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);


export default AxiosInstance;
