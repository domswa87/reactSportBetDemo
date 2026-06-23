import type { ComponentType } from 'react'
import { AccountMyBetsPage } from '../pages/account/AccountMyBetsPage'
import { AccountProfilePage } from '../pages/account/AccountProfilePage'
import { AccountSettingsPage } from '../pages/account/AccountSettingsPage'
import { EventsGrid } from '../pages/event/EventsGrid'
import { ManageEvents } from '../pages/event/ManageEvents'
import { LiveBasketballPage } from '../pages/live/LiveBasketballPage'
import { LiveFootballPage } from '../pages/live/LiveFootballPage'
import { LiveTennisPage } from '../pages/live/LiveTennisPage'
import { CreateNewEvent } from '../pages/event/CreateNewEvent'
import { AllEventsList } from '../pages/event/AllEventsList'

// top tab → side button → page component
export const PAGE_COMPONENTS: Record<string, Record<string, ComponentType>> = {
  Events: {
    'Create event': CreateNewEvent,
    'All events': AllEventsList,
    Events: ManageEvents,
    Grid: EventsGrid,
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
