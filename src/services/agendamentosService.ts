import { apiRequest, buildQueryParams } from '../lib/api'
import type { Agendamento, StatusAgendamento } from '../types/agendamento'

interface ListAgendamentosParams {
  status?: StatusAgendamento
  especialidade?: string
}

interface ApiListResponse {
  data?: Agendamento[]
  results?: Agendamento[]
  items?: Agendamento[]
}

export async function listarAgendamentos(params: ListAgendamentosParams = {}) {
  const query = buildQueryParams({
    status: params.status,
  })

  let payload: ApiListResponse | Agendamento[]
  try {
    payload = await apiRequest<ApiListResponse | Agendamento[]>(`/agendamento${query}`, {
      method: 'GET',
    })
  } catch {
    payload = await apiRequest<ApiListResponse | Agendamento[]>(`/admin/agendamentos${query}`, {
      method: 'GET',
    })
  }

  if (Array.isArray(payload)) {
    return payload
  }

  return payload.data ?? payload.results ?? payload.items ?? []
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
