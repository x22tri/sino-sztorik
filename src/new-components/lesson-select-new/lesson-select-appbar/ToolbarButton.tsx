import { MouseEvent } from 'react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

export default function ToolbarButton({
  ariaLabel,
  icon,
  tooltip,
  onClick,
}: {
  ariaLabel?: string
  icon: IconDefinition
  tooltip: string
  onClick: (event: MouseEvent<HTMLElement>) => any
}) {
  return (
    <Tooltip title={tooltip}>
      <IconButton aria-label={ariaLabel} aria-controls='menu-appbar' aria-haspopup='true' {...{ onClick }}>
        <FontAwesomeIcon {...{ icon }} />
      </IconButton>
    </Tooltip>
  )
}
