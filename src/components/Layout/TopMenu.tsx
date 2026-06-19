import Stack from '@mui/material/Stack'
import { AppButton } from '../ui/AppButton'

type TopMenuProps = {
  items: string[]
  activeItem: string
  onSelect: (item: string) => void
}

export function TopMenu({ items, activeItem, onSelect }: TopMenuProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        p: 1,
        borderBottom: 1,
        borderColor: 'divider',
        overflowX: 'auto',
      }}
    >
      {items.map((item) => (
        <AppButton
          key={item}
          isActive={activeItem === item}
          onClick={() => onSelect(item)}
        >
          {item}
        </AppButton>
      ))}
    </Stack>
  )
}
