import {
  IconDefinition,
  faBook,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { SideNavigationItem } from '../shared/interfaces'
import {
  LESSON_SELECT_TITLE,
  CHARACTER_SEARCH_TITLE,
  LESSON_SELECT_TOOLTIP,
  CHARACTER_SEARCH_TOOLTIP,
} from '../shared/strings'

export default function DesktopNavigationMenu({
  handleCloseNavMenu,
  navigationItems,
}: {
  handleCloseNavMenu: () => void
  navigationItems: readonly SideNavigationItem[]
}) {
  const { palette } = useTheme()

  const icons: { [key in SideNavigationItem]: IconDefinition } = {
    [LESSON_SELECT_TITLE]: faBook,
    [CHARACTER_SEARCH_TITLE]: faMagnifyingGlass,
  }

  const tooltips: { [key in SideNavigationItem]: string } = {
    [LESSON_SELECT_TITLE]: LESSON_SELECT_TOOLTIP,
    [CHARACTER_SEARCH_TITLE]: CHARACTER_SEARCH_TOOLTIP,
  }

  return (
    <Box
      sx={{ ml: 3, gap: 2, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
    >
      {navigationItems.map(item => (
        <Tooltip title={tooltips[item]} key={item} sx={{ flexWrap: 'nowrap' }}>
          <Button
            onClick={handleCloseNavMenu}
            sx={{ color: palette.primary.contrastText }}
            startIcon={<FontAwesomeIcon icon={icons[item]} />}
          >
            <Typography component='span' variant='h6' textTransform='none'>
              {item}
            </Typography>
          </Button>
        </Tooltip>
      ))}
    </Box>
  )
}
