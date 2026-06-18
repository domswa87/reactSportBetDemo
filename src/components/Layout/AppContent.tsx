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

type AppContentProps = {
  topItem: string
  sideItem: string
}

function AppContent({ topItem, sideItem }: AppContentProps) {
  switch (topItem) 
  {
    case 'HomeDS': switch (sideItem) {
        case 'FeaturedDS': return <HomeFeaturedPage />
        case 'Popular': return <HomePopularPage />
        case 'Today': return <HomeTodayPage />} break
    case 'Live': switch (sideItem) {
        case 'Football': return <LiveFootballPage />
        case 'Basketball': return <LiveBasketballPage />
        case 'Tennis': return <LiveTennisPage />} break
    case 'Account': switch (sideItem) {
        case 'Profile': return <AccountProfilePage />
        case 'Bets': return <AccountMyBetsPage />
        case 'Settings': return <AccountSettingsPage />} break
  }

  return <PageNotFound />
}

export default AppContent
