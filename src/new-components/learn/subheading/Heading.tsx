import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function Heading({ endContent, title }: { endContent?: ReactNode; title: string }) {
  return (
    <Box display='flex' justifyContent='space-between' alignItems='center' marginY={3}>
      <Typography variant='h5' fontWeight={700}>
        {title}
      </Typography>
      {endContent}
    </Box>
  )
}
