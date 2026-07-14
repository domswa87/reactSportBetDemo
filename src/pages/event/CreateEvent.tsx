import { useState } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import type { Dayjs } from 'dayjs'
import { createEvent } from '../../api/eventsApi'
import { AppButton } from '../../components/ui/AppButton'

export function CreateEvent() {
  const [homeTeam, setHomeTeam] = useState('')
  const [awayTeam, setAwayTeam] = useState('')
  const [eventDate, setEventDate] = useState<Dayjs | null>(null)
  const [eventTime, setEventTime] = useState<Dayjs | null>(null)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleAddEvent() {
    if (!homeTeam.trim() || !awayTeam.trim() || !eventDate || !eventTime) {
      setErrorMessage('Please fill in home team, away team, date and time.')
      return
    }

    const eventDateTime = eventDate
      .hour(eventTime.hour())
      .minute(eventTime.minute())
      .second(0)
      .millisecond(0)
      .toISOString()

    setErrorMessage('')
    setIsSubmitting(true)

    try {
      await createEvent({
        homeTeam: homeTeam.trim(),
        awayTeam: awayTeam.trim(),
        eventDateTime,
      })

      setHomeTeam('')
      setAwayTeam('')
      setEventDate(null)
      setEventTime(null)
      setShowSuccessToast(true)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to create event',
      )
    } finally {
      setIsSubmitting(false)
    }
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

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <AppButton onClick={handleAddEvent} disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add event'}
      </AppButton>

      <Snackbar
        open={showSuccessToast}
        autoHideDuration={3000}
        onClose={() => setShowSuccessToast(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setShowSuccessToast(false)}
          sx={{ width: '100%' }}
        >
          New bet added
        </Alert>
      </Snackbar>
    </Stack>
  )
}
