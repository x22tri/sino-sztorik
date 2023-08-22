import { Box, useTheme } from '@mui/material'
import { SideNav } from './SideNav'
import { ReactNode } from 'react'

export function LayoutGrid({
  children,
  isDrawerOpen,
  sideNav,
  toggleDrawer,
}: {
  children: ReactNode
  isDrawerOpen: boolean
  sideNav: { content: JSX.Element; selected: number; title: JSX.Element }
  toggleDrawer: () => void
}) {
  const { constants } = useTheme()

  return (
    <Box
      display='grid'
      position='relative'
      margin='auto'
      sx={{
        maxWidth: constants.maxContentWidth,
        gridTemplate: { xs: `"main" / auto`, md: `"drawer main" / ${constants.drawerWidth}px auto` },
      }}
    >
      <SideNav content={sideNav.content} title={sideNav.title} selected={sideNav.selected} {...{ isDrawerOpen, toggleDrawer }} />

      <Box gridArea='main'>{children}</Box>
    </Box>
  )
}
