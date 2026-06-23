import type { ComponentType } from 'react'
import { AccountMyBetsPage } from '../pages/account/AccountMyBetsPage'
import { AccountProfilePage } from '../pages/account/AccountProfilePage'
import { AccountSettingsPage } from '../pages/account/AccountSettingsPage'
import { EventsGrid } from '../pages/bet/EventsGrid'
import { ManageEvents } from '../pages/bet/ManageEvents'
import { HomePopularPage } from '../pages/bet/HomePopularPage'
import { HomeTodayPage } from '../pages/bet/HomeTodayPage'
import { LiveBasketballPage } from '../pages/live/LiveBasketballPage'
import { LiveFootballPage } from '../pages/live/LiveFootballPage'
import { LiveTennisPage } from '../pages/live/LiveTennisPage'
import { CreateNewEvent } from '../pages/bet/CreateNewEvent'

// top tab → side button → page component
export const PAGE_COMPONENTS: Record<string, Record<string, ComponentType>> = {
  Events: {
    'Create event': CreateNewEvent,
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
