import { Drawer, List, useTheme } from '@mui/material'
import { useLessonSelect } from '../../lesson-select-new/logic/useLessonSelect'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { Wrap } from '../../shared/utility-components'
import { useWindowSize } from '../hooks/useWindowSize'
import { useRef } from 'react'
import { useOnChange } from '../hooks/useOnChange'

const itemHeight = 64
const gap = 0

export function SideNav({ content, selected, title }: { content: JSX.Element; selected: number; title: JSX.Element }) {
  const isSmallScreen = useSmallScreen()
  const ref = useRef<HTMLUListElement>(null)
  const { isOpen, toggle } = useLessonSelect()
  const { constants } = useTheme()
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
          open={isOpen}
          onClose={toggle}
          variant='temporary'
          sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: constants.drawerWidth } }}
        >
          {children}
        </Drawer>
      )}
    >
      <List
        subheader={title}
        sx={{ left: 0, gridArea: 'drawer', overflow: 'auto', position: 'absolute', top: 0, width: constants.drawerWidth }}
        {...{ ref }}
      >
        {content}
      </List>
    </Wrap>
  )
}
