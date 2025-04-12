import { AuthResponse } from 'src/@types/auth.types';
import http from 'src/utils/http';

export const URL_AUTH = {
  LOGIN: 'login',
  REGISTER: 'register',
  LOGOUT: 'logout',
  REFRESH_TOKEN: 'refresh-access-token'
};

const authApi = {
  registerAccount: (body: { email: string; password: string }) => http.post<AuthResponse>(URL_AUTH.REGISTER, body),

  login: (body: { email: string; password: string }) => http.post<AuthResponse>(URL_AUTH.LOGIN, body),

  logout: () => http.post(URL_AUTH.LOGOUT),

  refreshToken: (body: { refresh_token: string }) => http.post<AuthResponse>(URL_AUTH.REFRESH_TOKEN, body)
};

export default authApi;
