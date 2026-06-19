import { PAGE_COMPONENTS } from '../../config/pageComponents'
import PageNotFound from '../../pages/PageNotFound'

type PageViewProps = {
  topItem: string
  sideItem: string
}

function PageView({ topItem, sideItem }: PageViewProps) {
  const Component = PAGE_COMPONENTS[topItem]?.[sideItem] ?? PageNotFound

  return <Component />
}

export default PageView
