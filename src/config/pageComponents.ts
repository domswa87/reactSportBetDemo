import type { ComponentType } from 'react'
import { AccountMyBetsPage } from '../pages/account/AccountMyBetsPage'
import { AccountProfilePage } from '../pages/account/AccountProfilePage'
import { AccountSettingsPage } from '../pages/account/AccountSettingsPage'
import { CreateNewBet } from '../pages/bet/CreateNewBet'
import { EventsGrid } from '../pages/bet/EventsGrid'
import { ManageEvents } from '../pages/bet/ManageEvents'
import { HomePopularPage } from '../pages/bet/HomePopularPage'
import { HomeTodayPage } from '../pages/bet/HomeTodayPage'
import { LiveBasketballPage } from '../pages/live/LiveBasketballPage'
import { LiveFootballPage } from '../pages/live/LiveFootballPage'
import { LiveTennisPage } from '../pages/live/LiveTennisPage'

// top tab → side button → page component
export const PAGE_COMPONENTS: Record<string, Record<string, ComponentType>> = {
  Bet: {
    'New bet': CreateNewBet,
    Events: ManageEvents,
    Grid: EventsGrid,
    PleaceBet: HomePopularPage,
    AddResult: HomeTodayPage,
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
