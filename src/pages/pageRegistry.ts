import type { ComponentType } from 'react'
import type { MENU_CONFIG, TopMenuItem } from '../components/Layout/menuConfig'
import { AccountMyBetsPage } from '../pages/account/AccountMyBetsPage'
import { AccountProfilePage } from './account/AccountProfilePage'
import { AccountSettingsPage } from '../pages/account/AccountSettingsPage'
import { HomeFeaturedPage } from '../pages/home/HomeFeaturedPage'
import { HomePopularPage } from '../pages/home/HomePopularPage'
import { HomeTodayPage } from '../pages/home/HomeTodayPage'
import { LiveBasketballPage } from '../pages/live/LiveBasketballPage'
import { LiveFootballPage } from '../pages/live/LiveFootballPage'
import { LiveTennisPage } from '../pages/live/LiveTennisPage'

// Nested lookup: top tab first, then side item.
// Duplicate side labels (e.g. "Today" under Home and Live) are fine —
// they live under different top keys.
export const PAGE_REGISTRY: {
  [K in TopMenuItem]: Record<(typeof MENU_CONFIG)[K][number], ComponentType>
} = {
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
