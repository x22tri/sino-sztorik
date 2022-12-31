import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LightenOnHoverButton } from './LightenOnHoverButton'

export function LearnActionButton({
  color,
  icon,
  label,
}: {
  color?: 'primary' | 'secondary' | 'neutral'
  icon: IconDefinition
  label: string
}) {
  return (
    <LightenOnHoverButton
      size='small'
      startIcon={<FontAwesomeIcon {...{ icon }} />}
      {...{ color }}
    >
      {label}
    </LightenOnHoverButton>
  )
}
