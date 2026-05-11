import { useMemo, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './DashboardLayout.css'

function getInitials(email: string) {
  const [name] = email.split('@')
  const parts = name.split(/[.\-_]/g).filter(Boolean)
  if (parts.length === 0) return 'CL'
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function getSectionLabel(pathname: string) {
  if (pathname === '/perfil') return 'Painel • Perfil'
  return 'Painel • Agendamentos'
}

export default function DashboardLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { email, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const initials = useMemo(() => getInitials(email), [email])
  const sectionLabel = useMemo(() => getSectionLabel(pathname), [pathname])

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div className="dashboard-branding">
          <div className="dashboard-logo" aria-hidden="true">
            <span />
          </div>
          <div>
            <p className="dashboard-title">Painel Clínica</p>
            <p className="dashboard-subtitle">Agendamentos</p>
          </div>
        </div>

        <p className="dashboard-section-indicator">{sectionLabel}</p>

        <div className="dashboard-account">
          <button
            type="button"
            className="dashboard-avatar-button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            aria-label="Abrir menu da conta"
          >
            <span className="dashboard-avatar">{initials}</span>
          </button>

          {isMenuOpen ? (
            <div className="dashboard-account-menu" role="menu">
              <p className="dashboard-account-email">{email || 'Usuário logado'}</p>
              <Link to="/perfil" onClick={() => setIsMenuOpen(false)} role="menuitem">
                Meu perfil
              </Link>
              <button type="button" onClick={handleLogout} role="menuitem">
                Sair
              </button>
            </div>
          ) : null}
        </div>
      </header>

      <main className="dashboard-main-content">
        <Outlet />
      </main>
    </div>
  )
}
