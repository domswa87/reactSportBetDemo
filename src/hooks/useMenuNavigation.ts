import { useState } from 'react'
import { MENU_CONFIG } from '../components/Layout/AppContent'
function getSideItems(topItem: string): string[] {
  const items = MENU_CONFIG[topItem as keyof typeof MENU_CONFIG]
  return items ? [...items] : []
}

function getFirstSideItem(topItem: string) {
  return getSideItems(topItem)[0]
}

export function useMenuNavigation() {
  const topItems = Object.keys(MENU_CONFIG)
  const initialTopItem = topItems[0]
  const initialSideItem = getFirstSideItem(initialTopItem)

  const [activeTopItem, setActiveTopItem] = useState(initialTopItem)
  const [activeSideItem, setActiveSideItem] = useState(initialSideItem)

  const sideItems = getSideItems(activeTopItem)

  function handleTopSelect(item: string) {
    setActiveTopItem(item)
    setActiveSideItem(getFirstSideItem(item))
  }

  function handleSideSelect(item: string) {
    setActiveSideItem(item)
  }

  return {
    activeTopItem,
    activeSideItem,
    topItems,
    sideItems,
    handleTopSelect,
    handleSideSelect,
  }
}
