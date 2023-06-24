import { ElementType, ForwardedRef, MouseEvent, forwardRef, useState } from 'react'
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

export function FadeControlledToolbarButton({
  icon,
  tooltip,
  onClick,
  ...restProps
}: IconButtonProps & {
  icon: IconDefinition
  tooltip: string
  onClick: (event: MouseEvent<HTMLElement>) => any
}) {
  const [shown, setShown] = useState(false)
  const [exitTimeout, setExitTimeout] = useState(150)

  function fadeInTooltip() {
    setShown(true)
  }

  function fadeOutTooltip() {
    setExitTimeout(150)
    setShown(false)
  }

  function instantlyDisappearTooltip() {
    setExitTimeout(0)
    setShown(false)
  }

  return (
    <Tooltip title={tooltip} open={shown} TransitionProps={{ timeout: { enter: 150, exit: exitTimeout } }}>
      <IconButton
        onMouseEnter={fadeInTooltip}
        onMouseLeave={fadeOutTooltip}
        onClick={event => {
          instantlyDisappearTooltip()
          onClick(event)
        }}
        {...restProps}
      >
        <FontAwesomeIcon {...{ icon }} />
      </IconButton>
    </Tooltip>
  )
}
