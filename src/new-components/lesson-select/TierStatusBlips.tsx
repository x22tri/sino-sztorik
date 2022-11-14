import Box from '@mui/material/Box'
import { grey, deepOrange, blue } from '@mui/material/colors'
import { TierStatuses, LessonStatuses } from '../shared/interfaces'
import TEMP_PALETTE from '../shared/TEMP_PALETTE'

const { VERY_LOW_OPACITY_BLACK } = TEMP_PALETTE

function TierStatusBlips({ tierStatuses }: { tierStatuses: TierStatuses }) {
  const colorDictionary = {
    [LessonStatuses.NOT_IN_TIER]: 'transparent', // Same as the page background color
    [LessonStatuses.LOCKED]: grey[400],
    [LessonStatuses.UPCOMING]: deepOrange[500],
    [LessonStatuses.COMPLETED]: blue[800],
  }

  return (
    <Box display='flex' flexDirection='row' gap='4px' alignItems='center'>
      {tierStatuses.map((tier, index) => {
        const tierStatusColor = colorDictionary[tier]

        const border =
          tier === LessonStatuses.NOT_IN_TIER
            ? `2px solid ${VERY_LOW_OPACITY_BLACK}`
            : `none`

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

export default TierStatusBlips
