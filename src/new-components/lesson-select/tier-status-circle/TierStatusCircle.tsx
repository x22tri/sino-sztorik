import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import {
  TierStatuses,
  LessonStatus,
  LessonStatuses,
} from '../../shared/interfaces'
const { NOT_IN_TIER, LOCKED, UPCOMING, COMPLETED } = LessonStatuses

export function TierStatusCircle({
  lessonNumber,
  tierStatuses,
}: {
  lessonNumber: number
  tierStatuses: TierStatuses
}) {
  const { palette } = useTheme()

  const sizeInPx = 48

  const styleDictionary: {
    [key in LessonStatus]: { color: string; borderStyle: 'double' | 'solid' }
  } = {
    [NOT_IN_TIER]: { color: palette.grey[300], borderStyle: 'double' },
    [LOCKED]: { color: palette.grey[300], borderStyle: 'solid' },
    [UPCOMING]: { color: palette.secondary.main, borderStyle: 'solid' },
    [COMPLETED]: { color: palette.primary.main, borderStyle: 'solid' },
  }

  const [
    { color: borderTopColor, borderStyle: borderTopStyle },
    { color: borderRightColor, borderStyle: borderRightStyle },
    { color: borderBottomColor, borderStyle: borderBottomStyle },
    { color: borderLeftColor, borderStyle: borderLeftStyle },
  ] = tierStatuses.map(tier => styleDictionary[tier])

  return (
    <Box
      margin={1}
      display='flex'
      justifyContent='center'
      alignItems='center'
      width={`${sizeInPx}px`}
      height={`${sizeInPx}px`}
      borderRadius='100%'
      sx={{
        transform: 'rotate(45deg)',
        borderWidth: 6,
        borderTopColor,
        borderRightColor,
        borderBottomColor,
        borderLeftColor,
        borderTopStyle,
        borderRightStyle,
        borderBottomStyle,
        borderLeftStyle,
      }}
    >
      <Box typography='h5' sx={{ transform: 'rotate(-45deg)' }}>
        {lessonNumber}
      </Box>
    </Box>
  )
}
