import Box from '@mui/material/Box'
import type { ReactNode } from 'react'

type MobileShellProps = {
  topMenu: ReactNode
  sideMenu: ReactNode
  children: ReactNode
}

// This component only handles layout — it does not know about betting logic.
export function MobileShell({ topMenu, sideMenu, children }: MobileShellProps) {
  return (
    <Box
      sx={{
        // Mobile-first: full width on a real phone.
        width: '100%',
        maxWidth: 430,
        minHeight: '100vh',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        // On desktop, show a subtle frame so it feels like a phone preview.
        boxShadow: { xs: 'none', sm: 3 },
      }}
    >
      {topMenu}

      <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {sideMenu}
        <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
