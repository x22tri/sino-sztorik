import { Box, Drawer, List, useTheme } from '@mui/material'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { Wrap } from '../../shared/utility-components'
import { useWindowSize } from '../hooks/useWindowSize'
import { useEffect, useRef, useState } from 'react'
import { useOnChange } from '../hooks/useOnChange'
import { useStore } from '../logic/useStore'
import { useDrawer } from '../hooks/useDrawer'

const itemHeight = 64
const gap = 0

export function SideNav({
  content,
  selected,
  title,
  isDrawerOpen,
  toggleDrawer,
}: {
  content: JSX.Element
  selected: number
  title: JSX.Element
  isDrawerOpen: boolean
  toggleDrawer: () => void
}) {
  const isSmallScreen = useSmallScreen()
  const ref = useRef<HTMLUListElement>(null)
  const { constants, palette } = useTheme()
  const { height } = useWindowSize()

  function scrollToItem(index: number): void {
    if (height === undefined) {
      return
    }

    ref.current?.scrollTo({ top: (itemHeight + gap) * index + itemHeight / 2 - height / 2, behavior: 'smooth' })
  }

  useOnChange(selected, () => scrollToItem(selected))

  return (
    <Wrap
      if={isSmallScreen}
      with={children => (
        <Drawer
          open={isDrawerOpen}
          onClose={toggleDrawer}
          variant='temporary'
          sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: `${constants.drawerWidth}px` } }}
        >
          {children}
        </Drawer>
      )}
    >
      <List
        subheader={title}
        {...{ ref }}
        sx={{
          bottom: 0,
          gridArea: 'drawer',
          overflowY: 'auto',
          top: isSmallScreen ? 0 : 64,
          position: 'fixed',
          width: `${constants.drawerWidth}px`,
        }}
      >
        {content}
      </List>
    </Wrap>
  )
}
