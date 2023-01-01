import { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { Display } from '../../shared/utility-components'

export function Subheading({
  endContent,
  followedBySmall = false,
  isFirst = false,
  small = false,
  title,
}: {
  endContent?: ReactNode
  followedBySmall?: boolean
  isFirst?: boolean
  small?: boolean
  title: string
}) {
  return (
    <Box
      marginBottom={small || followedBySmall ? 1 : 4}
      marginTop={isFirst ? 1 : 5}
    >
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography
          variant='h6'
          fontWeight={700}
          fontSize={small ? '90% !important' : '100%'}
        >
          {title}
        </Typography>
        {endContent}
      </Box>

      <Display if={!small}>
        <Divider />
      </Display>
    </Box>
  )
}
