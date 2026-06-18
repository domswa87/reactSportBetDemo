import { APP_PAGES } from '../../config/menuConfig'


export function getSideMenuItems(top: string): string[] {
  return Object.keys(APP_PAGES[top])
}
