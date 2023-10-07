import { Box, List, ListItem, ListItemButton, ListItemIcon, Typography, useTheme } from '@mui/material'
import { CHARS } from '../../shared/MOCK_CHARS'
import { AdminAppbar } from '../shared/AdminAppbar'
import { Link } from 'react-router-dom'
import { KeywordPrimitiveRow } from '../../shared/components/KeywordPrimitiveRow'
import { AdminBreadcrumbs } from '../../shared/components/AdminBreadcrumbs'

export function AdminCharList() {
  const { constants } = useTheme()

  const chars = CHARS

  return (
    <>
      <AdminAppbar />

      <AdminBreadcrumbs currentMenuItem='Karakterek' hierarchy={[{ href: '/admin', text: 'Kezelőközpont' }]} />

      <Box maxWidth={constants.maxContentWidth} mx='auto' mt={4} p={2}>
        <Box ml={{ xs: 0, md: `${constants.drawerWidth}px` }}>
          <Typography variant='h4' mt={2}>
            Karakterek
          </Typography>

          <Box mt={2}>
            <List disablePadding>
              {chars.map(({ keyword, glyph, primitive }, index) => (
                <ListItem disablePadding key={index}>
                  <ListItemButton
                    component={Link}
                    to={`/admin/characters/${glyph}`}
                    sx={{ borderRadius: 8, py: 1.5, ':hover': { bgcolor: 'primary.100', cursor: 'pointer' } }}
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
