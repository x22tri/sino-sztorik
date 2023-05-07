import Box from '@mui/material/Box'

export function TitleSubtitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Box display='flex' flexDirection='column'>
      <Box component='span' typography='titleSubtitle.title' sx={{ color: 'text.disabled' }}>
        {title}
      </Box>

      <Box component='span' typography='titleSubtitle.subtitle' sx={{ color: 'text.secondary' }}>
        {subtitle}
      </Box>
    </Box>
  )
}
