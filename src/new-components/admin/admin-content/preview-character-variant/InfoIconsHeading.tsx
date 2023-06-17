import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Chip } from '@mui/material'
import { useSmallScreen } from '../../../shared/hooks/useSmallScreen'

export function InfoIconsHeading({ icon, label }: { icon: IconDefinition; label: string }) {
  const isSmallScreen = useSmallScreen()

  return (
    <Chip
      icon={<FontAwesomeIcon {...{ icon }} size='sm' />}
      label={isSmallScreen ? undefined : label}
      sx={{ bgcolor: 'inherit', cursor: 'inherit', '.MuiChip-label': { pr: 0 } }}
    />
  )
}
