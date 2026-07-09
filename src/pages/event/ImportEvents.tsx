import { useRef, useState } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import {
  createManyEvents,
  type CreateEventRequest,
} from '../../api/eventsApi'
import { AppButton } from '../../components/ui/AppButton'
import { formatEventDateTime } from '../../utils/dateFormat'

function parseImportFile(content: string): CreateEventRequest[] {
  let parsed: unknown

  try {
    parsed = JSON.parse(content)
  } catch {
    throw new Error('Invalid JSON file.')
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error('JSON must be a non-empty array of events.')
  }

  return parsed.map((item, index) => {
    if (!item || typeof item !== 'object') {
      throw new Error(`Event at index ${index} must be an object.`)
    }

    const { homeTeam, awayTeam, eventDateTime } = item as Record<
      string,
      unknown
    >

    if (
      typeof homeTeam !== 'string' ||
      typeof awayTeam !== 'string' ||
      typeof eventDateTime !== 'string' ||
      !homeTeam.trim() ||
      !awayTeam.trim() ||
      !eventDateTime.trim()
    ) {
      throw new Error(
        `Event at index ${index}: homeTeam, awayTeam, and eventDateTime are required.`,
      )
    }

    return {
      homeTeam: homeTeam.trim(),
      awayTeam: awayTeam.trim(),
      eventDateTime: eventDateTime.trim(),
    }
  })
}

export function ImportEvents() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState('')
  const [previewEvents, setPreviewEvents] = useState<CreateEventRequest[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [importedCount, setImportedCount] = useState(0)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    setErrorMessage('')
    setPreviewEvents([])
    setFileName('')

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      try {
        const parsedEvents = parseImportFile(String(reader.result ?? ''))
        setPreviewEvents(parsedEvents)
        setFileName(file.name)
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Failed to read file',
        )
      }
    }

    reader.onerror = () => {
      setErrorMessage('Failed to read file.')
    }

    reader.readAsText(file)
  }

  async function handleImport() {
    if (previewEvents.length === 0) {
      return
    }

    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const createdEvents = await createManyEvents(previewEvents)
      setImportedCount(createdEvents.length)
      setPreviewEvents([])
      setFileName('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      setShowSuccessToast(true)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to import events',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Import events</Typography>
      <Typography color="text.secondary" variant="body2">
        Upload a JSON file with an array of events. Each item needs homeTeam,
        awayTeam, and eventDateTime (ISO format).
      </Typography>

      <Typography
        component="pre"
        variant="caption"
        sx={{
          m: 0,
          p: 1.5,
          bgcolor: 'action.hover',
          borderRadius: 1,
          overflowX: 'auto',
        }}
      >
        {`[
  {
    "homeTeam": "Spain",
    "awayTeam": "Italy",
    "eventDateTime": "2026-06-20T18:00:00"
  }
]`}
      </Typography>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileChange}
      />

      {fileName && (
        <Typography variant="body2">
          Selected file: <strong>{fileName}</strong> ({previewEvents.length}{' '}
          events)
        </Typography>
      )}

      {previewEvents.length > 0 && (
        <Stack spacing={0.5}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Preview
          </Typography>
          {previewEvents.map((event, index) => (
            <Typography
              key={`${event.homeTeam}-${event.awayTeam}-${event.eventDateTime}-${index}`}
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

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <AppButton
        isActive
        onClick={handleImport}
        disabled={isSubmitting || previewEvents.length === 0}
      >
        {isSubmitting ? 'Importing...' : 'Import events'}
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
          {importedCount} event{importedCount === 1 ? '' : 's'} imported
        </Alert>
      </Snackbar>
    </Stack>
  )
}
