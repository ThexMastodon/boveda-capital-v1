import axios from 'axios';

/**
 * Cliente de Axios centralizado para la Bóveda Capital.
 * Configura la base URL y gestiona los tokens de seguridad.
 */
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },

  // Usamos Bearer token; evitar credenciales cross-site previene bloqueo CORS del navegador.
  withCredentials: false,
});

/**
 * Interceptor de Peticiones:
 * Antes de enviar cualquier petición, verificamos si hay un token en el almacenamiento.
 */
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * Interceptor de Respuestas:
 * Maneja errores globales como el 401 (No Autorizado) para redirigir al login.
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      //Limpiar datos de sesión si el token expira o es inválido
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.location.href = '/'; //Redirigir al login real
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;