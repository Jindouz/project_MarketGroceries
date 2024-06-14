import axios from 'axios';
import { BASE_URL } from '../../features/prods/prodsAPI';

interface Credentials {
  username: string;
  password: string;
}

interface RegistrationData {
  username: string;
  email: string;
  password: string;
}

interface RefreshTokenResponse {
  access: string;
}

interface PasswordResetResponse {
  // Define the structure of the response data
}

export const login = async (credentials: Credentials): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.detail || 'Login failed');
  }
};

export const register = async (credentials: RegistrationData): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.detail || 'Registration failed');
  }
}

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post(`${BASE_URL}/refresh-token`, { refreshToken });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.detail || 'Error refreshing token');
  }
};

export const passReset = async (email: string): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/password-reset/`, { email });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.detail || 'Error resetting password');
  }
}

export const passResetConfirm = async (uid: string, token: string, new_password: string): Promise<any> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/password-reset/confirm/${uid}/${token}/`, { uid, token, new_password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.detail || 'Error resetting password');
  }
}
