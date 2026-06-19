import MuiButton from '@mui/material/Button'
import type { ButtonProps } from '@mui/material/Button'

type AppButtonProps = ButtonProps & {
  isActive?: boolean
}

export function AppButton({
  isActive = false,
  sx,
  children,
  ...props
}: AppButtonProps) {
  return (
    <MuiButton
      variant={isActive ? 'contained' : 'outlined'}
      sx={{
        flexShrink: 0,
        minWidth: 88,
        minHeight: 44,
        textTransform: 'none',
        ...sx,
      }}
      {...props}    
    >
      {children}
    </MuiButton>
  )
}
