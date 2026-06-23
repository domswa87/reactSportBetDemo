export function formatEventDateTime(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}-${month}-${year} ${hours}:${minutes}`
}

export function formatEventDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}-${month}-${year}`
}

export function formatEventTime(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${hours}:${minutes}`
}

export function parseGridDateTime(date: string, time: string): string | null {
  const dateMatch = date.trim().match(/^(\d{2})-(\d{2})-(\d{4})$/)
  const timeMatch = time.trim().match(/^(\d{2}):(\d{2})$/)

  if (!dateMatch || !timeMatch) {
    return null
  }

  const [, day, month, year] = dateMatch
  const [, hours, minutes] = timeMatch
  const eventDateTime = `${year}-${month}-${day}T${hours}:${minutes}:00`

  if (Number.isNaN(new Date(eventDateTime).getTime())) {
    return null
  }

  return new Date(eventDateTime).toISOString()
}
