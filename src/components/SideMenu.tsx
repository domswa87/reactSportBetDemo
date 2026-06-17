import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

const SIDE_MENU_ITEMS = ['Football', 'Basketball', 'Tennis', 'Hockey'] as const

type SideMenuItem = (typeof SIDE_MENU_ITEMS)[number]

type SideMenuProps = {
  activeItem: SideMenuItem
  onSelect: (item: SideMenuItem) => void
}

export function SideMenu({ activeItem, onSelect }: SideMenuProps) {
  return (
    <Stack
      component="nav"
      spacing={1}
      sx={{
        width: 96,
        flexShrink: 0,
        p: 1,
        borderRight: 1,
        borderColor: 'divider',
        bgcolor: 'grey.50',
      }}
    >
      {SIDE_MENU_ITEMS.map((item) => (
        <Button
          key={item}
          fullWidth
          variant={activeItem === item ? 'contained' : 'text'}
          onClick={() => onSelect(item)}
          sx={{
            justifyContent: 'flex-start',
            px: 1,
            fontSize: '0.75rem',
            lineHeight: 1.2,
            whiteSpace: 'normal',
            textAlign: 'left',
          }}
        >
          {item}
        </Button>
      ))}
    </Stack>
  )
}

export type { SideMenuItem }
