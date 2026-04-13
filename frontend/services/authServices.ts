import axios from 'axios';
import { loginCredentials, AuthResponse } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8010/api';

/**
 * Servicio encargado de la comunicación con el backend.
 * Separa la lógica de peticiones de la UI.
 */

export const authService = {
  login: async (credentials: loginCredentials): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}/login`, credentials);
    return response.data;
  },

  logout: async (token: string): Promise<void> => {
    await axios.post(`${API_URL}/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}