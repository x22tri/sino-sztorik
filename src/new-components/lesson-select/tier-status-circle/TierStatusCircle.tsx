import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { TierStatuses, LessonStatuses } from '../../shared/interfaces'
const { NOT_IN_TIER, LOCKED, UPCOMING, COMPLETED } = LessonStatuses

export function TierStatusCircle({
  lessonNumber,
  tierStatuses,
}: {
  lessonNumber: number
  tierStatuses: TierStatuses
}) {
  const { palette } = useTheme()

  const colorDictionary = {
    [NOT_IN_TIER]: palette.grey[400],
    [LOCKED]: palette.grey[400],
    [UPCOMING]: palette.secondary.main,
    [COMPLETED]: palette.primary.main,
  }

  const [tierOneColor, tierTwoColor, tierThreeColor, tierFourColor] =
    tierStatuses.map(tier => colorDictionary[tier])

  const sizeInPx = 48

  return (
    <Box
      position='relative'
      width={`${sizeInPx}px`}
      height={`${sizeInPx}px`}
      margin={1}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Box
        {...quarter}
        top={0}
        right={0}
        borderRadius='0 100% 0 0'
        sx={{
          backgroundColor: tierOneColor,
          clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 10% 90%)',
        }}
      />
      <Box
        {...quarter}
        bottom={0}
        right={0}
        borderRadius='0 0 100% 0'
        sx={{
          backgroundColor: tierTwoColor,
          clipPath: 'polygon(10% 10%, 100% 10%, 100% 90%, 10% 100%)',
        }}
      />
      <Box
        {...quarter}
        bottom={0}
        left={0}
        borderRadius='0 0 0 100%'
        sx={{
          backgroundColor: tierThreeColor,
          clipPath: 'polygon(0 10%, 90% 10%, 90% 100%, 0 100%)',
        }}
      />

      <Box
        {...quarter}
        top={0}
        left={0}
        borderRadius='100% 0 0 0'
        sx={{
          backgroundColor: tierFourColor,
          clipPath: 'polygon(0 0, 90% 0, 90% 90%, 0 90%)',
        }}
      />
      <Box
        position='absolute'
        width='80%'
        height='80%'
        top='10%'
        left='10%'
        borderRadius='100%'
        sx={{ backgroundColor: 'background.default' }}
      />
      <Box sx={{ backgroundColor: 'background.default' }} />
      <Box position='relative' typography='h5'>
        {lessonNumber}
      </Box>
    </Box>
  )
}

const quarter = {
  position: 'absolute',
  width: 'calc(50%)',
  height: 'calc(50% )',
} as const
