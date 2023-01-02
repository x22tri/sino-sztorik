import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Logo({
  display,
  flexGrow,
}: {
  display: { xs: 'none' | 'flex'; md: 'none' | 'flex' }
  flexGrow: number
}) {
  const { palette } = useTheme()

  const logoImage = require(`../../../assets/logo.png`)

  return (
    <Box {...{ flexGrow }} sx={{ display, mr: 1, alignItems: 'center' }}>
      <img src={logoImage} alt='Logó' width='auto' height='28px' />

      <Typography
        className='disable-select'
        variant='h4'
        noWrap
        component='a'
        href='/'
        sx={{
          ml: 1.5,
          color: palette.primary.contrastText,
          textDecoration: 'none',
        }}
      >
        Sino-sztorik
      </Typography>
    </Box>
  )
}
