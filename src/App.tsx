import { useState } from 'react'
import Typography from '@mui/material/Typography'
import { MobileShell } from './components/MobileShell'
import { SideMenu, type SideMenuItem } from './components/SideMenu'
import { TopMenu, type TopMenuItem } from './components/TopMenu'

function App() {
  // useState keeps data that can change over time (like which button is selected).
  const [activeTopItem, setActiveTopItem] = useState<TopMenuItem>('Home')
  const [activeSideItem, setActiveSideItem] = useState<SideMenuItem>('Football')


  const mainScreen = (
    <>
      <Typography variant="h6" gutterBottom>
        {activeTopItem}
      </Typography>
      <Typography color="text.secondary">
        Selected sport: {activeSideItem}
      </Typography>
    </>
  )


  return (
    <MobileShell
      topMenu={
        <TopMenu activeItem={activeTopItem} onSelect={setActiveTopItem} />
      }
      sideMenu={
        <SideMenu activeItem={activeSideItem} onSelect={setActiveSideItem} />
      }
    >
      {mainScreen}
    </MobileShell>
  )
}

export default App
