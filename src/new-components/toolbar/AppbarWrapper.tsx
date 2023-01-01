import { MouseEvent, ReactNode, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Toolbar from '@mui/material/Toolbar'
import { IconButton, useTheme } from '@mui/material'
import Container from '@mui/material/Container'
import { CHARACTER_SEARCH_TITLE, LESSON_SELECT_TITLE } from '../shared/strings'
import Logo from './Logo'
import MobileNavigationMenu from './MobileNavigationMenu'
import DesktopNavigationMenu from './DesktopNavigationMenu'
import ProfileMenu from './ProfileMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useNavButtonStyling } from '../learn/useNavButtonStyling'
import { useSmallScreen } from '../shared/utility-functions'

export function LessonSelectAppbar() {
  const username = 'Péter'

  const navigationItems = [LESSON_SELECT_TITLE, CHARACTER_SEARCH_TITLE] as const

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppbarWrapper>
      <Logo display={{ xs: 'none', md: 'flex' }} flexGrow={0} />

      <MobileNavigationMenu
        {...{
          anchorElNav,
          handleOpenNavMenu,
          handleCloseNavMenu,
          navigationItems,
        }}
      />

      <Logo display={{ xs: 'flex', md: 'none' }} flexGrow={1} />

      <DesktopNavigationMenu
        {...{
          handleOpenNavMenu,
          handleCloseNavMenu,
          navigationItems,
        }}
      />

      <ProfileMenu {...{ username }} />
    </AppbarWrapper>
  )
}

export function LearnAppbar({
  activeIndex,
  isLocked,
  lessonLength,
}: {
  activeIndex: number
  isLocked: boolean
  lessonLength: number
}) {
  const { constants } = useTheme()

  const navButtonStyling = useNavButtonStyling()

  const lessonProgress = (activeIndex / (lessonLength - 1)) * 100

  const gridSideColumn = `minmax(max-content, calc((100vw -  ${constants.maxContentWidth}) / 2))`

  return (
    <AppbarWrapper>
      <Box
        display='grid'
        // gridRow={1}
        // gridTemplateColumns={`minmax(0, 1fr) minmax(1fr, auto) minmax(0, 1fr)`}
        // gridTemplateColumns={`max-content auto max-content`}
        // gridTemplateColumns={`max-content 1fr 1fr`}
        // gridTemplateColumns={`minmax(max-content, calc(100% -  ${constants.maxContentWidth} * 2)) auto minmax(max-content, calc(100% - ${constants.maxContentWidth} * 2))`}
        gridTemplateColumns={`${gridSideColumn} auto ${gridSideColumn}`}
        width='100%'
        // justifyContent='center'
        alignItems='center'
        // alignContent='space-between'
      >
        <Box
          // whiteSpace='nowrap'
          display='flex'
          marginLeft={1}
          // gridRow={1}
          // flexShrink={1}
          // minWidth='0'
          // width='fit-content'
        >
          {'1. leckessssssss'}
        </Box>
        <Box
          display='flex'
          sx={{
            m: 1,
            // width: '100%',
            // flexGrow: 1
          }}
          // gridRow={1}
        >
          <LinearProgress
            variant='determinate'
            value={lessonProgress}
            color={isLocked ? 'neutral' : 'primary'}
            sx={{
              borderRadius: '8px',
              p: 0.5,
              mx: 'auto',
              maxWidth: constants.maxContentWidth,
              width: '100%',
            }}
          />
        </Box>
        {/* <Box>{'x'}</Box> */}
        <IconButton
          size='large'
          sx={{
            mr: 1,
            // gridRow: 1,
            // width: 'fit-content',
            justifySelf: 'flex-end',
            ...navButtonStyling,
          }}
        >
          <FontAwesomeIcon icon={faClose} />
        </IconButton>
      </Box>
    </AppbarWrapper>
  )
}

function AppbarWrapper({ children }: { children: ReactNode }) {
  const { palette } = useTheme()

  return (
    <AppBar
      position='static'
      elevation={0}
      sx={{ backgroundColor: 'background.default', color: 'black' }}
    >
      {/* <Container disableGutters maxWidth='lg'> */}
      <Toolbar
        variant='dense'
        // disableGutters={useSmallScreen()}
        disableGutters

        // sx={{ maxWidth: constants.maxContentWidth }}
      >
        {children}
      </Toolbar>
      {/* </Container> */}
    </AppBar>
  )
}
