import { useState } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { AppButton } from '../../components/ui/AppButton'
import { useEvents } from '../../context/EventsContext'
import type { Event } from '../../types/event'
import {
  createEmptyGridRow,
  isGridRowEmpty,
  type EventGridRow,
} from '../../types/eventGrid'
import {
  formatEventDate,
  formatEventTime,
  parseGridDateTime,
} from '../../utils/dateFormat'

function eventsToGridRows(events: Event[]): EventGridRow[] {
  if (events.length === 0) {
    return [createEmptyGridRow(), createEmptyGridRow(), createEmptyGridRow()]
  }

  return events.map((event) => ({
    id: event.id,
    homeTeam: event.homeTeam,
    awayTeam: event.awayTeam,
    date: formatEventDate(event.eventDateTime),
    time: formatEventTime(event.eventDateTime),
  }))
}

function gridRowsToEvents(rows: EventGridRow[]): Event[] | null {
  const events: Event[] = []

  for (const row of rows) {
    if (isGridRowEmpty(row)) {
      continue
    }

    const eventDateTime = parseGridDateTime(row.date, row.time)

    if (!row.homeTeam.trim() || !row.awayTeam.trim() || !eventDateTime) {
      return null
    }

    events.push({
      id: row.id,
      homeTeam: row.homeTeam.trim(),
      awayTeam: row.awayTeam.trim(),
      eventDateTime,
    })
  }

  return events
}

export function EventsGrid() {
  const { events, replaceEvents } = useEvents()
  const [rows, setRows] = useState<EventGridRow[]>(() => eventsToGridRows(events))
  const [saveError, setSaveError] = useState('')
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  function updateCell(
    rowId: string,
    field: keyof Omit<EventGridRow, 'id'>,
    value: string,
  ) {
    setRows((currentRows) =>
      currentRows.map((row) =>
        row.id === rowId ? { ...row, [field]: value } : row,
      ),
    )
  }

  function addRow() {
    setRows((currentRows) => [...currentRows, createEmptyGridRow()])
  }

  function deleteRow(rowId: string) {
    setRows((currentRows) => {
      const nextRows = currentRows.filter((row) => row.id !== rowId)
      return nextRows.length > 0 ? nextRows : [createEmptyGridRow()]
    })
  }

  function handleSave() {
    const savedEvents = gridRowsToEvents(rows)

    if (!savedEvents) {
      setSaveError(
        'Check each row: home team, away team, date DD-MM-YYYY, time HH:mm',
      )
      return
    }

    setSaveError('')
    replaceEvents(savedEvents)
    setRows(eventsToGridRows(savedEvents))
    setShowSuccessToast(true)
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Quick events grid</Typography>
      <Typography color="text.secondary" variant="body2">
        Edit cells like a spreadsheet. Date: DD-MM-YYYY, time: HH:mm (24h).
      </Typography>

      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Home</TableCell>
              <TableCell>Away</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <TextField
                    value={row.homeTeam}
                    onChange={(e) =>
                      updateCell(row.id, 'homeTeam', e.target.value)
                    }
                    placeholder="Poland"
                    size="small"
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.awayTeam}
                    onChange={(e) =>
                      updateCell(row.id, 'awayTeam', e.target.value)
                    }
                    placeholder="Germany"
                    size="small"
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.date}
                    onChange={(e) => updateCell(row.id, 'date', e.target.value)}
                    placeholder="19-06-2026"
                    size="small"
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.time}
                    onChange={(e) => updateCell(row.id, 'time', e.target.value)}
                    placeholder="21:00"
                    size="small"
                    variant="standard"
                  />
                </TableCell>
                <TableCell>
                  <AppButton onClick={() => deleteRow(row.id)}>Delete</AppButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {saveError && <Alert severity="error">{saveError}</Alert>}

      <Stack direction="row" spacing={1}>
        <AppButton onClick={addRow}>Add row</AppButton>
        <AppButton isActive onClick={handleSave}>
          Save all
        </AppButton>
      </Stack>

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
          Events saved
        </Alert>
      </Snackbar>
    </Stack>
  )
}
