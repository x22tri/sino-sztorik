import { Typography } from '@mui/material'

export function TierHeading({ tier }: { tier: number }) {
  return (
    <Typography alignItems='center' display='flex' variant='h6' fontWeight='bold'>
      {tier}. kör
    </Typography>
  )
}
