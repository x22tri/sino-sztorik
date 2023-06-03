import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button } from '@mui/material'
import { LANDING_FIRST_SECTION_BUTTON_SIGNUP, LANDING_FIRST_SECTION_BUTTON_LOGIN } from '../shared/strings'

export function ButtonRow() {
  return (
    <Box alignItems='center' display='flex' gap={3} marginTop={8} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <SignupButton />
      <LoginButton />
    </Box>
  )
}

export function SignupButton({ color = 'white' }: { color?: 'white' | 'primary' }) {
  return (
    <Button
      fullWidth
      size='large'
      variant='contained'
      onClick={() => {}}
      endIcon={<FontAwesomeIcon icon={faArrowRight} transform='shrink-4' />}
      sx={{ borderRadius: 6 }}
      {...{ color }}
    >
      {LANDING_FIRST_SECTION_BUTTON_SIGNUP}
    </Button>
  )
}

function LoginButton() {
  return (
    <Button color='white' fullWidth size='large' variant='outlined' onClick={() => {}} sx={{ borderRadius: 6 }}>
      {LANDING_FIRST_SECTION_BUTTON_LOGIN}
    </Button>
  )
}
