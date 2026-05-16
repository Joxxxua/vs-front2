const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions {
  method?: HttpMethod
  body?: unknown
  auth?: boolean
  signal?: AbortSignal
  headers?: Record<string, string>
}

const ACCESS_TOKEN_KEY = 'clinic_admin_access_token'
const REFRESH_TOKEN_KEY = 'clinic_admin_refresh_token'

let refreshPromise: Promise<string | null> | null = null

function getStoredTokens() {
  return {
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  }
}

function updateStoredTokens(accessToken?: string, refreshToken?: string) {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  }

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  }
}

function clearSession() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem('clinic_admin_session_email')
}

async function refreshAccessToken(): Promise<string | null> {
  const { refreshToken } = getStoredTokens()

  if (!refreshToken) {
    return null
  }

  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
          body: JSON.stringify({ refreshToken }),
        })

        if (!response.ok) {
          return null
        }

        const payload = await response.json()
        const newAccessToken =
          payload?.accessToken ?? payload?.access_token ?? payload?.token
        const newRefreshToken =
          payload?.refreshToken ?? payload?.refresh_token ?? refreshToken

        if (!newAccessToken) {
          return null
        }

        updateStoredTokens(newAccessToken, newRefreshToken)
        return newAccessToken as string
      } catch {
        return null
      } finally {
        refreshPromise = null
      }
    })()
  }

  return refreshPromise
}

function buildQueryParams(query?: Record<string, string | undefined>) {
  if (!query) {
    return ''
  }

  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      params.append(key, value)
    }
  })

  const paramString = params.toString()
  return paramString ? `?${paramString}` : ''
}

async function parseApiError(response: Response) {
  try {
    const payload = await response.json()
    const code = payload?.code ?? payload?.errorCode
    const message = payload?.message ?? payload?.error ?? 'Erro inesperado na API.'

    return { code, message }
  } catch {
    return { message: 'Não foi possível processar a resposta da API.' }
  }
}

export class ApiError extends Error {
  code?: string
  status: number

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
  retryWithFreshToken = true,
): Promise<T> {
  const { accessToken } = getStoredTokens()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (options.auth !== false && accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
  })

  if (response.status === 401 && options.auth !== false && retryWithFreshToken) {
    const refreshedToken = await refreshAccessToken()

    if (refreshedToken) {
      return apiRequest<T>(endpoint, options, false)
    }

    clearSession()
    window.location.assign('/login')
    throw new ApiError('Sessão expirada. Faça login novamente.', 401, 'SESSION_EXPIRED')
  }

  if (!response.ok) {
    const apiError = await parseApiError(response)
    throw new ApiError(apiError.message, response.status, apiError.code)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export { API_BASE_URL, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, buildQueryParams }
