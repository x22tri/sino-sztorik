import { MouseEvent } from 'react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

export default function ToolbarButton({
  icon,
  tooltip,
  onClick,
}: {
  icon: IconDefinition
  tooltip: string
  onClick: (event: MouseEvent<HTMLElement>) => any
}) {
  return (
    <Tooltip title={tooltip}>
      <IconButton {...{ onClick }}>
        <FontAwesomeIcon {...{ icon }} />
      </IconButton>
    </Tooltip>
  )
}
