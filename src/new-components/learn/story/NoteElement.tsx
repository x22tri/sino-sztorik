import Box from '@mui/material/Box'
import { Segment as SegmentType } from '../../shared/interfaces'
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
  return (
    <Box
      display='flex'
      flexDirection='column'
      sx={{
        background: color,
        borderRadius: '0 16px',
        py: 2,
        px: 1,
        mx: -1,
      }}
    >
      <Box typography='storySegments.specialParagraphHeading'>{title}</Box>

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
