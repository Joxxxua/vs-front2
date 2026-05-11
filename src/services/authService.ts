import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, apiRequest } from '../lib/api'

interface LoginResponse {
  accessToken?: string
  access_token?: string
  refreshToken?: string
  refresh_token?: string
}

export async function login(email: string, senha: string) {
  const response = await apiRequest<LoginResponse>('/auth/signin', {
    method: 'POST',
    auth: false,
    body: {
      email,
      senha,
      password: senha,
    },
  })

  const accessToken = response.accessToken ?? response.access_token
  const refreshToken = response.refreshToken ?? response.refresh_token

  if (!accessToken || !refreshToken) {
    throw new Error('Resposta inválida da API de autenticação.')
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  localStorage.setItem('clinic_admin_session_email', email)
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem('clinic_admin_session_email')
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(ACCESS_TOKEN_KEY))
}
