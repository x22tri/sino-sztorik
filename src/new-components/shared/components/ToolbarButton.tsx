import { ElementType, ForwardedRef, MouseEvent, forwardRef } from 'react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tooltip from '@mui/material/Tooltip'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'

export default function ToolbarButton<B extends ElementType>({
  icon,
  innerRef,
  tooltip,
  onClick,
  ...restProps
}: IconButtonProps<
  B,
  {
    icon: IconDefinition
    innerRef?: ForwardedRef<HTMLButtonElement>
    tooltip: string
    onClick: (event: MouseEvent<HTMLElement>) => any
  }
>) {
  return (
    <Tooltip title={tooltip}>
      <IconButtonForwardRef ref={innerRef} {...{ icon, onClick }} {...restProps} />
    </Tooltip>
  )
}

const IconButtonForwardRef = forwardRef(
  ({ icon, onClick, ...restProps }: IconButtonProps & { icon: IconDefinition }, ref: ForwardedRef<HTMLButtonElement>) => (
    <IconButton {...restProps} sx={{ ...restProps.sx }} {...{ onClick, ref }}>
      <FontAwesomeIcon {...{ icon }} />
    </IconButton>
  )
)
