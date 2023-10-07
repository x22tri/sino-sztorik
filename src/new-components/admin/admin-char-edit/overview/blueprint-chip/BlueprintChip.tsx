import { useTheme, Chip, lighten } from '@mui/material'
import { IconDefinition, faBell, faCube, faKey, faRunning, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { OccurrencePresentation } from '../../../../shared/MOCK_DATABASE_ENTRIES'

export function BlueprintChip({ isReminder, type }: { isReminder?: boolean; type: Exclude<OccurrencePresentation, 'unset'> }) {
  const { palette } = useTheme()

  const typeMap: Record<
    Exclude<OccurrencePresentation, 'unset'>,
    { background: string; color: string; icon: IconDefinition; label: string }
  > = {
    keyword: { background: palette.primary[200]!, color: palette.primary.main, icon: faKey, label: 'Kulcsszó' },
    keywordAndPrimitive: {
      background: `linear-gradient(150deg, ${palette.primary[200]} 25%, ${palette.secondary[200]} 75%)`,
      color: palette.primary.main,
      icon: faStar,
      label: 'Kulcsszó és alapelem',
    },
    keywordLite: {
      background: palette.primary[50]!,
      color: palette.primary[300]!,
      icon: faRunning,
      label: 'Kulcsszó felületes bevezetése',
    },
    primitive: { background: palette.secondary[200]!, color: palette.secondary.main, icon: faCube, label: 'Alapelem' },
    reminder: { background: lighten(palette.warning.main, 0.5), color: palette.warning.dark, icon: faBell, label: 'Emlékeztető' },
  }

  const { background, color, icon, label } = typeMap[isReminder ? 'reminder' : type]

  return (
    <Chip icon={<FontAwesomeIcon {...{ color, icon }} />} {...{ label }} sx={{ background, pl: 0.5, width: 'max-content' }} />
  )
}
