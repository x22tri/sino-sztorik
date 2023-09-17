import { faCircleRight, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { LessonStatuses, LessonStatus, TierStatuses } from '../../shared/interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, useTheme } from '@mui/material'
import { Fragment, ReactElement, ReactNode } from 'react'
import theme from '../../shared/theme'

const { palette } = theme
const { NOT_IN_TIER, LOCKED, UPCOMING, COMPLETED } = LessonStatuses
const iconWidth = '14px'

export function TierStatusIcons({ tierStatuses }: { tierStatuses: TierStatuses }) {
  return (
    <Box display='flex' component='span' gap={0.5}>
      {tierStatuses.map((tier, index) => (
        <Fragment key={index}>{iconDictionary[tier]}</Fragment>
      ))}
    </Box>
  )
}

export const iconDictionary: { [key in LessonStatus]: ReactElement } = {
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
