import { Box } from '@mui/material'
import { SideNav } from './SideNav'
import { ReactNode } from 'react'

export function LayoutGrid({
  children,
  sideNav,
}: {
  children: ReactNode
  sideNav: { content: JSX.Element; selected: number; title: JSX.Element }
}) {
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
      <SideNav content={sideNav.content} title={sideNav.title} selected={sideNav.selected} />

      <Box gridArea='main'>{children}</Box>
    </Box>
  )
}
