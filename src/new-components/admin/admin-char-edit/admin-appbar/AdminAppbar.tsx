import { faLanguage } from '@fortawesome/free-solid-svg-icons'
import { AppBar, Toolbar, useTheme } from '@mui/material'
import { When } from 'react-if'
import { useSmallScreen } from '../../../shared/hooks/useSmallScreen'
import ToolbarButton from '../../../shared/components/ToolbarButton'
import { ADMIN_CHARACTER_LIST } from '../../../shared/strings'
import { ProfileMenu } from '../../../lesson-select/appbar/ProfileMenu'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import LogoTitle from '../../../shared/components/LogoTitle'

export function AdminAppbar({
  setToolbarHeight,
  toolbarHeight,
  toggleDrawer,
}: {
  setToolbarHeight: Dispatch<SetStateAction<number>>
  toolbarHeight: number
  toggleDrawer: () => void
}) {
  const { constants } = useTheme()
  const isSmallScreen = useSmallScreen()
  const ref = useRef<HTMLDivElement | null>(null)
  const resizeObserver = new ResizeObserver(handleToolbarResized)
  const drawerWidth = isSmallScreen ? 0 : constants.drawerWidth

  useEffect(() => {
    if (ref?.current) {
      resizeObserver.observe(ref.current)
    }

    return () => resizeObserver.disconnect()
  })

  function handleToolbarResized() {
    if (ref?.current && ref.current.offsetHeight !== toolbarHeight) {
      setToolbarHeight(ref.current.offsetHeight)
    }
  }

  return (
    <>
      <AppBar elevation={0} sx={{ bgcolor: 'background.default' }}>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            m: 'auto',
            maxWidth: constants.maxContentWidth,
            px: { xs: 1, sm: 2 },
            width: 1,
          }}
          {...{ ref }}
        >
          <When condition={isSmallScreen}>
            <ToolbarButton icon={faLanguage} onClick={toggleDrawer} tooltip={ADMIN_CHARACTER_LIST} />
          </When>

          <LogoTitle />

          <ProfileMenu />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
