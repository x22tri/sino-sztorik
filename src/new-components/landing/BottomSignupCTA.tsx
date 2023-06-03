import { Box, BoxProps, Typography } from '@mui/material'
import { SignupButton } from './ButtonRow'

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
          Vágj bele!
        </Typography>

        <Box flexBasis='20ch'>
          <SignupButton color='primary' />
        </Box>
      </Box>

      <Box justifyContent='center' textAlign='center' color='text.disabled' marginBottom={2}>
        © Dió Dávid {new Date().getFullYear()}
      </Box>
    </Box>
  )
}
