import { Box, Button, List, ListItem, ListItemButton, ListItemIcon, Typography, useTheme } from '@mui/material'
import { CHARS } from '../../shared/MOCK_CHARS'
import { AdminAppbar } from '../shared/AdminAppbar'
import { Link } from 'react-router-dom'
import { KeywordPrimitiveRow } from '../../shared/components/KeywordPrimitiveRow'
import { AdminBreadcrumbs } from '../../shared/components/AdminBreadcrumbs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export function AdminCharList() {
  const { constants } = useTheme()

  const chars = CHARS

  return (
    <>
      <AdminAppbar />

      <AdminBreadcrumbs currentMenuItem='Karakterek' hierarchy={[{ href: '/admin', text: 'Kezelőközpont' }]} />

      <Box maxWidth={constants.maxContentWidth} mx='auto' mt={4} p={2}>
        <Box ml={{ xs: 0, md: `${constants.drawerWidth}px` }}>
          <Box alignItems='center' display='flex' justifyContent='space-between' mt={2}>
            <Typography variant='h4'>Karakterek</Typography>

            <Button
              component={Link}
              startIcon={<FontAwesomeIcon icon={faPlus} transform='shrink-4' />}
              state={{ mode: 'add' }}
              to='new'
              variant='contained'
            >
              Új karakter
            </Button>
          </Box>

          {chars.length === 0 ? (
            <Box display='flex' justifyContent='center' mt={4}>
              <Typography color='text.disabled'>Nincsenek bejegyzések.</Typography>
            </Box>
          ) : (
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
          )}
        </Box>
      </Box>
    </>
  )
}
