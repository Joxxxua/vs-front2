import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  isAuthenticated as checkAuth,
  login as loginService,
  logout as logoutService,
} from '../services/authService'

interface AuthContextValue {
  isAuthenticated: boolean
  email: string
  login: (email: string, senha: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkAuth())
  const [email, setEmail] = useState<string>(
    localStorage.getItem('clinic_admin_session_email') ?? '',
  )

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      email,
      async login(userEmail: string, senha: string) {
        await loginService(userEmail, senha)
        setEmail(userEmail)
        setIsAuthenticated(true)
      },
      logout() {
        logoutService()
        setEmail('')
        setIsAuthenticated(false)
      },
    }),
    [email, isAuthenticated],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.')
  }

  return context
}
