import { MouseEvent } from 'react'
import ToolbarButton from './ToolbarButton'
import {
  MOBILE_NAVIGATION_ARIA_LABEL,
  MOBILE_NAVIGATION_TOOLTIP,
} from '../shared/strings'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function MenuButton({
  onClick,
}: {
  onClick: (event: MouseEvent<HTMLElement>) => void
}) {
  return (
    <ToolbarButton
      ariaLabel={MOBILE_NAVIGATION_ARIA_LABEL}
      icon={faBars}
      tooltip={MOBILE_NAVIGATION_TOOLTIP}
      {...{ onClick }}
    />
  )
}
