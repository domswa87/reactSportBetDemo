import { useState } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import dayjs, { type Dayjs } from 'dayjs'
import { AppButton } from '../../components/ui/AppButton'
import { useEvents } from '../../context/EventsContext'
import type { Event } from '../../types/event'
import { formatEventDateTime } from '../../utils/dateFormat'

export function ManageEvents() {
  const { events, updateEvent, deleteEvent } = useEvents()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [homeTeam, setHomeTeam] = useState('')
  const [awayTeam, setAwayTeam] = useState('')
  const [eventDate, setEventDate] = useState<Dayjs | null>(null)
  const [eventTime, setEventTime] = useState<Dayjs | null>(null)

  function startEdit(event: Event) {
    const dateTime = dayjs(event.eventDateTime)
    setEditingId(event.id)
    setHomeTeam(event.homeTeam)
    setAwayTeam(event.awayTeam)
    setEventDate(dateTime)
    setEventTime(dateTime)
  }

  function cancelEdit() {
    setEditingId(null)
    setHomeTeam('')
    setAwayTeam('')
    setEventDate(null)
    setEventTime(null)
  }

  function handleSaveEdit() {
    if (!editingId || !homeTeam.trim() || !awayTeam.trim() || !eventDate || !eventTime) {
      return
    }

    const eventDateTime = eventDate
      .hour(eventTime.hour())
      .minute(eventTime.minute())
      .second(0)
      .millisecond(0)
      .toISOString()

    updateEvent({
      id: editingId,
      homeTeam: homeTeam.trim(),
      awayTeam: awayTeam.trim(),
      eventDateTime,
    })

    cancelEdit()
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Events list</Typography>

      {events.length === 0 ? (
        <Typography color="text.secondary">No events yet.</Typography>
      ) : (
        events.map((event) => (
          <Stack key={event.id} spacing={1}>
            {editingId === event.id ? (
              <>
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
                <Stack direction="row" spacing={1}>
                  <AppButton isActive onClick={handleSaveEdit}>
                    Save
                  </AppButton>
                  <AppButton onClick={cancelEdit}>Cancel</AppButton>
                </Stack>
              </>
            ) : (
              <>
                <Typography>
                  {event.homeTeam} - {event.awayTeam} -{' '}
                  {formatEventDateTime(event.eventDateTime)}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <AppButton onClick={() => startEdit(event)}>Edit</AppButton>
                  <AppButton onClick={() => deleteEvent(event.id)}>
                    Delete
                  </AppButton>
                </Stack>
              </>
            )}
          </Stack>
        ))
      )}
    </Stack>
  )
}
