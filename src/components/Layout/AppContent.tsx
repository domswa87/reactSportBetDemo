import type { ComponentType } from 'react'
import { AccountMyBetsPage } from '../../pages/account/AccountMyBetsPage'
import { AccountProfilePage } from '../../pages/account/AccountProfilePage'
import { AccountSettingsPage } from '../../pages/account/AccountSettingsPage'
import { HomeFeaturedPage } from '../../pages/home/HomeFeaturedPage'
import { HomePopularPage } from '../../pages/home/HomePopularPage'
import { HomeTodayPage } from '../../pages/home/HomeTodayPage'
import { LiveBasketballPage } from '../../pages/live/LiveBasketballPage'
import { LiveFootballPage } from '../../pages/live/LiveFootballPage'
import { LiveTennisPage } from '../../pages/live/LiveTennisPage'
import PageNotFound from '../../pages/PageNotFound'

export const PAGE_COMPONENTS: Record<string, Record<string, ComponentType>> = {
  HomeDS: {
    FeaturedDS: HomeFeaturedPage,
    Popular: HomePopularPage,
    Today: HomeTodayPage,
  },
  Live: {
    Football: LiveFootballPage,
    Basketball: LiveBasketballPage,
    Tennis: LiveTennisPage,
  },
  Account: {
    Profile: AccountProfilePage,
    Bets: AccountMyBetsPage,
    Settings: AccountSettingsPage,
  },
}

type AppContentProps = {
  topItem: string
  sideItem: string
}

function AppContent({ topItem, sideItem }: AppContentProps) {
  const Component = PAGE_COMPONENTS[topItem]?.[sideItem] ?? PageNotFound
  return <Component />
}

export default AppContent
