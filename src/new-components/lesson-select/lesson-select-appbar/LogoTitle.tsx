import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Display } from '../../shared/utility-components'

export default function LogoTitle({ noLogo = false }: { noLogo?: boolean }) {
  const logoImage = require(`../../../assets/logo.png`)

  return (
    <Box
      alignItems='center'
      display='flex'
      flexGrow={noLogo ? 1 : 0}
      marginRight={1}
    >
      <Display if={!noLogo}>
        <img src={logoImage} alt='Logó' width='auto' height='28px' />
      </Display>

      <Typography
        className='disable-select'
        component='a'
        href='/'
        noWrap
        marginLeft={1.5}
        variant='h4'
        sx={{ color: 'primary.contrastText', textDecoration: 'none' }}
      >
        Sino-sztorik
      </Typography>
    </Box>
  )
}
