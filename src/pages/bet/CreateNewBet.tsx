import { useState } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { AppButton } from '../../components/ui/AppButton'
import type { Event } from '../../types/event'

function formatEventDateTime(value: string) {
  return new Date(value).toLocaleString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function CreateNewBet() {
  const [homeTeam, setHomeTeam] = useState('')
  const [awayTeam, setAwayTeam] = useState('')
  const [eventDateTime, setEventDateTime] = useState('')
  const [events, setEvents] = useState<Event[]>([])

  function handleAddEvent() {
    if (!homeTeam.trim() || !awayTeam.trim() || !eventDateTime) {
      return
    }

    const newEvent: Event = {
      id: crypto.randomUUID(),
      homeTeam: homeTeam.trim(),
      awayTeam: awayTeam.trim(),
      eventDateTime,
    }

    setEvents((currentEvents) => [...currentEvents, newEvent])

    setHomeTeam('')
    setAwayTeam('')
    setEventDateTime('')
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Create new event</Typography>

      <TextField
        label="Home team"
        value={homeTeam}
        onChange={(e) => setHomeTeam(e.target.value)}
        fullWidth
      />

      <TextField
        label="Away team"
        value={awayTeam}
        onChange={(e) => setAwayTeam(e.target.value)}
        fullWidth
      />

      <TextField
        label="Date and time"
        type="datetime-local"
        value={eventDateTime}
        onChange={(e) => setEventDateTime(e.target.value)}
        fullWidth
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <AppButton onClick={handleAddEvent}>Add event</AppButton>

      <Typography variant="subtitle1">Events list</Typography>

      {events.length === 0 ? (
        <Typography color="text.secondary">No events yet.</Typography>
      ) : (
        events.map((event) => (
          <Typography key={event.id}>
            {event.homeTeam} - {event.awayTeam} -{' '}
            {formatEventDateTime(event.eventDateTime)}
          </Typography>
        ))
      )}
    </Stack>
  )
}
