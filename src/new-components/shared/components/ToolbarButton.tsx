import { ElementType, MouseEvent } from 'react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tooltip from '@mui/material/Tooltip'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'

export default function ToolbarButton<B extends ElementType>({
  icon,
  tooltip,
  onClick,
  ...restProps
}: IconButtonProps<B, { icon: IconDefinition; tooltip: string; onClick: (event: MouseEvent<HTMLElement>) => any }>) {
  return (
    <Tooltip title={tooltip}>
      <IconButton {...restProps} {...{ onClick }} sx={{ ...restProps.sx }}>
        <FontAwesomeIcon {...{ icon }} />
      </IconButton>
    </Tooltip>
  )
}
