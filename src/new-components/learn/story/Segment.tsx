import Typography from '@mui/material/Typography'
import { SegmentStyles } from '../../shared/interfaces'
import { ReactNode } from 'react'

export function Segment({ styles, text }: { styles: SegmentStyles; text: string | ReactNode }) {
  return (
    <Typography component='span' sx={styles.fontStyle}>
      {text}
    </Typography>
  )
}
