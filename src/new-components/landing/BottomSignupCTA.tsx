import { Box, BoxProps, Typography } from '@mui/material'
import { SignupButton } from './ButtonRow'
import useTranslation from '../shared/localization/useTranslation'

export function BottomSignupCTA() {
  const strings = useTranslation()

  return (
    <Box paddingX={3} margin='auto' maxWidth={({ constants }) => constants.maxContentWidth} width={1}>
      <Box
        display='flex'
        flexDirection={{ xs: 'column', md: 'row' }}
        rowGap={5}
        columnGap={10}
        paddingY={15}
        alignItems='center'
        justifyContent='center'
      >
        <Typography variant='h3' fontWeight='bold'>
          {strings.landing.bottomCTA}
        </Typography>

        <Box flexBasis={{ xs: undefined, md: '20ch' }} width={1}>
          <SignupButton color='primary' />
        </Box>
      </Box>

      <Box justifyContent='center' textAlign='center' color='text.disabled' marginBottom={2}>
        {strings.landing.copyright} {new Date().getFullYear()}
      </Box>
    </Box>
  )
}
