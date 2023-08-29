import Typography, { TypographyProps } from '@mui/material/Typography'
import { SegmentStyles } from '../../shared/interfaces'
import { ReactNode } from 'react'

export function Segment({ text, typographyProps }: { text: string | ReactNode; typographyProps?: TypographyProps }) {
  return (
    <Typography component='span' flexWrap='nowrap' alignItems='baseline' {...typographyProps}>
      {text}
    </Typography>
  )
}
