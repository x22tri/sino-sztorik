import Box from '@mui/material/Box'
import { Segment as SegmentType } from '../../shared/interfaces'
import { SegmentResolver } from './SegmentResolver'
import { useTheme } from '@mui/material'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function NoteElement({
  backgroundColor,
  icon,
  text,
  textColor,
  title,
}: {
  backgroundColor: string
  icon: IconDefinition
  text: string | SegmentType[]
  textColor: string
  title: string
}) {
  const { spacing } = useTheme()

  return (
    <Box display='flex' flexDirection='column' sx={{ backgroundColor, color: textColor, borderRadius: spacing(2), p: 2, mt: 5 }}>
      <Box fontWeight='bold'>
        <FontAwesomeIcon {...{ icon }} style={{ marginRight: spacing(1) }} />
        {title}
      </Box>

      <Box typography='body2'>{typeof text === 'string' ? <>{text}</> : <SegmentResolver segments={text} />}</Box>
    </Box>
  )
}
