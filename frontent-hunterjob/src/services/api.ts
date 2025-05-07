// src/services/api.ts
import axios from 'axios';
import { backend_url } from '@config/config';

export const api = axios.create({
  baseURL: backend_url,
  headers: {
    'Content-Type': 'application/json',
  },
});
