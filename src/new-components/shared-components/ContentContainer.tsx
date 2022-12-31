import { ReactNode } from 'react'
import { useTheme } from '@mui/material'
import Container from '@mui/material/Container'

export function ContentContainer({ children }: { children: ReactNode }) {
  const { constants } = useTheme()

  return (
    <Container
      component='main'
      maxWidth='lg'
      sx={{
        display: 'flex',
        position: 'relative',
        // // justifyContent: 'space-between',
        // height: `calc(100% - ${constants.toolbarHeight})`,
      }}
    >
      {children}
    </Container>
  )
}
