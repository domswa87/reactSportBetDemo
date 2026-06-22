import { MobileShell } from './components/Layout/MobileShell'
import { SideMenu } from './components/Layout/SideMenu'
import { TopMenu } from './components/Layout/TopMenu'
import PageView from './components/Layout/PageView'
import { EventsProvider } from './context/EventsContext'
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
    <EventsProvider>
      <MobileShell topMenu={topMenu} sideMenu={sideMenu}>
        <PageView topItem={activeTopItem} sideItem={activeSideItem} />
      </MobileShell>
    </EventsProvider>
  )
}

export default App
