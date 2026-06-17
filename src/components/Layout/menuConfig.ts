// Single source of truth: top tab name → its side buttons.
// Add a new top tab here only — TopMenu and App read from this file.
export const MENU_CONFIG = {
  Home: ['Featured', 'Popular', 'Today'],
  Live: ['Football', 'Basketball', 'Tennis'],
  Account: ['Profile', 'My Bets', 'Settings'],
} as const

export type TopMenuItem = keyof typeof MENU_CONFIG

// Top menu labels are the object keys — no duplicate strings.
export const TOP_MENU_ITEMS = Object.keys(MENU_CONFIG) as TopMenuItem[]
