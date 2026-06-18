import { useState } from 'react'
import { PAGE_COMPONENTS } from '../components/Layout/AppContent'

function getSideItems(topItem: string): string[] {
  const pages = PAGE_COMPONENTS[topItem]
  return pages ? Object.keys(pages) : []
}

function getFirstSideItem(topItem: string) {
  return getSideItems(topItem)[0]
}

export function useMenuNavigation() {
  const topItems = Object.keys(PAGE_COMPONENTS)
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
