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
    [NOT_IN_TIER]: 'transparent', // Same as the page background color
    [LOCKED]: palette.grey[400],
    [UPCOMING]: palette.secondary.main,
    [COMPLETED]: palette.primary.main,
  }

  return (
    <Box display='flex' flexDirection='row' gap='4px' alignItems='center'>
      {tierStatuses.map((tier, index) => {
        const tierStatusColor = colorDictionary[tier]

        const border =
          tier === NOT_IN_TIER ? `2px solid ${palette.grey[300]}` : `none`

        return (
          <Box
            key={index}
            component='span'
            sx={{
              width: '12px',
              height: '12px',
              backgroundColor: tierStatusColor,
              borderRadius: '50%',
              border,
            }}
          />
        )
      })}
    </Box>
  )
}
