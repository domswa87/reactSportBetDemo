import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import dayjs, { type Dayjs } from 'dayjs'
import {
  deleteEvent as deleteEventApi,
  getAllEvents,
  updateEvent as updateEventApi,
} from '../../api/eventsApi'
import { AppButton } from '../../components/ui/AppButton'
import type { Event } from '../../types/event'
import { formatEventDateTime } from '../../utils/dateFormat'

export function ManageEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [homeTeam, setHomeTeam] = useState('')
  const [awayTeam, setAwayTeam] = useState('')
  const [eventDate, setEventDate] = useState<Dayjs | null>(null)
  const [eventTime, setEventTime] = useState<Dayjs | null>(null)

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getAllEvents()
        setEvents(data)
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Failed to load events',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadEvents()
  }, [])

  function startEdit(event: Event) {
    const dateTime = dayjs(event.eventDateTime)
    setEditingId(event.id)
    setHomeTeam(event.homeTeam)
    setAwayTeam(event.awayTeam)
    setEventDate(dateTime)
    setEventTime(dateTime)
    setErrorMessage('')
  }

  function cancelEdit() {
    setEditingId(null)
    setHomeTeam('')
    setAwayTeam('')
    setEventDate(null)
    setEventTime(null)
  }

  async function handleSaveEdit() {
    if (!editingId || !homeTeam.trim() || !awayTeam.trim() || !eventDate || !eventTime) {
      return
    }

    const eventDateTime = eventDate
      .hour(eventTime.hour())
      .minute(eventTime.minute())
      .second(0)
      .millisecond(0)
      .toISOString()

    setErrorMessage('')

    try {
      const updatedEvent = await updateEventApi(editingId, {
        homeTeam: homeTeam.trim(),
        awayTeam: awayTeam.trim(),
        eventDateTime,
      })

      setEvents((currentEvents) =>
        currentEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event,
        ),
      )
      cancelEdit()
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to update event',
      )
    }
  }

  async function handleDelete(id: string) {
    setErrorMessage('')

    try {
      await deleteEventApi(id)
      setEvents((currentEvents) =>
        currentEvents.filter((event) => event.id !== id),
      )
      if (editingId === id) {
        cancelEdit()
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to delete event',
      )
    }
  }

  if (isLoading) {
    return (
      <Typography variant="body2" color="text.secondary">
        Loading events...
      </Typography>
    )
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Events list</Typography>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

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
                  <AppButton onClick={() => handleDelete(event.id)}>
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
