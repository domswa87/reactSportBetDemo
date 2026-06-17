import Typography from '@mui/material/Typography'

export function HomeTodayPage() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Today
      </Typography>
      <Typography color="text.secondary">
        All events scheduled for today.
      </Typography>
    </>
  )
}
