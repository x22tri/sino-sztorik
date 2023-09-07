import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Breadcrumbs, Typography, useTheme } from '@mui/material'
import { BreadcrumbLink } from '../admin-content/AdminCharEditContent'

export function AdminCharEditBreadcrumbs({ glyph }: { glyph: string }) {
  const { constants, palette, spacing } = useTheme()

  return (
    <Box
      alignItems='center'
      display='flex'
      height={spacing(4)}
      position='fixed'
      px={3}
      zIndex={1000}
      sx={{ bgcolor: 'background.default', borderBottom: `1px solid ${palette.grey[300]}`, width: 1 }}
    >
      <Box mx='auto' maxWidth={constants.maxContentWidth} width={1}>
        <Breadcrumbs separator={<FontAwesomeIcon icon={faChevronRight} size='xs' />}>
          <BreadcrumbLink href='/admin' text='Kezelőközpont' />
          <BreadcrumbLink href='/admin/characters' text='Karakterek' />
          <Typography color='text.primary'>Karakter szerkesztése ({glyph})</Typography>
        </Breadcrumbs>
      </Box>
    </Box>
  )
}
