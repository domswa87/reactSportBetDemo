import { useState } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import type { Dayjs } from 'dayjs'
import { AppButton } from '../../components/ui/AppButton'
import { useEvents } from '../../context/EventsContext'

export function CreateNewBet() {
  const { addEvent } = useEvents()
  const [homeTeam, setHomeTeam] = useState('')
  const [awayTeam, setAwayTeam] = useState('')
  const [eventDate, setEventDate] = useState<Dayjs | null>(null)
  const [eventTime, setEventTime] = useState<Dayjs | null>(null)
  const [showSuccessToast, setShowSuccessToast] = useState(false)

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

    addEvent({
      id: crypto.randomUUID(),
      homeTeam: homeTeam.trim(),
      awayTeam: awayTeam.trim(),
      eventDateTime,
    })

    setHomeTeam('')
    setAwayTeam('')
    setEventDate(null)
    setEventTime(null)
    setShowSuccessToast(true)
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
