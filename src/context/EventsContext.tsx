import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Event } from '../types/event'

type EventsContextValue = {
  events: Event[]
  addEvent: (event: Event) => void
  updateEvent: (event: Event) => void
  deleteEvent: (id: string) => void
}

const EventsContext = createContext<EventsContextValue | null>(null)

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([])

  function addEvent(event: Event) {
    setEvents((currentEvents) => [...currentEvents, event])
  }

  function updateEvent(updatedEvent: Event) {
    setEvents(
      (currentEvents) =>
      currentEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    )
  }

  function deleteEvent(id: string) {
    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== id),
    )
  }

  return (
    <EventsContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventsContext.Provider>
  )
}

export function useEvents() {
  const context = useContext(EventsContext)
  if (!context) {
    throw new Error('useEvents must be used inside EventsProvider')
  }
  return context
}
