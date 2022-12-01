import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { TierStatuses, LessonStatuses } from '../shared/interfaces'
const { NOT_IN_TIER, LOCKED, UPCOMING, COMPLETED } = LessonStatuses

export default function TierStatusBlips({
  tierStatuses,
}: {
  tierStatuses: TierStatuses
}) {
  const { palette } = useTheme()

  const colorDictionary = {
    [NOT_IN_TIER]: palette.grey[400],
    [LOCKED]: palette.grey[400],
    [UPCOMING]: palette.secondary.main,
    [COMPLETED]: palette.primary.main,
  }

  return (
    <Box lineHeight='100%'>
      {tierStatuses.map((tier, index) => (
        <Box
          key={index}
          component='span'
          color={colorDictionary[tier]}
          fontSize='1.8em'
        >
          {tier === NOT_IN_TIER ? '○' : '●'}
        </Box>
      ))}
    </Box>
  )
}
