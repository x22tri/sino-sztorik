import { useTheme } from '@mui/material'
import { faBook, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import { LESSON_SELECT_TITLE } from '../shared/strings'

const SIDE_NAVIGATION_ELEMENTS = [
  { title: LESSON_SELECT_TITLE, icon: faBook, link: '' },
]

export default function SideNavigation() {
  return (
    <List
      component='nav'
      disablePadding
      sx={{ display: { xs: 'none', md: 'block' } }}
    >
      {SIDE_NAVIGATION_ELEMENTS.map(element => {
        const { title, icon } = element

        return <SideNavigationItem key={title} {...{ title, icon }} />
      })}
    </List>
  )
}

function SideNavigationItem({
  title,
  icon,
}: {
  title: string
  icon: IconDefinition
}) {
  const { palette } = useTheme()

  return (
    <ListItem disablePadding>
      <ListItemButton
        component='button'
        selected={true}
        sx={{
          p: '0 4px',
          '&.Mui-selected': {
            backgroundColor: 'transparent',
            borderBottom: `2px solid ${palette.primary.main}`,
            color: palette.primary.main,
          },
          '&.MuiButtonBase-root:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <FontAwesomeIcon {...{ icon }} color={palette.primary.main} size='lg' />
        <Typography component='span' variant='h6' sx={{ ml: 1 }}>
          {title}
        </Typography>
      </ListItemButton>
    </ListItem>
  )
}
