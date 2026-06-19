import { useState } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import type { Dayjs } from 'dayjs'
import { AppButton } from '../../components/ui/AppButton'
import type { Event } from '../../types/event'
import { formatEventDateTime } from '../../utils/dateFormat'

export function CreateNewBet() {
  const [homeTeam, setHomeTeam] = useState('')
  const [awayTeam, setAwayTeam] = useState('')
  const [eventDate, setEventDate] = useState<Dayjs | null>(null)
  const [eventTime, setEventTime] = useState<Dayjs | null>(null)
  const [events, setEvents] = useState<Event[]>([])

  function handleAddEvent() {
    if (!homeTeam.trim() || !awayTeam.trim() || !eventDate || !eventTime) {
      return
    }

    const eventDateTime = eventDate
      .hour(eventTime.hour())
      .minute(eventTime.minute())
      .second(0)
      .millisecond(0)
      .toISOString()

    const newEvent: Event = {
      id: crypto.randomUUID(),
      homeTeam: homeTeam.trim(),
      awayTeam: awayTeam.trim(),
      eventDateTime,
    }

    setEvents((currentEvents) => [...currentEvents, newEvent])

    setHomeTeam('')
    setAwayTeam('')
    setEventDate(null)
    setEventTime(null)
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

      <DatePicker
        label="Date"
        value={eventDate}
        onChange={(newValue) => setEventDate(newValue)}
        format="DD-MM-YYYY"
        slotProps={{ textField: { fullWidth: true } }}
      />

      <TimePicker
        label="Time"
        value={eventTime}
        onChange={(newValue) => setEventTime(newValue)}
        ampm={false}
        format="HH:mm"
        slotProps={{ textField: { fullWidth: true } }}
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
