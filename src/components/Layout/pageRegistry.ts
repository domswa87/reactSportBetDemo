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
