import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Event } from '../types/event'

type EventsProviderProps = {
  children: ReactNode
}

type EventsContextType = {
  events: Event[]
  addEvent: (event: Event) => void
  updateEvent: (event: Event) => void
  deleteEvent: (id: string) => void
}

const EventsContext = createContext<EventsContextType | null>(null)

export function EventsProvider({ children }: EventsProviderProps) {
  const [events, setEvents] = useState<Event[]>([])

  function addEvent(event: Event) {
    setEvents((currentEvents) => [...currentEvents, event])
  }

  function updateEvent(updatedEvent: Event) {
    setEvents((currentEvents) =>
      currentEvents.map((event) => {
        if (event.id === updatedEvent.id) {
          return updatedEvent
        }
        return event
      }),
    )
  }

  function deleteEvent(id: string) {
    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== id),
    )
  }

  const value = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
  }

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  )
}

export function useEvents() {
  const value = useContext(EventsContext)

  if (!value) {
    throw new Error('useEvents must be used inside EventsProvider')
  }

  return value
}
