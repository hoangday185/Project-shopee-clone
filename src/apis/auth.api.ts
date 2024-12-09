import { AuthResponse } from 'src/@types/auth.types'
import http from 'src/utils/http'

const authApi = {
  registerAccount: (body: { email: string; password: string }) => http.post<AuthResponse>('register', body),

  login: (body: { email: string; password: string }) => http.post<AuthResponse>('login', body),

  logout: () => http.post('logout')
}

export default authApi
