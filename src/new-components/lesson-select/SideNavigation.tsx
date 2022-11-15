import { useTheme } from '@mui/material'
import {
  faBook,
  faMagnifyingGlass,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import { LESSON_SELECT_TITLE, CHARACTER_SEARCH_TITLE } from '../shared/strings'
import { SideNavigationItem } from '../shared/interfaces'
import { Dispatch, SetStateAction } from 'react'

interface SideNavigationElement {
  title: SideNavigationItem
  icon: IconDefinition
  link: string
}

const SIDE_NAVIGATION_ELEMENTS: SideNavigationElement[] = [
  { title: LESSON_SELECT_TITLE, icon: faBook, link: '' },
  { title: CHARACTER_SEARCH_TITLE, icon: faMagnifyingGlass, link: '' },
]

export default function SideNavigation({
  selectedNavigationItem,
  setSelectedNavigationItem,
}: {
  selectedNavigationItem: SideNavigationItem
  setSelectedNavigationItem: Dispatch<SetStateAction<SideNavigationItem>>
}) {
  return (
    <List
      component='nav'
      disablePadding
      sx={{ display: { xs: 'none', md: 'block' } }}
    >
      {SIDE_NAVIGATION_ELEMENTS.map(element => {
        const { title, icon } = element

        const isSelected = selectedNavigationItem === title

        return (
          <SideNavigationListItem
            key={title}
            {...{ title, icon, isSelected, setSelectedNavigationItem }}
          />
        )
      })}
    </List>
  )
}

function SideNavigationListItem({
  title,
  icon,
  isSelected,
  setSelectedNavigationItem,
}: {
  title: SideNavigationItem
  icon: IconDefinition
  isSelected: boolean
  setSelectedNavigationItem: Dispatch<SetStateAction<SideNavigationItem>>
}) {
  const { palette } = useTheme()

  return (
    <ListItem sx={{ pt: 0, pb: 3 }}>
      <ListItemButton
        component='button'
        selected={isSelected}
        sx={{
          justifyContent: 'space-between',
          borderBottom: `2px solid transparent`,
          p: '0 0 8px 0',
          ':hover': {
            color: palette.primary.main,
          },
          '&.Mui-selected': {
            backgroundColor: 'transparent',
            borderBottom: `2px solid ${palette.primary.main}`,
            color: palette.primary.main,
          },
          '&.MuiButtonBase-root:hover': {
            backgroundColor: 'transparent',
          },
        }}
        onClick={() => setSelectedNavigationItem(title)}
      >
        <FontAwesomeIcon {...{ icon }} size='lg' />

        <Typography component='span' variant='h6' sx={{ ml: 1, lineHeight: 1 }}>
          {title}
        </Typography>
      </ListItemButton>
    </ListItem>
  )
}
