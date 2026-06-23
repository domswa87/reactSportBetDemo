import Stack from '@mui/material/Stack'
import { AppButton } from '../ui/AppButton'

type SideMenuProps = {
  items: string[]
  activeItem: string
  onSelect: (item: string) => void
}

export function SideMenu({ items, activeItem, onSelect }: SideMenuProps) {
  return (
    <Stack
      component="nav"
      spacing={1}
      sx={{
        flexShrink: 0,
        p: 1,
        width: 'fit-content',
        alignItems: 'flex-start',
        borderRight: 1,
        borderColor: 'divider',
        bgcolor: 'grey.50',
      }}
    >
      {items.map((item) => (
        <AppButton
          key={item}
          isActive={activeItem === item}
          onClick={() => onSelect(item)}
          sx={{
            width: 72,
            minWidth: 72,
            maxWidth: 72,
            minHeight: 52,
            px: 0.5,
            py: 0.75,
            fontSize: '1 rem',
            lineHeight: 1.2,
            whiteSpace: 'normal',
            textAlign: 'center',
          }}
        >
          {item}
        </AppButton>
      ))}
    </Stack>
  )
}
