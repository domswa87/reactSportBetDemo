import Typography from '@mui/material/Typography'
import { getPage, type TopMenuItem } from './menuConfig'

type AppContentProps = {
  activeTopItem: TopMenuItem
  activeSideItem: string
}

function AppContent({ activeTopItem, activeSideItem }: AppContentProps) {
  const PageComponent = getPage(activeTopItem, activeSideItem)

  if (!PageComponent) {
    return <MissingPage />
  }

  return <PageComponent />
}

function MissingPage() {
  return (
    <Typography color="error">
      Page not found. Add it to APP_PAGES in menuConfig.ts.
    </Typography>
  )
}

export default AppContent
