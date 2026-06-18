import { getPage } from '../../utils/getPage'
import PageNotFound from '../../pages/PageNotFound'

type AppContentProps = {
  topItem: string
  sideItem: string
}

function AppContent({ topItem, sideItem }: AppContentProps) {
  const ActivePage = getPage(topItem, sideItem)

  if (!ActivePage) {
    return <PageNotFound />
  }

  return <ActivePage />
}

export default AppContent
