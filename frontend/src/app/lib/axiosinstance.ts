import axios, { AxiosInstance } from "axios";

// http://localhost:5000/api   https://foodzy-backend-production.up.railway.app
export const axiosInstance:AxiosInstance =axios.create({
    baseURL:' https://foodzy-backend-production.up.railway.app/api',
    timeout:10000,
    headers: {
    'Content-Type': 'application/json',
  },
})