import type { ComponentType } from 'react'
import { APP_PAGES } from '../config/menuConfig'

export function getPage(
  topItem: string,
  sideItem: string,
): ComponentType | undefined {
  return APP_PAGES[topItem]?.[sideItem]
}
