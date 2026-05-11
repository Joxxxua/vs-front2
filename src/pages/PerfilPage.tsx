import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './PerfilPage.css'

function getInitials(email: string) {
  const [name] = email.split('@')
  const letters = name.replace(/[^a-zA-Z]/g, '').slice(0, 2)
  return letters ? letters.toUpperCase() : 'CL'
}

export default function PerfilPage() {
  const { email } = useAuth()
  const initials = getInitials(email)
  const nome = email ? email.split('@')[0].replace(/[.\-_]/g, ' ') : 'Administrador'

  return (
    <section className="perfil-page">
      <div className="perfil-card">
        <span className="perfil-avatar">{initials}</span>
        <p className="perfil-label">Perfil da sessão</p>
        <h1>{nome}</h1>
        <p>{email || 'Sem e-mail disponível'}</p>
        <Link to="/">Voltar para agendamentos</Link>
      </div>
    </section>
  )
}
