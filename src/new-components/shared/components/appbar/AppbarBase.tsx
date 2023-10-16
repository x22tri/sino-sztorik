import { AppBar, Toolbar, useTheme } from '@mui/material'
import { ReactNode } from 'react'

export function AppbarBase({ children }: { children: ReactNode }) {
  const { constants, palette } = useTheme()

  return (
    <>
      <AppBar elevation={0} sx={{ bgcolor: 'background.default', borderBottom: `1px solid ${palette.grey[300]}` }}>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            m: 'auto',
            maxWidth: constants.maxContentWidth,
            px: { xs: 1, sm: 2 },
            width: 1,
          }}
        >
          {children}
        </Toolbar>
      </AppBar>

      <Toolbar />
    </>
  )
}
