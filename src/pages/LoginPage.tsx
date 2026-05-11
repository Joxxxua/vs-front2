import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
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
        <div className="login-panel-intro">
          <p className="login-badge">Painel Vida Saudável</p>
          <h1>Seu centro clínico em um painel inteligente</h1>
          <p className="login-panel-lead">
            Controle agendamentos, acompanhe status e mantenha a operação da clínica fluindo em
            tempo real.
          </p>
        </div>

        <div className="login-panel-aside">
          <form className="login-panel-form" onSubmit={handleSubmit} aria-labelledby="login-heading">
            <h2 id="login-heading">Acessar conta</h2>
            <p className="login-panel-form-lead">Use suas credenciais administrativas para entrar.</p>

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
            <input
              id="senha"
              type={mostrarSenha ? 'text' : 'password'}
              autoComplete="current-password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="••••••••"
            />

            <label className="login-checkbox">
              <input
                type="checkbox"
                checked={mostrarSenha}
                onChange={(event) => setMostrarSenha(event.target.checked)}
              />
              Mostrar senha
            </label>

            {error ? (
              <p role="alert" aria-live="polite" className="login-error">
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
        </div>
      </section>
    </div>
  )
}
