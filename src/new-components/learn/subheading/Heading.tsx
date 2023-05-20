import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function Heading({ title }: { title: string }) {
  return (
    <Typography variant='h5' fontWeight={700} marginY={3}>
      {title}
    </Typography>
  )
}
