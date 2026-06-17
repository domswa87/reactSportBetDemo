import { useState } from 'react'
import { MobileShell } from './components/Layout/MobileShell'
import { SideMenu } from './components/Layout/SideMenu'
import { TopMenu } from './components/Layout/TopMenu'
import { MENU_CONFIG, TOP_MENU_ITEMS, type TopMenuItem } from './components/Layout/menuConfig'
import AppContent from './components/Layout/AppContent'
      
function App() {
  const [activeTopItem, setActiveTopItem] = useState<TopMenuItem>(TOP_MENU_ITEMS[0])
  const [activeSideItem, setActiveSideItem] = useState<string>(
    MENU_CONFIG[TOP_MENU_ITEMS[0]][0],
  )

  const sideItems = MENU_CONFIG[activeTopItem]

  function handleTopSelect(item: TopMenuItem) {
    setActiveTopItem(item)
    setActiveSideItem(MENU_CONFIG[item][0])
  }

  const topMenu = <TopMenu activeItem={activeTopItem} onSelect={handleTopSelect} />
  const sideMenu = <SideMenu items={sideItems} activeItem={activeSideItem} onSelect={setActiveSideItem} />


  return (
    <MobileShell topMenu={topMenu} sideMenu={sideMenu} >
      <AppContent activeTopItem={activeTopItem} activeSideItem={activeSideItem} />
    </MobileShell>
  )
}

export default App
