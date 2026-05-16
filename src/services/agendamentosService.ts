import { apiRequest, buildQueryParams } from '../lib/api'
import type { Agendamento, StatusAgendamento } from '../types/agendamento'

interface ListAgendamentosParams {
  status?: StatusAgendamento
  especialidade?: string
}

function extrairArray(payload: unknown): Agendamento[] {
  if (Array.isArray(payload)) return payload as Agendamento[]

  if (payload && typeof payload === 'object') {
    const obj = payload as Record<string, unknown>
    for (const value of Object.values(obj)) {
      if (Array.isArray(value)) return value as Agendamento[]
    }
  }

  return []
}

export async function listarAgendamentos(params: ListAgendamentosParams = {}) {
  const query = buildQueryParams({
    status: params.status,
  })

  try {
    const payload = await apiRequest<unknown>(`/agendamento${query}`, { method: 'GET' })
    return extrairArray(payload)
  } catch {
    const payload = await apiRequest<unknown>(`/admin/agendamentos${query}`, { method: 'GET' })
    return extrairArray(payload)
  }
}

export async function confirmarAgendamento(id: string) {
  try {
    return await apiRequest<Agendamento>(`/agendamento/${id}/confirmar`, { method: 'PATCH' })
  } catch {
    return apiRequest<Agendamento>(`/admin/agendamentos/${id}/confirmar`, { method: 'PATCH' })
  }
}

export async function cancelarAgendamento(id: string) {
  try {
    return await apiRequest<Agendamento>(`/agendamento/${id}/cancelar`, { method: 'PATCH' })
  } catch {
    return apiRequest<Agendamento>(`/admin/agendamentos/${id}/cancelar`, { method: 'PATCH' })
  }
}

export async function realizarAgendamento(id: string) {
  try {
    return await apiRequest<Agendamento>(`/agendamento/${id}/realizar`, { method: 'PATCH' })
  } catch {
    return apiRequest<Agendamento>(`/admin/agendamentos/${id}/realizar`, { method: 'PATCH' })
  }
}
