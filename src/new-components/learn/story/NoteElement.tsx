import Box from '@mui/material/Box'
import { Segment as SegmentType } from '../../shared/interfaces'
import { SegmentResolver } from './SegmentResolver'
import { useSmallScreen } from '../../shared/utility-functions'

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
        px: useSmallScreen() ? 1 : 2,
        mx: useSmallScreen() ? 0 : -1,
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
