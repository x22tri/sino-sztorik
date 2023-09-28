import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { AdminAppbar } from '../shared/AdminAppbar'
import { SideNav } from '../../shared/components/SideNav'
import { useDrawer } from '../../shared/hooks/useDrawer'
import { AdminSubmenuTitle } from '../shared/AdminSubmenuTitle'
import { IconDefinition, faCircleRight, faGraduationCap, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { constants } from 'buffer'
import { title } from 'process'
import { When } from 'react-if'
import { isDisabledLesson } from '../../shared/utility-functions'

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
  link: string
  icon: IconDefinition
  text: string
}

const adminDashboardOptions: AdminDashboardOption[] = [
  {
    link: '/admin/characters',
    icon: faLanguage,
    text: 'Karakterek',
  },
  {
    link: '/admin/lessons',
    icon: faGraduationCap,
    text: 'Leckék',
  },
]

function AdminDashboardPickerContent() {
  const { constants, spacing } = useTheme()
  return (
    <Box>
      {adminDashboardOptions.map(({ link, icon, text }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton
            component={Link}
            to={link}
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
