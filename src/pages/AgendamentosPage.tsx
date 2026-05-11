import { useEffect, useMemo, useState } from 'react'
import {
  cancelarAgendamento,
  confirmarAgendamento,
  listarAgendamentos,
  realizarAgendamento,
} from '../services/agendamentosService'
import type { Agendamento, StatusAgendamento } from '../types/agendamento'
import { ApiError } from '../lib/api'
import { getMedicoNome, getPacienteNome } from '../lib/agendamentoLabels'
import './AgendamentosPage.css'

type ModoVisualizacao = 'LISTA' | 'SEMANAL'
type AcaoAgendamento = 'confirmar' | 'cancelar' | 'realizar'

const STATUS_OPTIONS: Array<{ label: string; value: StatusAgendamento | '' }> = [
  { label: 'Todos', value: '' },
  { label: 'Agendado', value: 'AGENDADO' },
  { label: 'Confirmado', value: 'CONFIRMADO' },
  { label: 'Cancelado', value: 'CANCELADO' },
  { label: 'Realizado', value: 'REALIZADO' },
]

const STATUS_LABELS: Record<StatusAgendamento, string> = {
  AGENDADO: 'Agendado',
  CONFIRMADO: 'Confirmado',
  CANCELADO: 'Cancelado',
  REALIZADO: 'Realizado',
}

const STATUS_CLASSNAMES: Record<StatusAgendamento, string> = {
  AGENDADO: 'status-agendado',
  CONFIRMADO: 'status-confirmado',
  CANCELADO: 'status-cancelado',
  REALIZADO: 'status-realizado',
}

const HOURS = Array.from({ length: 15 }, (_, index) => index + 7)

function parseDateInLocal(dateISO: string) {
  return new Date(dateISO)
}

function getStartOfDay(date: Date) {
  const output = new Date(date)
  output.setHours(0, 0, 0, 0)
  return output
}

function getEndOfDay(date: Date) {
  const output = new Date(date)
  output.setHours(23, 59, 59, 999)
  return output
}

function formatCompleteDate(dateISO: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(parseDateInLocal(dateISO))
}

function formatHeroDate(dateISO: string) {
  const date = parseDateInLocal(dateISO)
  return {
    dia: new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
    }).format(date),
    horario: new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(
      date,
    ),
  }
}

function getEspecialidade(agendamento: Agendamento) {
  return agendamento.medico?.especialidade ?? 'Geral'
}

function getTipoNome(agendamento: Agendamento) {
  return agendamento.tipo?.nome ?? agendamento.tipo?.name ?? 'Consulta'
}

function getApiErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.code === 'ALREADY_CONFIRMED') {
      return 'Este agendamento já está confirmado.'
    }
    if (error.code === 'INVALID_STATUS') {
      return 'Não foi possível concluir a ação para o status atual.'
    }
    if (error.code === 'NOT_FOUND') {
      return 'Agendamento não encontrado.'
    }
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Não foi possível processar sua solicitação.'
}

function canConfirm(agendamento: Agendamento) {
  return agendamento.status === 'AGENDADO'
}

function canCancel(agendamento: Agendamento) {
  return agendamento.status === 'AGENDADO' || agendamento.status === 'CONFIRMADO'
}

function canComplete(agendamento: Agendamento) {
  if (agendamento.status !== 'CONFIRMADO') {
    return false
  }

  return parseDateInLocal(agendamento.data).getTime() <= Date.now()
}

function getCurrentWeekStart(baseDate: Date) {
  const date = new Date(baseDate)
  const weekday = date.getDay()
  const distanceToMonday = weekday === 0 ? -6 : 1 - weekday
  date.setDate(date.getDate() + distanceToMonday)
  return getStartOfDay(date)
}

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [feedbackError, setFeedbackError] = useState('')
  const [feedbackSuccess, setFeedbackSuccess] = useState('')
  const [viewMode, setViewMode] = useState<ModoVisualizacao>('SEMANAL')
  const [especialidadeChip, setEspecialidadeChip] = useState('Todos')
  const [statusFiltro, setStatusFiltro] = useState<StatusAgendamento | ''>('')
  const [dataInicial, setDataInicial] = useState('')
  const [dataFinal, setDataFinal] = useState('')
  const [loadingAcoes, setLoadingAcoes] = useState<Record<string, AcaoAgendamento | null>>({})
  const [semanaAtual, setSemanaAtual] = useState<Date>(() => getCurrentWeekStart(new Date()))
  const [selectedAgendamento, setSelectedAgendamento] = useState<Agendamento | null>(null)

  async function carregarAgendamentos() {
    setIsLoading(true)
    setFeedbackError('')
    try {
      const payload = await listarAgendamentos({
        status: statusFiltro || undefined,
        especialidade: especialidadeChip !== 'Todos' ? especialidadeChip : undefined,
      })
      setAgendamentos(payload)
    } catch (error) {
      setFeedbackError(getApiErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    carregarAgendamentos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const especialidadesDisponiveis = useMemo(() => {
    const unique = new Set<string>()
    agendamentos.forEach((agendamento) => unique.add(getEspecialidade(agendamento)))
    return ['Todos', ...Array.from(unique).sort((a, b) => a.localeCompare(b, 'pt-BR'))]
  }, [agendamentos])

  const agendamentosFiltrados = useMemo(() => {
    const now = new Date()
    const startToday = getStartOfDay(now)

    return agendamentos
      .filter((agendamento) => {
        if (especialidadeChip !== 'Todos' && getEspecialidade(agendamento) !== especialidadeChip) {
          return false
        }
        return true
      })
      .filter((agendamento) => {
        const date = parseDateInLocal(agendamento.data)
        if (!dataInicial && !dataFinal) {
          return date >= startToday
        }

        if (dataInicial) {
          const start = getStartOfDay(new Date(`${dataInicial}T00:00:00`))
          if (date < start) return false
        }

        if (dataFinal) {
          const end = getEndOfDay(new Date(`${dataFinal}T00:00:00`))
          if (date > end) return false
        }

        return true
      })
      .sort((a, b) => parseDateInLocal(a.data).getTime() - parseDateInLocal(b.data).getTime())
  }, [agendamentos, dataFinal, dataInicial, especialidadeChip])

  const proximoAgendamento = useMemo(() => {
    return agendamentosFiltrados.find(
      (agendamento) => parseDateInLocal(agendamento.data).getTime() >= Date.now(),
    )
  }, [agendamentosFiltrados])

  const diasSemana = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(semanaAtual)
      date.setDate(semanaAtual.getDate() + index)
      return date
    })
  }, [semanaAtual])

  const agendamentosSemana = useMemo(() => {
    const weekStart = getStartOfDay(semanaAtual)
    const weekEnd = new Date(semanaAtual)
    weekEnd.setDate(semanaAtual.getDate() + 6)
    const endOfWeek = getEndOfDay(weekEnd)

    return agendamentosFiltrados.filter((agendamento) => {
      const date = parseDateInLocal(agendamento.data)
      return date >= weekStart && date <= endOfWeek
    })
  }, [agendamentosFiltrados, semanaAtual])

  async function handleAcao(agendamento: Agendamento, acao: AcaoAgendamento) {
    setLoadingAcoes((current) => ({ ...current, [agendamento.id]: acao }))
    setFeedbackError('')
    setFeedbackSuccess('')
    try {
      if (acao === 'confirmar') {
        await confirmarAgendamento(agendamento.id)
      }
      if (acao === 'cancelar') {
        await cancelarAgendamento(agendamento.id)
      }
      if (acao === 'realizar') {
        await realizarAgendamento(agendamento.id)
      }

      setFeedbackSuccess(`Agendamento atualizado com sucesso (${acao}).`)
      await carregarAgendamentos()
    } catch (error) {
      setFeedbackError(getApiErrorMessage(error))
    } finally {
      setLoadingAcoes((current) => ({ ...current, [agendamento.id]: null }))
    }
  }

  function handleBuscar() {
    carregarAgendamentos()
  }

  function handleLimpar() {
    setStatusFiltro('')
    setEspecialidadeChip('Todos')
    setDataInicial('')
    setDataFinal('')
    carregarAgendamentos()
  }

  const weekLabel = `${new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
  }).format(diasSemana[0])} — ${new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
  }).format(diasSemana[6])}`

  return (
    <section className="agendamento-page">
      <section className="agendamento-controls">
        <div className="chip-group" role="tablist" aria-label="Filtrar por especialidade">
          {especialidadesDisponiveis.map((especialidade) => (
            <button
              key={especialidade}
              type="button"
              className={especialidadeChip === especialidade ? 'chip chip-active' : 'chip'}
              onClick={() => setEspecialidadeChip(especialidade)}
            >
              {especialidade}
            </button>
          ))}
        </div>

        <div className="view-toggle" role="tablist" aria-label="Alternador de visualização">
          <button
            type="button"
            className={viewMode === 'LISTA' ? 'view-active' : ''}
            onClick={() => setViewMode('LISTA')}
          >
            Lista
          </button>
          <button
            type="button"
            className={viewMode === 'SEMANAL' ? 'view-active' : ''}
            onClick={() => setViewMode('SEMANAL')}
          >
            Agenda Semanal
          </button>
        </div>

        <div className="filter-panel">
          <label>
            Status
            <select
              value={statusFiltro}
              onChange={(event) => setStatusFiltro(event.target.value as StatusAgendamento | '')}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Data inicial
            <input
              type="date"
              value={dataInicial}
              onChange={(event) => setDataInicial(event.target.value)}
            />
          </label>

          <label>
            Data final
            <input type="date" value={dataFinal} onChange={(event) => setDataFinal(event.target.value)} />
          </label>

          <button type="button" onClick={handleBuscar}>
            Buscar
          </button>
          <button type="button" className="ghost-action" onClick={handleLimpar}>
            Limpar
          </button>
        </div>
      </section>

      {feedbackSuccess ? (
        <p role="status" aria-live="polite" className="feedback-success">
          {feedbackSuccess}
        </p>
      ) : null}
      {feedbackError ? (
        <p role="alert" aria-live="assertive" className="feedback-error">
          {feedbackError}
        </p>
      ) : null}

      {isLoading ? <p className="loading-state">Carregando agendamentos...</p> : null}

      {!isLoading && viewMode === 'LISTA' && agendamentosFiltrados.length === 0 ? (
        <p className="empty-state">Nenhum agendamento encontrado.</p>
      ) : null}

      {!isLoading && viewMode === 'LISTA' && agendamentosFiltrados.length > 0 ? (
        <div className="lista-view-wrap">
          <div className="lista-view-toolbar">
            <button type="button" className="lista-ver-agenda-button" onClick={() => setViewMode('SEMANAL')}>
              Ver agenda semanal
            </button>
          </div>
          <section className="card-grid">
          {agendamentosFiltrados.map((agendamento) => {
            const acaoAtual = loadingAcoes[agendamento.id]
            return (
              <article key={agendamento.id} className="appointment-card">
                <header>
                  <div>
                    <p>{formatCompleteDate(agendamento.data)}</p>
                    <strong>{getTipoNome(agendamento)}</strong>
                  </div>
                  <span className={`status-pill ${STATUS_CLASSNAMES[agendamento.status]}`}>
                    {STATUS_LABELS[agendamento.status]}
                  </span>
                </header>

                <dl>
                  <div>
                    <dt>Paciente</dt>
                    <dd>{getPacienteNome(agendamento)}</dd>
                  </div>
                  <div>
                    <dt>Profissional</dt>
                    <dd>{getMedicoNome(agendamento)}</dd>
                  </div>
                  <div>
                    <dt>Especialidade</dt>
                    <dd>{getEspecialidade(agendamento)}</dd>
                  </div>
                </dl>

                <footer>
                  {canConfirm(agendamento) ? (
                    <button
                      type="button"
                      onClick={() => handleAcao(agendamento, 'confirmar')}
                      disabled={Boolean(acaoAtual)}
                    >
                      {acaoAtual === 'confirmar' ? 'Confirmando...' : 'Confirmar'}
                    </button>
                  ) : null}
                  {canComplete(agendamento) ? (
                    <button
                      type="button"
                      onClick={() => handleAcao(agendamento, 'realizar')}
                      disabled={Boolean(acaoAtual)}
                    >
                      {acaoAtual === 'realizar' ? 'Realizando...' : 'Realizar'}
                    </button>
                  ) : null}
                  {canCancel(agendamento) ? (
                    <button
                      type="button"
                      className="danger-action"
                      onClick={() => handleAcao(agendamento, 'cancelar')}
                      disabled={Boolean(acaoAtual)}
                    >
                      {acaoAtual === 'cancelar' ? 'Cancelando...' : 'Cancelar'}
                    </button>
                  ) : null}
                </footer>
              </article>
            )
          })}
          </section>
        </div>
      ) : null}

      {!isLoading && viewMode === 'SEMANAL' ? (
        <section className="weekly-board">
          <header className="weekly-header">
            <div>
              <h2>Agenda Semanal</h2>
              <p>{weekLabel}</p>
            </div>
            <div className="weekly-actions">
              <button
                type="button"
                className="weekly-ver-lista-button"
                onClick={() => setViewMode('LISTA')}
              >
                Ver lista em cards
              </button>
              <button type="button" onClick={() => setSemanaAtual(getCurrentWeekStart(new Date()))}>
                Hoje
              </button>
              <button
                type="button"
                aria-label="Semana anterior"
                onClick={() => {
                  const previous = new Date(semanaAtual)
                  previous.setDate(previous.getDate() - 7)
                  setSemanaAtual(previous)
                }}
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Próxima semana"
                onClick={() => {
                  const next = new Date(semanaAtual)
                  next.setDate(next.getDate() + 7)
                  setSemanaAtual(next)
                }}
              >
                →
              </button>
              <button type="button" className="weekly-new-button">
                + Novo Agendamento
              </button>
            </div>
          </header>

          {agendamentosSemana.length === 0 ? (
            <p className="weekly-empty-hint" role="status">
              Nenhum agendamento nesta semana com os filtros atuais. A grade abaixo mostra os
              horários de 07:00 a 21:00.
            </p>
          ) : null}

          <div className="weekly-grid-wrapper">
            <div className="weekly-grid">
              <div className="weekly-time-column">
                <div className="weekly-column-header">Horários</div>
                {HOURS.map((hour) => (
                  <div key={hour} className="weekly-hour-cell">
                    {String(hour).padStart(2, '0')}:00
                  </div>
                ))}
              </div>

              {diasSemana.map((dia) => {
                const isToday = getStartOfDay(dia).getTime() === getStartOfDay(new Date()).getTime()
                return (
                  <div key={dia.toISOString()} className="weekly-day-column">
                    <div className={isToday ? 'weekly-column-header today-column' : 'weekly-column-header'}>
                      {new Intl.DateTimeFormat('pt-BR', { weekday: 'short', day: '2-digit' }).format(dia)}
                    </div>
                    {HOURS.map((hour) => (
                      <div key={`${dia.toISOString()}-${hour}`} className="weekly-hour-cell" />
                    ))}

                    <div className="weekly-events-layer">
                      {agendamentosSemana
                        .filter((agendamento) => {
                          const date = parseDateInLocal(agendamento.data)
                          return (
                            date.getDate() === dia.getDate() &&
                            date.getMonth() === dia.getMonth() &&
                            date.getFullYear() === dia.getFullYear()
                          )
                        })
                        .map((agendamento) => {
                          const date = parseDateInLocal(agendamento.data)
                          const startMinutes = (date.getHours() - 7) * 60 + date.getMinutes()
                          const top = (startMinutes / (HOURS.length * 60)) * 100

                          return (
                            <button
                              key={agendamento.id}
                              type="button"
                              className={`weekly-event ${STATUS_CLASSNAMES[agendamento.status]}`}
                              style={{ top: `${top}%` }}
                              aria-label={`${new Intl.DateTimeFormat('pt-BR', {
                                hour: '2-digit',
                                minute: '2-digit',
                              }).format(date)}. Paciente: ${getPacienteNome(agendamento)}. Médico: ${getMedicoNome(agendamento)}.`}
                              onClick={() => setSelectedAgendamento(agendamento)}
                            >
                              <strong>
                                {new Intl.DateTimeFormat('pt-BR', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                }).format(date)}
                              </strong>
                              <span className="weekly-event-line weekly-event-paciente">
                                {getPacienteNome(agendamento)}
                              </span>
                              <span className="weekly-event-line weekly-event-medico">
                                {getMedicoNome(agendamento)}
                              </span>
                            </button>
                          )
                        })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="agendamento-hero">
        <div>
          <p className="agendamento-hero-chip">Próximo compromisso</p>
          <h1>Gestão clínica com visão total da agenda</h1>
          {proximoAgendamento ? (
            <div className="agendamento-hero-next">
              <p>{formatHeroDate(proximoAgendamento.data).dia}</p>
              <strong>{formatHeroDate(proximoAgendamento.data).horario}</strong>
              <span>{getMedicoNome(proximoAgendamento)}</span>
              <small>{getPacienteNome(proximoAgendamento)}</small>
              <em className={`status-pill ${STATUS_CLASSNAMES[proximoAgendamento.status]}`}>
                {STATUS_LABELS[proximoAgendamento.status]}
              </em>
            </div>
          ) : (
            <p className="agendamento-no-next">Nenhum próximo agendamento futuro.</p>
          )}
        </div>
      </section>

      {selectedAgendamento ? (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Detalhes do agendamento">
          <div className="modal-card">
            <h3>Detalhes do agendamento</h3>
            <p>
              <strong>Paciente:</strong> {getPacienteNome(selectedAgendamento)}
            </p>
            <p>
              <strong>Médico:</strong> {getMedicoNome(selectedAgendamento)}
            </p>
            <p>
              <strong>Data e horário:</strong> {formatCompleteDate(selectedAgendamento.data)}
            </p>
            <p>
              <strong>Status:</strong> {STATUS_LABELS[selectedAgendamento.status]}
            </p>
            <p>
              <strong>Tipo:</strong> {getTipoNome(selectedAgendamento)}
            </p>
            <div className="modal-actions">
              {canConfirm(selectedAgendamento) ? (
                <button
                  type="button"
                  onClick={() => handleAcao(selectedAgendamento, 'confirmar')}
                  disabled={Boolean(loadingAcoes[selectedAgendamento.id])}
                >
                  Confirmar
                </button>
              ) : null}
              {canComplete(selectedAgendamento) ? (
                <button
                  type="button"
                  onClick={() => handleAcao(selectedAgendamento, 'realizar')}
                  disabled={Boolean(loadingAcoes[selectedAgendamento.id])}
                >
                  Realizar
                </button>
              ) : null}
              {canCancel(selectedAgendamento) ? (
                <button
                  type="button"
                  className="danger-action"
                  onClick={() => handleAcao(selectedAgendamento, 'cancelar')}
                  disabled={Boolean(loadingAcoes[selectedAgendamento.id])}
                >
                  Cancelar
                </button>
              ) : null}
              <button type="button" className="ghost-action" onClick={() => setSelectedAgendamento(null)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
