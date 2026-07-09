import { API_BASE_URL } from '../config/api'
import type { Event } from '../types/event'

export type CreateEventRequest = {
  homeTeam: string
  awayTeam: string
  eventDateTime: string
}

export async function createEvent(request: CreateEventRequest): Promise<Event> {
  const response = await fetch(`${API_BASE_URL}/api/events/create`, {
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

export async function createManyEvents(
  requests: CreateEventRequest[],
): Promise<Event[]> {
  const response = await fetch(`${API_BASE_URL}/api/events/CreateMany`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requests),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Failed to import events')
  }

  return response.json()
}

export async function getAllEvents(): Promise<Event[]> {
  const response = await fetch(`${API_BASE_URL}/api/events/GetAll`)

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Failed to get all events')
  }

  return response.json()
}

export async function updateEvent(
  id: string,
  request: CreateEventRequest,
): Promise<Event> {
  const response = await fetch(`${API_BASE_URL}/api/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Failed to update event')
  }

  return response.json()
}

export async function deleteEvent(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/events/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Failed to delete event')
  }
}
