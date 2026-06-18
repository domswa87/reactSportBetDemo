import { MobileShell } from './components/Layout/MobileShell'
import { SideMenu } from './components/Layout/SideMenu'
import { TopMenu } from './components/Layout/TopMenu'
import AppContent from './components/Layout/AppContent'
import { useMenuNavigation } from './hooks/useMenuNavigation'

function App() {

  const {
    activeTopItem,
    activeSideItem,
    topItems,
    sideItems,
    handleTopSelect,
    handleSideSelect,
  } = useMenuNavigation()

  const topMenu = (
    <TopMenu
      items={topItems}
      activeItem={activeTopItem}
      onSelect={handleTopSelect}
    />
  )
  const sideMenu = (
    <SideMenu
      items={sideItems}
      activeItem={activeSideItem}
      onSelect={handleSideSelect}
    />
  )

  return (
    <MobileShell topMenu={topMenu} sideMenu={sideMenu}>
      <AppContent topItem={activeTopItem} sideItem={activeSideItem} />
    </MobileShell>
  )
}

export default App
