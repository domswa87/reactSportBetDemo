import { useState } from 'react'
import Typography from '@mui/material/Typography'
import { MobileShell } from './components/MobileShell'
import { SideMenu } from './components/SideMenu'
import { TopMenu, type TopMenuItem } from './components/TopMenu'

// Each top tab gets its own list of side buttons.
const SIDE_MENU_BY_TOP = {
  Home: ['Featured', 'Popular', 'Today'],
  Live: ['Football', 'Basketball', 'Tennis'],
  Account: ['Profile', 'My Bets', 'Settings'],
} as const satisfies Record<TopMenuItem, readonly string[]>

function App() {
  const [activeTopItem, setActiveTopItem] = useState<TopMenuItem>('Home')
  const [activeSideItem, setActiveSideItem] = useState<string>(
    SIDE_MENU_BY_TOP.Home[0],
  )

  const sideItems = SIDE_MENU_BY_TOP[activeTopItem]

  function handleTopSelect(item: TopMenuItem) {
    setActiveTopItem(item)
    // When the top tab changes, pick the first side button for that tab.
    setActiveSideItem(SIDE_MENU_BY_TOP[item][0])
  }

  return (
    <MobileShell
      topMenu={
        <TopMenu activeItem={activeTopItem} onSelect={handleTopSelect} />
      }
      sideMenu={
        <SideMenu
          items={sideItems}
          activeItem={activeSideItem}
          onSelect={setActiveSideItem}
        />
      }
    >
      <Typography variant="h6" gutterBottom>
        {activeTopItem}
      </Typography>
      <Typography color="text.secondary">
        {activeSideItem}
      </Typography>
    </MobileShell>
  )
}

export default App
