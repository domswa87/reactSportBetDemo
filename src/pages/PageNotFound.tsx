import Typography from '@mui/material/Typography'

function PageNotFound() {
  return (
    <Typography color="error">
      Page not found. Add it to APP_PAGES in config/menuConfig.ts.
    </Typography>
  )
}

export default PageNotFound
