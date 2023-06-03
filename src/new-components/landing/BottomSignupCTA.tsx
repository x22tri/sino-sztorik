import { Box, BoxProps, Typography } from '@mui/material'
import { SignupButton } from './ButtonRow'
import { LANDING_BOTTOM_SIGNUP_CTA, LANDING_COPYRIGHT } from '../shared/strings'

export function BottomSignupCTA({ parentProps }: { parentProps: BoxProps }) {
  return (
    <Box paddingX={3} {...parentProps}>
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
          {LANDING_BOTTOM_SIGNUP_CTA}
        </Typography>

        <Box flexBasis={{ xs: undefined, md: '20ch' }} width={1}>
          <SignupButton color='primary' />
        </Box>
      </Box>

      <Box justifyContent='center' textAlign='center' color='text.disabled' marginBottom={2}>
        {LANDING_COPYRIGHT} {new Date().getFullYear()}
      </Box>
    </Box>
  )
}
