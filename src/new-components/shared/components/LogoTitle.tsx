import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { APP_TITLE } from '../strings'
import { Unless } from 'react-if'

export default function LogoTitle({ noTitle = false }: { noTitle?: boolean }) {
  const logoImage = require(`../../../assets/logo.png`)

  return (
    <Box alignItems='center' display='flex' gap={1}>
      <img src={logoImage} alt='Logó' width='auto' height='28px' />

      <Unless condition={noTitle}>
        <Typography className='disable-select' color='primary.main' variant='h4' sx={{ textDecoration: 'none' }}>
          {APP_TITLE}
        </Typography>
      </Unless>
    </Box>
  )
}
