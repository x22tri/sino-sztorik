import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export function NextStep({ link, text }: { link: string; text: string }) {
  return (
    <Box alignItems='center' display='flex' gap={1} mt={6}>
      <Typography color='text.secondary' variant='body2'>
        Következő lépés:
      </Typography>
      <Button
        component={Link}
        endIcon={<FontAwesomeIcon icon={faArrowRight} transform='shrink-4' />}
        to={link}
        sx={{ width: 'max-content' }}
      >
        {text}
      </Button>
    </Box>
  )
}
