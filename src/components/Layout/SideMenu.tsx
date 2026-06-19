import Stack from '@mui/material/Stack'
import { AppButton } from '../ui/AppButton'

type SideMenuProps = {
  items: readonly string[]
  activeItem: string
  onSelect: (item: string) => void
}

export function SideMenu({ items, activeItem, onSelect }: SideMenuProps) {
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
      {items.map((item) => (
        <AppButton
          key={item}
          fullWidth
          isActive={activeItem === item}
          onClick={() => onSelect(item)}
          sx={{
            justifyContent: 'flex-start',
            fontSize: '0.75rem',
            lineHeight: 1.2,
            whiteSpace: 'normal',
            textAlign: 'left',
          }}
        >
          {item}
        </AppButton>
      ))}
    </Stack>
  )
}
