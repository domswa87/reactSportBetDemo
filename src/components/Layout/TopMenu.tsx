import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { MENU_CONFIG } from '../../config/menuConfig'

type TopMenuProps = {
  activeItem: string
  onSelect: (item: string) => void
}

// Step 2: A React component is a function that returns UI.
// Props are inputs passed from the parent (App).
export function TopMenu({ activeItem, onSelect }: TopMenuProps) {

  const topMenuItems = Object.keys(MENU_CONFIG)

  return (
    // Stack lays children in a row or column with spacing between them.
    <Stack
      direction="row"
      spacing={1}
      sx={{
        p: 1,
        borderBottom: 1,
        borderColor: 'divider',
        // On small screens, allow horizontal scroll instead of squishing buttons.
        overflowX: 'auto',
      }}
    >
      {topMenuItems.map((item) => (
        <Button
          key={item}
          variant={activeItem === item ? 'contained' : 'outlined'}
          onClick={() => onSelect(item)}
          sx={{ flexShrink: 0, minWidth: 88 }}
        >
          {item}
        </Button>
      ))}
    </Stack>
  )
}
