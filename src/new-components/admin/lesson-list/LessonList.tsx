import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import { AdminAppbar } from '../shared/AdminAppbar'
import { Link } from 'react-router-dom'
import { AdminBreadcrumbs } from '../../shared/components/AdminBreadcrumbs'
import { LESSON_ENTRIES } from '../../shared/MOCK_DATABASE_ENTRIES'

export function AdminLessonList() {
  const { constants, spacing } = useTheme()

  const lessons = LESSON_ENTRIES

  return (
    <>
      <AdminAppbar />

      <AdminBreadcrumbs currentMenuItem='Leckék' hierarchy={[{ href: '/admin', text: 'Kezelőközpont' }]} />

      <Box maxWidth={constants.maxContentWidth} mx='auto' mt={4} p={2}>
        <Box ml={{ xs: 0, md: `${constants.drawerWidth}px` }}>
          <Typography variant='h4' mt={2}>
            Leckék
          </Typography>

          <Box mt={2}>
            <List disablePadding>
              {lessons.map(({ characters, lessonNumber, title }, index) => {
                const tierLengths = new Array<number>(1, 2, 3, 4)
                  // .map(tier => characters.filter(({ tiers }) => tiers.includes(tier)).length)
                  .map(() => Math.ceil(Math.random() * 10))
                  .join(' - ')

                return (
                  <ListItem disablePadding key={index}>
                    <ListItemButton
                      component={Link}
                      to={`/admin/lessons/${lessonNumber}`}
                      sx={{ borderRadius: 8, py: 1.5, ':hover': { bgcolor: 'primary.100', cursor: 'pointer' } }}
                    >
                      <ListItemIcon
                        sx={{
                          alignItems: 'flex-start',
                          color: 'text.disabled',
                          justifyContent: 'end',
                          mr: 1,
                          minWidth: spacing(3),
                          typography: 'overline',
                        }}
                      >
                        {`${lessonNumber})`}
                      </ListItemIcon>

                      <ListItemText primary={title} secondary={`${characters.length} karakter (${tierLengths})`} />
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          </Box>
        </Box>
      </Box>
    </>
  )
}
