import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://api2.boltabacus.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default customAxios;
