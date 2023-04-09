import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { TierStatuses, LessonStatus, LessonStatuses } from '../../shared/interfaces'
const { NOT_IN_TIER, LOCKED, UPCOMING, COMPLETED } = LessonStatuses

export function TierStatusCircle({
  lessonNumber,
  isActive,
  tierStatuses,
}: {
  lessonNumber: number
  isActive: boolean
  tierStatuses: TierStatuses
}) {
  const { constants, palette } = useTheme()

  const size = '48px'

  const styleDictionary: { [key in LessonStatus]: { color: string; colorGrayscale: string; borderStyle: 'double' | 'solid' } } = {
    [NOT_IN_TIER]: { color: '#00000022', colorGrayscale: '#00000022', borderStyle: 'double' },
    [LOCKED]: { color: '#00000022', colorGrayscale: '#00000022', borderStyle: 'solid' },
    [UPCOMING]: { color: palette.secondary.main, colorGrayscale: palette.text.secondary, borderStyle: 'solid' },
    [COMPLETED]: { color: palette.primary.main, colorGrayscale: palette.text.disabled, borderStyle: 'solid' },
  }

  const [
    { color: borderTopColor, colorGrayscale: borderTopColorGrayscale, borderStyle: borderTopStyle },
    { color: borderRightColor, colorGrayscale: borderRightColorGrayscale, borderStyle: borderRightStyle },
    { color: borderBottomColor, colorGrayscale: borderBottomColorGrayscale, borderStyle: borderBottomStyle },
    { color: borderLeftColor, colorGrayscale: borderLeftColorGrayscale, borderStyle: borderLeftStyle },
  ] = tierStatuses.map(tier => styleDictionary[tier])

  return (
    <Box
      margin={1}
      display='flex'
      justifyContent='center'
      alignItems='center'
      width={size}
      height={size}
      borderRadius='100%'
      sx={{
        transform: 'rotate(45deg)',
        transition: `${constants.animationDuration}ms`,
        borderWidth: 6,
        borderTopColor: isActive ? borderTopColor : borderTopColorGrayscale,
        borderRightColor: isActive ? borderRightColor : borderRightColorGrayscale,
        borderBottomColor: isActive ? borderBottomColor : borderBottomColorGrayscale,
        borderLeftColor: isActive ? borderLeftColor : borderLeftColorGrayscale,
        borderTopStyle,
        borderRightStyle,
        borderBottomStyle,
        borderLeftStyle,
      }}
    >
      <Box typography='h5' sx={{ color: isActive ? palette.common.black : palette.text.secondary, transform: 'rotate(-45deg)' }}>
        {lessonNumber}
      </Box>
    </Box>
  )
}
