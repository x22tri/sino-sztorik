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
    [NOT_IN_TIER]: palette.grey[300],
    [LOCKED]: palette.grey[300],
    [UPCOMING]: palette.secondary.main,
    [COMPLETED]: palette.primary.main,
  }

  const styleDictionary = {
    [NOT_IN_TIER]: { color: palette.grey[300], borderStyle: 'double' },
    [LOCKED]: { color: palette.grey[300], borderStyle: 'solid' },
    [UPCOMING]: { color: palette.secondary.main, borderStyle: 'solid' },
    [COMPLETED]: { color: palette.primary.main, borderStyle: 'solid' },
  }

  const [tierOneStyles, tierTwoStyles, tierThreeStyles, tierFourStyles] =
    tierStatuses.map(tier => styleDictionary[tier])

  // console.log(x)

  // const [tierOneColor, tierTwoColor, tierThreeColor, tierFourColor] =
  //   tierStatuses.map(tier => colorDictionary[tier])

  const [borderTopColor, borderRightColor, borderBottomColor, borderLeftColor] =
    tierStatuses.map(tier => colorDictionary[tier])

  const sizeInPx = 48

  // return (
  {
    /* <Box
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
      
    </Box>*/
  }
  //
  return (
    <Box
      margin={1}
      display='flex'
      justifyContent='center'
      alignItems='center'
      width={`${sizeInPx}px`}
      height={`${sizeInPx}px`}
      border='6px solid'
      borderRadius='100%'
      sx={{
        backgroundClip: 'content-box',
        padding: '1em',
        // borderBottomStyle: 'double',
        // borderColor: 'red',

        transform: 'rotate(45deg)',
        borderTopColor: tierOneStyles.color,
        borderRightColor: tierTwoStyles.color,
        borderBottomColor: tierThreeStyles.color,
        borderLeftColor: tierFourStyles.color,
        borderTopStyle: tierOneStyles.borderStyle,
        borderRightStyle: tierTwoStyles.borderStyle,
        borderBottomStyle: tierThreeStyles.borderStyle,
        borderLeftStyle: tierFourStyles.borderStyle,
      }}
    >
      <Box typography='h5' sx={{ transform: 'rotate(-45deg)' }}>
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
