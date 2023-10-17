import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
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
import {
  IconDefinition,
  faBook,
  faCaretRight,
  faChevronRight,
  faEye,
  faGraduationCap,
  faLanguage,
  faUser,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

export function AdminDashboard() {
  const { constants, palette, spacing } = useTheme()
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
          {/* <SideNav
            content={<AdminDashboardPickerContent />}
            title={<AdminSubmenuTitle text='Kezelőközpont' />}
            selected={0}
            {...{ isDrawerOpen, toggleDrawer }}
          /> */}
        </Box>

        <Box component='main' gridArea='main'>
          <Typography variant='h4' my={2}>
            Kezelőközpont
          </Typography>

          <List>
            <DashboardCard icon={faUserFriends} heading='Felhasználók' link='users' />
            <DashboardCard icon={faEye} heading='Hasonlóságok' link='similars' />
            <DashboardCard icon={faLanguage} heading='Karakterek' link='characters' />
            <DashboardCard icon={faBook} heading='Kifejezések' link='phrases' />
            <DashboardCard icon={faGraduationCap} heading='Leckék' link='lessons' />
          </List>
        </Box>
      </Box>
    </>
  )
}

function DashboardCard({ heading, icon, link }: { heading: string; icon: IconDefinition; link: string }) {
  return (
    <ListItemButton component={Link} to={link} sx={{ py: 2 }}>
      <ListItemIcon>
        <FontAwesomeIcon className='fa-fw' {...{ icon }} size='2x' transform='shrink-2' />
      </ListItemIcon>

      <ListItemText primary={heading} primaryTypographyProps={{ variant: 'h5' }} />
    </ListItemButton>
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
