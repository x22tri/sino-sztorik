import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { TierStatusCircle } from '../tier-status-circle/TierStatusCircle'
import { useWindowSize } from '../../shared/hooks/useWindowSize'
import { useOnChange } from '../../shared/hooks/useOnChange'
import { useRef } from 'react'
import { useSwiperInstance } from '../../shared/state'
import { useLessonSelect } from '../../lesson-select/logic/useLessonSelect'
import { LessonPickerTitle } from './LessonPickerTitle'
import { listItemHeight, listItemGap } from './LessonPicker'

export function LessonPickerContent() {
  const listRef = useRef<HTMLUListElement>(null)
  const { lessons, select, selected, toggle } = useLessonSelect()
  const { swiperInstance } = useSwiperInstance()
  const { constants, palette, typography } = useTheme()
  const { height } = useWindowSize()

  function selectLesson(lesson: number) {
    swiperInstance?.slideTo(lesson - 1)
    select(lesson)
    toggle()
  }

  function scrollToLesson(lesson: number | null): void {
    if (lesson === null || height === undefined) {
      return
    }

    listRef.current?.scrollTo({
      top: (listItemHeight + listItemGap) * (lesson - 1) + listItemHeight / 2 - height / 2,
      behavior: 'smooth',
    })
  }

  useOnChange(selected, () => scrollToLesson(selected!))

  return (
    <List
      ref={listRef}
      subheader={<LessonPickerTitle />}
      sx={{
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        overflow: 'auto',
        width: constants.drawerWidth,
        backgroundColor: palette.background.paper,
      }}
    >
      {lessons.map(({ lessonNumber, tierStatuses }) => (
        <ListItem disablePadding disableGutters key={lessonNumber}>
          <ListItemButton
            onClick={() => selectLesson(lessonNumber)}
            sx={{
              backgroundColor: selected === lessonNumber ? 'primary.light' : 'background.paper',
              transition: `${constants.animationDuration}ms`,
              '&:hover': { backgroundColor: selected === lessonNumber ? 'primary.lightHovered' : undefined },
              '.MuiListItemText-multiline': { display: 'flex', flexDirection: 'column' },
            }}
          >
            <ListItemIcon>
              <TierStatusCircle {...{ lessonNumber, tierStatuses }} />
            </ListItemIcon>
            <ListItemText
              primary='Lecke címe'
              secondary='11 karakter'
              sx={{
                '.MuiListItemText-primary': { ...typography.titleSubtitle.subtitle, color: palette.text.secondary },
                '.MuiListItemText-secondary': { ...typography.titleSubtitle.title, color: palette.text.disabled },
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
