import { Drawer, useTheme } from '@mui/material'
import { useLessonSelect } from '../../lesson-select-new/logic/useLessonSelect'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { Character } from '../../shared/interfaces'
import { Wrap } from '../../shared/utility-components'
import { CharPickerContent } from './CharPickerContent'

export function CharPicker({ lesson }: { lesson: Character[] }) {
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
      <CharPickerContent {...{ lesson }} />
    </Wrap>
  )
}

export default function LessonPicker() {}
