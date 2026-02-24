import axios from 'axios';

// Ensure this matches your BACKEND production URL
const API = axios.create({ 
  baseURL: 'https://my-submarine.vercel.app/api/v1' 
});

// This automatically attaches your JWT token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;