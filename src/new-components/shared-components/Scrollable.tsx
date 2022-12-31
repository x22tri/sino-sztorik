import { ReactNode } from 'react'
import Box from '@mui/material/Box'

function Scrollable({ children }: { children: ReactNode }) {
  return (
    <Box display='flex' minWidth={0} sx={{ overflowY: 'scroll' }}>
      {children}
    </Box>
  )
}
