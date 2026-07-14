import { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { getAllEvents } from '../../api/eventsApi'
import type { Event } from '../../types/event'
import { formatEventDateTime } from '../../utils/dateFormat'

export function AllEvents() {
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
    return (
      <Typography variant="body2" color="text.secondary">
        Loading events...
      </Typography>
    )
  }

  if (error) {
    return (
      <Typography variant="body2" color="error">
        {error}
      </Typography>
    )
  }

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        All Events
      </Typography>

      {events.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No events yet.
        </Typography>
      ) : (
        <Stack spacing={0.5}>
          {events.map((event) => (
            <Typography
              key={event.id}
              variant="caption"
              component="p"
              sx={{ lineHeight: 1.4, m: 0 }}
            >
              {event.homeTeam} vs {event.awayTeam} ·{' '}
              {formatEventDateTime(event.eventDateTime)}
            </Typography>
          ))}
        </Stack>
      )}
    </Stack>
  )
}
