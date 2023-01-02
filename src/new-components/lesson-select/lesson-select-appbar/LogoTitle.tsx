import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Display } from '../../shared/utility-components'

export default function LogoTitle({ noLogo = false }: { noLogo?: boolean }) {
  const logoImage = require(`../../../assets/logo.png`)

  return (
    <Box
      flexGrow={noLogo ? 1 : 0}
      sx={{ display: 'flex', mr: 1, alignItems: 'center' }}
    >
      <Display if={!noLogo}>
        <img src={logoImage} alt='Logó' width='auto' height='28px' />
      </Display>

      <Typography
        className='disable-select'
        variant='h4'
        noWrap
        component='a'
        href='/'
        sx={{ ml: 1.5, color: 'primary.contrastText', textDecoration: 'none' }}
      >
        Sino-sztorik
      </Typography>
    </Box>
  )
}
