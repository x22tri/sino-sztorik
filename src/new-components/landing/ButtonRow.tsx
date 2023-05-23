import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button } from '@mui/material'

export function ButtonRow() {
  return (
    <Box display='flex' gap={3} marginTop={8} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <SignupButton />
      <LoginButton />
    </Box>
  )
}

function SignupButton() {
  return (
    <Button
      color='white'
      size='large'
      variant='contained'
      onClick={() => {}}
      endIcon={<FontAwesomeIcon icon={faArrowRight} transform='shrink-4' />}
      sx={{ borderRadius: 6 }}
    >
      Kezdés
    </Button>
  )
}

function LoginButton() {
  return (
    <Button color='white' size='large' variant='outlined' onClick={() => {}} sx={{ borderRadius: 6 }}>
      Már van fiókom
    </Button>
  )
}
