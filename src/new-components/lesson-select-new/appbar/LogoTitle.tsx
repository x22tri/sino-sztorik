import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { APP_TITLE } from '../../shared/strings'

export default function LogoTitle() {
  const logoImage = require(`../../../assets/logo.png`)

  return (
    <Box alignItems='center' display='flex' gap={1}>
      <img src={logoImage} alt='Logó' width='auto' height='28px' />

      <Typography className='disable-select' color='primary.main' component='a' href='/' variant='logo'>
        {APP_TITLE}
      </Typography>
    </Box>
  )
}
