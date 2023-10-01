import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import { AdminAppbar } from '../shared/AdminAppbar'
import { SideNav } from '../../shared/components/SideNav'
import { useDrawer } from '../../shared/hooks/useDrawer'
import { AdminSubmenuTitle } from '../shared/AdminSubmenuTitle'
import { IconDefinition, faBook, faEye, faGraduationCap, faLanguage, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function AdminDashboard() {
  const { constants } = useTheme()
  const { isDrawerOpen, toggleDrawer } = useDrawer()

  return (
    <>
      <AdminAppbar />

      <Box
        display='grid'
        margin='auto'
        sx={{
          maxWidth: constants.maxContentWidth,
          gridTemplate: { xs: `"main" / 1fr`, md: `"nav main" / ${constants.drawerWidth}px auto` },
        }}
      >
        <Box component='nav' gridArea='nav'>
          <SideNav
            content={<AdminDashboardPickerContent />}
            title={<AdminSubmenuTitle text='Kezelőközpont' />}
            selected={0}
            {...{ isDrawerOpen, toggleDrawer }}
          />
        </Box>

        <Box component='main' gridArea='main'>
          <Box maxWidth={constants.maxContentWidth} mx='auto' mt={3} p={2}>
            <Typography variant='h4'>Üdv a Kezelőközpontban!</Typography>

            <Typography mt={3}>Válassz ki egy lehetőséget a bal oldali menüből.</Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export type AdminDashboardOption = {
  disabled?: boolean
  icon: IconDefinition
  link: string
  text: string
}

const adminDashboardOptions: AdminDashboardOption[] = [
  {
    icon: faLanguage,
    link: '/admin/characters',
    text: 'Karakterek',
  },
  {
    icon: faGraduationCap,
    link: '/admin/lessons',
    text: 'Leckék',
  },
  {
    disabled: true,
    icon: faBook,
    link: '/admin/phrases',
    text: 'Kifejezések',
  },
  {
    disabled: true,
    icon: faEye,
    link: '/admin/similars',
    text: 'Hasonlóságok',
  },
  {
    disabled: true,
    icon: faUserFriends,
    link: '/admin/users',
    text: 'Felhasználók',
  },
]

function AdminDashboardPickerContent() {
  const { constants, spacing } = useTheme()
  return (
    <Box>
      {adminDashboardOptions.map(({ disabled, icon, link, text }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton
            component={Link}
            to={link}
            {...{ disabled }}
            sx={{
              borderRadius: 6,
              color: 'text.secondary',
              mx: 1,
              my: 0.25,
              transition: constants.animationDuration,
            }}
          >
            <ListItemIcon sx={{ minWidth: spacing(4) }}>
              <FontAwesomeIcon {...{ icon }} />
            </ListItemIcon>

            <ListItemText primary={text} sx={{ '.MuiListItemText-primary': { fontSize: '90%', fontWeight: 'bold' } }} />
          </ListItemButton>
        </ListItem>
      ))}
    </Box>
  )
}
