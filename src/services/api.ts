import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.29.64:3333'
});