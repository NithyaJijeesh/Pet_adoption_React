import axios from "axios";
import Cookies from 'js-cookie';

const baseUrl = 'http://127.0.0.1:8000/';
const token = Cookies.get('accessToken');

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
});


export default AxiosInstance;
