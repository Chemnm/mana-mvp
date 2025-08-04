import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080'
  : 'https://cmmy6gvppm.eu-central-1.awsapprunner.com/';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // You can add other default headers here, like Authorization tokens
  },
});

// You can also add interceptors for handling requests and responses globally
// For example, to automatically add an auth token to every request:
axiosInstance.interceptors.request.use((config) => { 
  // const token = localStorage.getItem('token'); // or get it from your state manager
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`; 
  // }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
