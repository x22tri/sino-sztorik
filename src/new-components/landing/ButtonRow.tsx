import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button } from '@mui/material'
import useTranslation from '../shared/localization/useTranslation'

export function ButtonRow() {
  return (
    <Box alignItems='center' display='flex' gap={3} marginTop={8} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <SignupButton />
      <LoginButton />
    </Box>
  )
}

export function SignupButton({ color = 'white' }: { color?: 'white' | 'primary' }) {
  const strings = useTranslation()

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
      {strings.landing.buttons.signup}
    </Button>
  )
}

function LoginButton() {
  const strings = useTranslation()

  return (
    <Button color='white' fullWidth size='large' variant='outlined' onClick={() => {}} sx={{ borderRadius: 6 }}>
      {strings.landing.buttons.login}
    </Button>
  )
}
