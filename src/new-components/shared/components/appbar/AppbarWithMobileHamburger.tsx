import { IconDefinition, faBars } from '@fortawesome/free-solid-svg-icons'
import { AppBar, Box, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Toolbar, useTheme } from '@mui/material'
import { Else, If, Then, When } from 'react-if'
import { useSmallScreen } from '../../hooks/useSmallScreen'
import ToolbarButton from '../ToolbarButton'
import { AppbarButton } from './AppbarButton'
import LogoTitle from '../LogoTitle'
import { ReactNode, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type AppbarMenuOption = {
  disabled: boolean
  icon: IconDefinition
  text: string
}

export type AppbarSideNavConfig = {
  icon: IconDefinition
  text: string
}

export function AppbarWithMobileHamburger({
  menuOptions,
  sideNavConfig,
  toggleDrawer,
}: {
  menuOptions: AppbarMenuOption[]
  sideNavConfig?: AppbarSideNavConfig
  toggleDrawer: () => void
}) {
  const isSmallScreen = useSmallScreen()
  const ref = useRef<HTMLButtonElement>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null)
  const { spacing } = useTheme()

  function openMenu() {
    setAnchorEl(ref.current)
  }

  function closeMenu() {
    setAnchorEl(null)
  }

  return (
    <>
      <AppbarBase>
        <When condition={isSmallScreen}>
          {sideNavConfig ? (
            <ToolbarButton icon={sideNavConfig.icon} onClick={toggleDrawer} tooltip={sideNavConfig.text} />
          ) : (
            <Box />
          )}
        </When>

        <LogoTitle />

        <If condition={isSmallScreen}>
          <Then>
            <ToolbarButton innerRef={ref} icon={faBars} onClick={openMenu} tooltip='Főmenü' />
          </Then>

          <Else>
            <Box display='flex' gap={1.5}>
              {menuOptions.map(({ disabled, icon, text }) => (
                <AppbarButton key={text} {...{ disabled, icon, text }} />
              ))}
            </Box>
          </Else>
        </If>
      </AppbarBase>

      <Menu {...{ anchorEl }} open={!!anchorEl} onClose={closeMenu}>
        <MenuList>
          {menuOptions.map(({ disabled, icon, text }) => (
            <MenuItem {...{ disabled }} key={text} onClick={closeMenu}>
              <ListItemIcon sx={{ '&.MuiListItemIcon-root': { minWidth: spacing(3.5) } }}>
                <FontAwesomeIcon {...{ icon }} />
              </ListItemIcon>

              <ListItemText primaryTypographyProps={{ color: 'text.secondary', fontWeight: 'bold' }}>{text}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  )
}

export function AppbarBase({ children }: { children: ReactNode }) {
  const { constants, palette } = useTheme()

  return (
    <>
      <AppBar elevation={0} sx={{ bgcolor: 'background.default', borderBottom: `1px solid ${palette.grey[300]}` }}>
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
        >
          {children}
        </Toolbar>
      </AppBar>

      <Toolbar />
    </>
  )
}
