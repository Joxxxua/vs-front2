import type { Agendamento } from '../types/agendamento'

type PessoaLike = {
  nome?: string
  name?: string
  email?: string
  fullName?: string
}

function pick(...values: (string | undefined | null)[]): string {
  for (const value of values) {
    if (value != null && String(value).trim() !== '') {
      return String(value).trim()
    }
  }
  return ''
}

function labelPessoa(pessoa?: PessoaLike | null): string {
  if (!pessoa) return ''
  const extended = pessoa as PessoaLike & { fullName?: string; razaoSocial?: string }
  return pick(pessoa.nome, pessoa.name, extended.fullName, extended.razaoSocial, pessoa.email)
}

function labelPessoaNested(
  bloco?: { nome?: string; name?: string; email?: string; user?: PessoaLike } | null,
): string {
  if (!bloco) return ''
  return pick(labelPessoa(bloco), labelPessoa(bloco.user ?? null))
}

/** Sempre retorna texto identificável do paciente (nunca string vazia). */
export function getPacienteNome(agendamento: Agendamento): string {
  const nomeDireto = pick(
    agendamento.nomePaciente,
    agendamento.pacienteNome,
    labelPessoa(agendamento.user),
    labelPessoaNested(agendamento.paciente),
    labelPessoa(agendamento.usuario),
  )

  if (nomeDireto) return nomeDireto

  const email = pick(agendamento.user?.email, agendamento.paciente?.email, agendamento.usuario?.email)
  if (email) return email

  const cpf = agendamento.user?.cpf?.replace(/\D/g, '')
  if (cpf && cpf.length >= 4) return `Paciente (CPF …${cpf.slice(-4)})`

  const tel = agendamento.user?.phone?.replace(/\D/g, '')
  if (tel && tel.length >= 4) return `Paciente (tel. …${tel.slice(-4)})`

  return `Paciente (ref. ${agendamento.id.slice(0, 8)})`
}

/** Sempre retorna texto identificável do médico (nunca string vazia). */
export function getMedicoNome(agendamento: Agendamento): string {
  const medico = agendamento.medico
  const nomeDireto = pick(
    agendamento.nomeMedico,
    agendamento.medicoNome,
    labelPessoa(medico as PessoaLike | undefined),
    labelPessoa(medico?.user ?? null),
  )

  if (nomeDireto) return nomeDireto

  const emailMed = medico?.user?.email
  if (emailMed) return emailMed

  if (medico?.crm) return `Médico (CRM ${medico.crm})`

  if (medico?.especialidade) return `${medico.especialidade} — dados do profissional`

  return `Médico (ref. ${agendamento.id.slice(0, 8)})`
}
