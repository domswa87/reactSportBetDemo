import { API_BASE_URL } from '../config/api'
import type { Event } from '../types/event'

type CreateEventRequest = {
  homeTeam: string
  awayTeam: string
  eventDateTime: string
}

export async function createEvent(request: CreateEventRequest): Promise<Event> {
  const response = await fetch(`${API_BASE_URL}/api/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Failed to create event')
  }

  return response.json()
}
