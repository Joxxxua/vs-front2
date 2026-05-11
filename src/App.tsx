import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import AgendamentosPage from './pages/AgendamentosPage'
import LoginPage from './pages/LoginPage'
import PerfilPage from './pages/PerfilPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import { AuthProvider, useAuth } from './contexts/AuthContext'

function ProtectedRoute() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <DashboardLayout />
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/privacidade" element={<PrivacyPolicyPage />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<AgendamentosPage />} />
          <Route path="perfil" element={<PerfilPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
