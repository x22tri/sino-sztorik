import { Drawer, useTheme } from '@mui/material'
import { useLessonSelect } from '../../lesson-select-new/logic/useLessonSelect'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { Wrap } from '../../shared/utility-components'

export function SideNav({ content }: { content: JSX.Element | JSX.Element[] }) {
  const isSmallScreen = useSmallScreen()
  const { isOpen, toggle } = useLessonSelect()
  const { constants } = useTheme()

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
      {content}
    </Wrap>
  )
}
