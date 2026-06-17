import type { ComponentType } from 'react'
import { AccountMyBetsPage } from './account/AccountMyBetsPage'
import { AccountProfilePage } from './account/AccountProfilePage'
import { AccountSettingsPage } from './account/AccountSettingsPage'
import { HomeFeaturedPage } from './home/HomeFeaturedPage'
import { HomePopularPage } from './home/HomePopularPage'
import { HomeTodayPage } from './home/HomeTodayPage'
import { LiveBasketballPage } from './live/LiveBasketballPage'
import { LiveFootballPage } from './live/LiveFootballPage'
import { LiveTennisPage } from './live/LiveTennisPage'

// Simple type: top tab → side button → page component
type PageMap = Record<string, Record<string, ComponentType>>

// Which page to show for each top + side button combination.
export const PAGE_REGISTRY: PageMap = {
  Home: {
    Featured: HomeFeaturedPage,
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
    'My Bets': AccountMyBetsPage,
    Settings: AccountSettingsPage,
  },
}
