import Typography from '@mui/material/Typography'
import type { TopMenuItem } from './menuConfig'
import { PAGE_REGISTRY } from './pageRegistry'

type AppContentProps = {
  activeTopItem: TopMenuItem
  activeSideItem: string
}

function AppContent({ activeTopItem, activeSideItem }: AppContentProps) {
  const pagesForTop = PAGE_REGISTRY[activeTopItem]
  const PageComponent = pagesForTop[activeSideItem]

  if (!PageComponent) {
    return <MissingPage />
  }

  return <PageComponent />
}

function MissingPage() {
  return (
    <Typography color="error">
      Page not found. Add it to PAGE_REGISTRY in src/pages/pageRegistry.ts.
    </Typography>
  )
}

export default AppContent
