import { useTheme, Chip, lighten } from '@mui/material'
import { OccurrencePresentation } from '../../../../shared/MOCK_DATABASE_ENTRIES'

export function BlueprintChip({ isReminder, type }: { isReminder: boolean; type: Exclude<OccurrencePresentation, 'unset'> }) {
  const { palette } = useTheme()

  const typeMap: Record<Exclude<OccurrencePresentation, 'unset'>, { background: string; label: string }> = {
    keyword: { background: palette.primary[200]!, label: 'Kulcsszó' },
    keywordAndPrimitive: {
      background: `linear-gradient(150deg, ${palette.primary[200]} 25%, ${palette.secondary[200]} 75%)`,
      label: 'Kulcsszó és alapelem',
    },
    keywordLite: { background: palette.primary[50]!, label: 'Kulcsszó felületes bevezetése' },
    primitive: { background: palette.secondary[200]!, label: 'Alapelem' },
    reminder: { background: lighten(palette.warning.main, 0.5), label: 'Emlékeztető' },
  }

  const { background, label } = typeMap[isReminder ? 'reminder' : type]

  return <Chip {...{ label }} sx={{ background }} />
}
