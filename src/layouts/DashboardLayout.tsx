import { useMemo, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { CalendarIcon, UserIcon } from '../components/icons'
import './DashboardLayout.css'

const NAV_ITEMS = [
  { to: '/', label: 'Agendamentos', Icon: CalendarIcon },
  { to: '/perfil', label: 'Perfil', Icon: UserIcon },
]

function getInitials(email: string) {
  const [name] = email.split('@')
  const parts = name.split(/[.\-_]/g).filter(Boolean)
  if (parts.length === 0) return 'CL'
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export default function DashboardLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { email, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const initials = useMemo(() => getInitials(email), [email])

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div className="dashboard-branding">
          <div className="dashboard-logo" aria-hidden="true" />
          <div>
            <p className="dashboard-title">Painel Clínica</p>
            <p className="dashboard-subtitle">Vida Saudável</p>
          </div>
        </div>

        <nav className="dashboard-nav" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={pathname === item.to ? 'dashboard-nav-link is-active' : 'dashboard-nav-link'}
              aria-current={pathname === item.to ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

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
              <p className="dashboard-account-email">
                <UserIcon width={14} height={14} />
                {email || 'Usuário logado'}
              </p>
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

      <nav className="dashboard-bottom-nav" aria-label="Navegação principal">
        {NAV_ITEMS.map(({ to, label, Icon }) => {
          const isActive = pathname === to
          return (
            <Link
              key={to}
              to={to}
              className={isActive ? 'dashboard-bottom-nav-link is-active' : 'dashboard-bottom-nav-link'}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon width={22} height={22} />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
