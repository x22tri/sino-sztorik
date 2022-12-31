import { Theme, useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Segment as SegmentType } from '../../shared/interfaces'
import { useStoryHorizontalPadding } from '../useStoryHorizontalPadding'
import { SegmentResolver } from './SegmentResolver'

export function NoteElement({
  color,
  text,
  title,
}: {
  color: string
  text: string | SegmentType[]
  title: string
}) {
  const px = useStoryHorizontalPadding()

  const mx = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('md'))
    ? 0
    : -1

  return (
    <Box
      display='flex'
      flexDirection='column'
      sx={{
        background: color,
        borderRadius: '0 16px',
        py: 2,
        px,
        mx,
      }}
    >
      <Box typography='h6'>{title}</Box>

      <Box typography='body2'>
        {typeof text === 'string' ? (
          <>{text}</>
        ) : (
          <SegmentResolver segments={text} />
        )}
      </Box>
    </Box>
  )
}
