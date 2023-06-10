import { faCircleRight, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { LessonStatuses, LessonStatus, TierStatuses } from '../../shared/interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, useTheme } from '@mui/material'
import { Fragment, ReactNode } from 'react'

const { NOT_IN_TIER, LOCKED, UPCOMING, COMPLETED } = LessonStatuses
const iconWidth = '14px'

export function TierStatusIcons({ tierStatuses }: { tierStatuses: TierStatuses }) {
  const { palette } = useTheme()

  const iconDictionary: { [key in LessonStatus]: ReactNode } = {
    [COMPLETED]: <FontAwesomeIcon icon={faCircleCheck} style={{ color: palette.success.main, width: iconWidth }} />,
    [NOT_IN_TIER]: (
      <span className='fa-layers fa-fw' style={{ color: palette.text.disabled, width: iconWidth }}>
        <FontAwesomeIcon icon={faSpinner} rotation={180} style={{ clip: 'rect(10px, 5px, 16px, 0px)', width: iconWidth }} />
        <FontAwesomeIcon icon={faSpinner} style={{ width: iconWidth }} />
      </span>
    ),
    [LOCKED]: <FontAwesomeIcon icon={faCircle} style={{ color: palette.text.disabled, width: iconWidth }} />,
    [UPCOMING]: <FontAwesomeIcon icon={faCircleRight} style={{ color: palette.primary.main, width: iconWidth }} />,
  }

  return (
    <Box display='flex' component='span' gap={0.5}>
      {tierStatuses.map((tier, index) => (
        <Fragment key={index}>{iconDictionary[tier]}</Fragment>
      ))}
    </Box>
  )
}
