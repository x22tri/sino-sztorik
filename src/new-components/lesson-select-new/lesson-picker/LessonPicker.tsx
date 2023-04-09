import { Drawer, useTheme } from '@mui/material'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { Wrap } from '../../shared/utility-components'
import { useLessonSelect } from '../logic/useLessonSelect'
import { LessonPickerContent } from './LessonPickerContent'

export default function LessonPicker() {
  const isSmallScreen = useSmallScreen()
  const { isOpen, toggle } = useLessonSelect()
  const { constants } = useTheme()

  return (
    <Wrap
      if={isSmallScreen}
      with={children => (
        <Drawer
          ModalProps={{ keepMounted: true }}
          open={isOpen}
          onClose={toggle}
          variant='temporary'
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: constants.drawerWidth,
            },
          }}
        >
          {children}
        </Drawer>
      )}
    >
      <LessonPickerContent />
    </Wrap>
  )
}
