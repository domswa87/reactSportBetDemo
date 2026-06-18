import { useState } from 'react'
import { MobileShell } from './components/Layout/MobileShell'
import { SideMenu } from './components/Layout/SideMenu'
import { TopMenu } from './components/Layout/TopMenu'
import { getSideMenuItems, } from './components/Layout/menuUtils'
import AppContent from './components/Layout/AppContent'
import { APP_PAGES } from './config/menuConfig'



function App() {

const initialTopItem = Object.keys(APP_PAGES)[0];
const initialSideItem = getSideMenuItems(initialTopItem)[0];

const [activeTopItem, setActiveTopItem] = useState(initialTopItem);
const [activeSideItem, setActiveSideItem] = useState(initialSideItem);

  const sideItems = getSideMenuItems(activeTopItem)

  function handleTopSelect(item: string) {
    setActiveTopItem(item)
    setActiveSideItem(getSideMenuItems(item)[0])
  }

  const topMenu = <TopMenu activeItem={activeTopItem} onSelect={handleTopSelect} />
  const sideMenu = (
    <SideMenu
      items={sideItems}
      activeItem={activeSideItem}
      onSelect={setActiveSideItem}
    />
  )

  return (
    <MobileShell topMenu={topMenu} sideMenu={sideMenu}>
      <AppContent activeTopItem={activeTopItem} activeSideItem={activeSideItem} />
    </MobileShell>
  )
}

export default App
