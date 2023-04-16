import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Unless } from 'react-if'

export default function LogoTitle({ noLogo = false }: { noLogo?: boolean }) {
  const logoImage = require(`../../../assets/logo-green.svgz`)

  return (
    <Box alignItems='center' display='flex'>
      <Unless condition={noLogo}>
        <img src={logoImage} alt='Logó' width='auto' height='28px' />
      </Unless>

      <Typography
        className='disable-select'
        component='a'
        href='/'
        marginLeft={1}
        noWrap
        variant='h4'
        sx={{ color: 'primary.main', textDecoration: 'none' }}
      >
        Sino-sztorik
      </Typography>
    </Box>
  )
}
