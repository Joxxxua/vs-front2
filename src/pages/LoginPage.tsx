import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { EyeIcon, EyeOffIcon } from '../components/icons'
import './LoginPage.css'

function mapFetchError(message: string) {
  return message === 'Failed to fetch'
    ? 'Não foi possível conectar com a API. Verifique se o backend está ativo.'
    : message
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!email.trim() || !senha.trim()) {
      setError('Preencha e-mail e senha para continuar.')
      return
    }

    setIsLoading(true)
    try {
      await login(email, senha)
      navigate('/')
    } catch (err) {
      const message =
        err instanceof Error ? mapFetchError(err.message) : 'Falha ao autenticar. Tente novamente.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <section className="login-panel" aria-label="Painel Vida Saudável — acesso">
        <div className="login-mark" aria-hidden="true" />
        <p className="login-badge">Painel Vida Saudável</p>
        <h1 id="login-heading">Acessar conta</h1>
        <p className="login-panel-lead">
          Use suas credenciais administrativas para controlar agendamentos e acompanhar a
          operação da clínica em tempo real.
        </p>

        <form className="login-panel-form" onSubmit={handleSubmit} aria-labelledby="login-heading">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@clinica.com.br"
          />

          <label htmlFor="senha">Senha</label>
          <div className="login-password-field">
            <input
              id="senha"
              type={mostrarSenha ? 'text' : 'password'}
              autoComplete="current-password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="login-password-toggle"
              onClick={() => setMostrarSenha((current) => !current)}
              aria-pressed={mostrarSenha}
              aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {mostrarSenha ? <EyeOffIcon /> : <EyeIcon />}
              <span>{mostrarSenha ? 'Ocultar' : 'Mostrar'} senha</span>
            </button>
          </div>

          {error ? (
            <p role="alert" aria-live="assertive" className="login-error">
              {error}
            </p>
          ) : null}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar no painel'}
          </button>
        </form>

        <Link to="/privacidade" className="login-panel-privacy">
          Política de Privacidade
        </Link>
      </section>
    </div>
  )
}
