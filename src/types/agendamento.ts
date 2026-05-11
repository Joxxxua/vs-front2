export type StatusAgendamento =
  | 'AGENDADO'
  | 'CONFIRMADO'
  | 'CANCELADO'
  | 'REALIZADO'

export interface Agendamento {
  id: string
  data: string
  status: StatusAgendamento
  /** Nome vindo “flat” da API (alternativas comuns) */
  nomePaciente?: string
  pacienteNome?: string
  nomeMedico?: string
  medicoNome?: string
  paciente?: {
    nome?: string
    name?: string
    email?: string
    user?: {
      nome?: string
      name?: string
      email?: string
    }
  }
  usuario?: {
    nome?: string
    name?: string
    email?: string
  }
  user?: {
    nome?: string
    name?: string
    email?: string
    phone?: string
    cpf?: string
  }
  medico?: {
    nome?: string
    name?: string
    especialidade?: string
    crm?: string
    user?: {
      nome?: string
      name?: string
      email?: string
    }
  }
  clinica?: {
    nome?: string
    name?: string
  }
  tipo?: {
    nome?: string
    name?: string
    descricao?: string
  }
}
