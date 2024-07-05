import axios from "axios";
import Cookies from 'js-cookie';

const baseUrl = 'http://127.0.0.1:8000/';
const token = Cookies.get('accessToken');

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  // timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
});

// Request interceptor to log headers
AxiosInstance.interceptors.request.use(config => {
  console.log('Request headers:', config.headers);
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
