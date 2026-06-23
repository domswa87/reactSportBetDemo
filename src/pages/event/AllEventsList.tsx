import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { getAllEvents } from '../../api/eventsApi'
import type { Event } from '../../types/event'
import { formatEventDateTime } from '../../utils/dateFormat'

export function AllEventsList() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getAllEvents()
        setEvents(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load events')
      } finally {
        setIsLoading(false)
      }
    }

    loadEvents()
  }, [])

  if (isLoading) {
    return <Typography>Loading events...</Typography>
  }

  if (error) {
    return <Typography color="error">{error}</Typography>
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        All Events
      </Typography>

      {events.length === 0 ? (
        <Typography color="text.secondary">No events yet.</Typography>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              {event.homeTeam} vs {event.awayTeam} -{' '}
              {formatEventDateTime(event.eventDateTime)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
