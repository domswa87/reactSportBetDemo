import Typography from '@mui/material/Typography'
import { APP_PAGES } from '../../config/menuConfig'
import type { ComponentType } from 'react'

type AppContentProps = {
  activeTopItem: string
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

function getPage(
  top: string,
  side: string,
): ComponentType | undefined {
  return APP_PAGES[top]?.[side]
}

export default AppContent
