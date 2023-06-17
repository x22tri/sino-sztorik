import { Chip, Tooltip } from '@mui/material'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { forwardRef, ForwardedRef } from 'react'

export function FeaturedInfoInLessonChip({
  bgcolor,
  color,
  icon,
  label,
  tooltip,
}: {
  bgcolor: string
  color: string
  icon: IconDefinition
  label: string
  tooltip: string
}) {
  return (
    <Tooltip title={tooltip}>
      <FeaturedInfoInLessonChipForwardRef {...{ bgcolor, color, icon, label }} />
    </Tooltip>
  )
}

const FeaturedInfoInLessonChipForwardRef = forwardRef(
  (
    { bgcolor, color, icon, label, ...restProps }: { bgcolor: string; color: string; icon: IconDefinition; label: string },
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <Chip
      icon={<FontAwesomeIcon {...{ color, icon }} size='sm' />}
      {...{ label, ref }}
      {...restProps}
      sx={{ bgcolor, color, cursor: 'pointer', pl: 0.5, zIndex: 6 }}
    />
  )
)
