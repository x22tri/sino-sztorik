import Box from '@mui/material/Box'

export function TitleSubtitle({
  title,
  subtitle,
  titleColor,
  subtitleColor,
}: {
  title: string
  subtitle: string
  titleColor?: string
  subtitleColor?: string
}) {
  return (
    <Box alignItems='flex-start' display='flex' flexDirection='column'>
      <Box component='span' typography='titleSubtitle.title' sx={{ color: titleColor ?? 'text.disabled' }}>
        {title}
      </Box>

      <Box component='span' typography='titleSubtitle.subtitle' sx={{ color: subtitleColor ?? 'text.secondary' }}>
        {subtitle}
      </Box>
    </Box>
  )
}
