import { Box, Breadcrumbs, List, ListItem, ListItemButton, ListItemIcon, Typography, useTheme } from '@mui/material'
import { CHARS } from '../../shared/MOCK_CHARS'
import { AdminCharListAppbar } from './appbar/AdminCharListAppbar'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BreadcrumbLink } from '../admin-char-edit/admin-content/AdminCharEditContent'
import { Link } from 'react-router-dom'
import { KeywordPrimitiveRow } from '../../shared/components/KeywordPrimitiveRow'

export function AdminCharList() {
  const { constants } = useTheme()

  const chars = CHARS

  return (
    <>
      <AdminCharListAppbar />

      <Box maxWidth={constants.maxContentWidth} m='auto' p={2}>
        <Box ml={{ xs: 0, md: `${constants.drawerWidth}px` }}>
          <Breadcrumbs separator={<FontAwesomeIcon icon={faChevronRight} size='xs' />}>
            <BreadcrumbLink href='/admin' text='Kezelőközpont' />
            <Typography color='text.primary'>Karakterek</Typography>
          </Breadcrumbs>

          <Box mt={2}>
            <List disablePadding>
              {chars.map(({ keyword, glyph, primitive }, index) => (
                <ListItem disablePadding key={index}>
                  <ListItemButton
                    component={Link}
                    to={`/admin/characters/${glyph}`}
                    sx={{ borderRadius: 6, ':hover': { bgcolor: 'primary.100', cursor: 'pointer' } }}
                  >
                    <ListItemIcon>
                      <Typography variant='chineseText' color='primary.main'>
                        {glyph}
                      </Typography>
                    </ListItemIcon>

                    <KeywordPrimitiveRow {...{ keyword, primitive }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </>
  )
}
