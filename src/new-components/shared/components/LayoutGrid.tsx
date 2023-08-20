import { Box } from '@mui/material'
import { SideNav } from './SideNav'
import { ReactNode } from 'react'
import { useDrawer } from '../hooks/useDrawer'

export function LayoutGrid({
  children,
  sideNav,
  isDrawerOpen,
  toggleDrawer,
}: {
  children: ReactNode
  sideNav: { content: JSX.Element; selected: number; title: JSX.Element }
  isDrawerOpen: boolean
  toggleDrawer: () => void
}) {
  // const { isDrawerOpen, toggleDrawer } = useDrawer()

  // console.log(isDrawerOpen)

  return (
    <Box
      display='grid'
      position='relative'
      margin='auto'
      sx={{
        maxWidth: ({ constants }) => constants.maxContentWidth,
        gridTemplate: ({ constants }) => ({ xs: `"main" / auto`, md: `"drawer main" / ${constants.drawerWidth}px auto` }),
      }}
    >
      <SideNav content={sideNav.content} title={sideNav.title} selected={sideNav.selected} {...{ isDrawerOpen, toggleDrawer }} />

      <Box gridArea='main'>{children}</Box>
    </Box>
  )
}
