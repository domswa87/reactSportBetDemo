import { useState } from 'react'
import { MobileShell } from './components/Layout/MobileShell'
import { SideMenu } from './components/Layout/SideMenu'
import { TopMenu } from './components/Layout/TopMenu'
import {
  getSideMenuItems,
  TOP_MENU_ITEMS,
} from './components/Layout/menuConfig'
import AppContent from './components/Layout/AppContent'

function App() {
  const [activeTopItem, setActiveTopItem] = useState<string>(TOP_MENU_ITEMS[0])
  const [activeSideItem, setActiveSideItem] = useState(
    getSideMenuItems(TOP_MENU_ITEMS[0])[0],
  )

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
