import { useState } from 'react'
import { APP_PAGES } from '../config/menuConfig'

function getSideItems(topItem: string): string[] {
  return Object.keys(APP_PAGES[topItem])
}

function getFirstSideItem(topItem: string) {
  return getSideItems(topItem)[0]
}

export function useMenuNavigation() {
  const topItems = Object.keys(APP_PAGES)
  const initialTopItem = topItems[0]
  const initialSideItem = getFirstSideItem(initialTopItem)

  const [activeTopItem, setActiveTopItem] = useState(initialTopItem)
  const [activeSideItem, setActiveSideItem] = useState(initialSideItem)

  const sideItems = getSideItems(activeTopItem)

  function handleTopSelect(item: string) {
    setActiveTopItem(item)
    setActiveSideItem(getFirstSideItem(item))
  }

  return {
    activeTopItem,
    activeSideItem,
    sideItems,
    handleTopSelect,
    setActiveSideItem,
  }
}
