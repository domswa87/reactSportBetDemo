export type EventGridRow = {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  time: string
}

export function createEmptyGridRow(): EventGridRow {
  return {
    id: crypto.randomUUID(),
    homeTeam: '',
    awayTeam: '',
    date: '',
    time: '',
  }
}

export function isGridRowEmpty(row: EventGridRow) {
  return (
    !row.homeTeam.trim() &&
    !row.awayTeam.trim() &&
    !row.date.trim() &&
    !row.time.trim()
  )
}
