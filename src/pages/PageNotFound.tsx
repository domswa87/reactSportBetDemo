import Typography from '@mui/material/Typography'

function PageNotFound() {
  return (
    <Typography color="error">
      Page not found. Add it to PAGE_COMPONENTS in config/pageComponents.ts.
    </Typography>
  )
}

export default PageNotFound
