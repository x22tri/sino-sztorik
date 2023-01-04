import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'

export function TitleSubtitle({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  const { palette } = useTheme()

  return (
    <Box display='flex' flexDirection='column'>
      <Box
        component='span'
        typography='titleSubtitle.title'
        sx={{ color: palette.text.disabled }}
      >
        {title}
      </Box>
      <Box
        component='span'
        typography='titleSubtitle.subtitle'
        sx={{ color: palette.text.secondary }}
      >
        {subtitle}
      </Box>
    </Box>
  )
}
