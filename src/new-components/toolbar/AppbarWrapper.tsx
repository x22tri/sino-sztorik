import { MouseEvent, ReactNode, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Toolbar from '@mui/material/Toolbar'
import { IconButton, Typography, useTheme } from '@mui/material'
import Container from '@mui/material/Container'
import { CHARACTER_SEARCH_TITLE, LESSON_SELECT_TITLE } from '../shared/strings'
import Logo from './Logo'
import MobileNavigationMenu from './MobileNavigationMenu'
import DesktopNavigationMenu from './DesktopNavigationMenu'
import ProfileMenu from './ProfileMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChalkboard,
  faCircle,
  faClose,
  faSquare,
} from '@fortawesome/free-solid-svg-icons'
import { useNavButtonStyling } from '../learn/useNavButtonStyling'
import { useSmallScreen } from '../shared/utility-functions'
import { Character } from '../shared/interfaces'
import { emphasisFont } from '../shared/theme'

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
  charToReturnToFromFlashback,
  lessonLength,
}: {
  activeIndex: number
  charToReturnToFromFlashback: Character | null
  lessonLength: number
}) {
  const { constants } = useTheme()

  const navButtonStyling = useNavButtonStyling()

  const isLocked = !!charToReturnToFromFlashback

  const gridSideColumn = `minmax(max-content, calc((100vw -  ${constants.maxContentWidth}) / 2))`

  const lessonProgress = (activeIndex / (lessonLength - 1)) * 100

  return (
    <AppbarWrapper>
      <Box
        alignItems='center'
        display='grid'
        gap={1}
        gridTemplateColumns={`${gridSideColumn} auto ${gridSideColumn}`}
        width='100%'
      >
        <LessonInfo
          lessonNumber={99}
          lessonTitle={'Lecke címe'}
          {...{ charToReturnToFromFlashback }}
        />

        <Box display='flex'>
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

        <IconButton
          size='large'
          sx={{ mx: 1, pl: 0, justifySelf: 'flex-end', ...navButtonStyling }}
        >
          <FontAwesomeIcon icon={faClose} />
        </IconButton>
      </Box>
    </AppbarWrapper>
  )
}

function LessonInfo({
  charToReturnToFromFlashback,
  lessonNumber,
  lessonTitle,
}: {
  charToReturnToFromFlashback: Character | null
  lessonNumber: number
  lessonTitle: string
}) {
  const { palette } = useTheme()

  const logoImage = require(`../../assets/logo.png`)

  const isSmallScreen = useSmallScreen()

  return isSmallScreen ? (
    <LessonInfoMobile {...{ charToReturnToFromFlashback, lessonNumber }} />
  ) : (
    <Box display='flex' flexDirection='row' marginX={1} gap={1}>
      <img src={logoImage} alt='Logó' width='auto' height='28px' />
      <Box display='flex' flexDirection='column'>
        <Typography
          component='span'
          lineHeight={1}
          sx={{
            fontWeight: 900,
            fontSize: '80%',
            color: palette.text.disabled,
          }}
        >
          {lessonNumber}. lecke
        </Typography>
        <Typography
          component='span'
          lineHeight={1}
          sx={{ fontWeight: 'bold', color: palette.text.secondary }}
        >
          {lessonTitle}
        </Typography>
      </Box>
    </Box>
  )
}

function LessonInfoMobile({
  lessonNumber,
  charToReturnToFromFlashback,
}: {
  lessonNumber: number
  charToReturnToFromFlashback: Character | null
}) {
  const { palette } = useTheme()

  const navButtonStyling = useNavButtonStyling()

  return (
    <IconButton
      size='large'
      className='fa-layers fa-fw'
      sx={{ ml: 1, justifySelf: 'flex-end', ...navButtonStyling }}
    >
      <FontAwesomeIcon icon={faChalkboard} transform='shrink-3' />
      <Box
        component='span'
        fontFamily={emphasisFont}
        fontWeight='bold'
        fontSize='40%'
        marginBottom='2px'
      >
        {lessonNumber}
      </Box>
    </IconButton>
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
