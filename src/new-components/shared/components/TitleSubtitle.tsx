import { SxProps } from '@mui/material'
import Box from '@mui/material/Box'
import { ReactNode } from 'react'

export function TitleSubtitle({
  containerStyles,
  subtitle,
  subtitleStyles,
  title,
  titleStyles,
}: {
  containerStyles?: SxProps
  subtitle: string | ReactNode
  subtitleStyles?: SxProps
  title: string | ReactNode
  titleStyles?: SxProps
}) {
  return (
    <Box alignItems='flex-start' display='flex' flexDirection='column' sx={{ ...containerStyles }}>
      <Box component='span' typography='titleSubtitle.title' sx={{ color: 'text.disabled', ...titleStyles }}>
        {title}
      </Box>

      <Box component='span' typography='titleSubtitle.subtitle' sx={{ color: 'text.secondary', ...subtitleStyles }}>
        {subtitle}
      </Box>
    </Box>
  )
}
