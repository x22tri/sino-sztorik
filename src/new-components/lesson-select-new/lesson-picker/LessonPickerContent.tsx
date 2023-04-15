import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { useWindowSize } from '../../shared/hooks/useWindowSize'
import { useOnChange } from '../../shared/hooks/useOnChange'
import { useRef, useState } from 'react'
import { useSwiperInstance } from '../../shared/state'
import { useLessonSelect } from '../logic/useLessonSelect'
import { LessonPickerTitle } from './LessonPickerTitle'
import { TierStatusCircle } from './TierStatusCircle'
import { CHARACTER_AMOUNT_LABEL } from '../../shared/strings'

const itemHeight = 64
const gap = 16

export function LessonPickerContent() {
  const listRef = useRef<HTMLUListElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const { lessons, select, selected, toggle, upcoming } = useLessonSelect()
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

    listRef.current?.scrollTo({ top: (itemHeight + gap) * lesson + itemHeight / 2 - height / 2, behavior: 'smooth' })
  }

  useOnChange(selected, () => scrollToLesson(selected!))

  return (
    <List
      ref={listRef}
      subheader={<LessonPickerTitle />}
      sx={{
        backgroundColor: palette.background.paper,
        bottom: 0,
        left: 0,
        overflow: 'auto',
        position: 'absolute',
        right: 0,
        top: 0,
        width: constants.drawerWidth,
        borderRight: `1px solid ${palette.grey[200]}`,
      }}
    >
      {lessons.map(({ lessonNumber, tierStatuses }) => {
        const isHovered = hovered === lessonNumber
        const isSelected = selected === lessonNumber
        const isUpcoming = upcoming === lessonNumber

        return (
          <ListItem key={lessonNumber}>
            <ListItemButton
              onMouseEnter={() => setHovered(lessonNumber)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => selectLesson(lessonNumber)}
              sx={{
                backgroundColor: isSelected ? (isUpcoming ? palette.secondary.light : palette.grey[100]) : 'background.paper',
                borderRadius: 3,
                p: 0,
                transition: `${constants.animationDuration}ms`,
                '&:hover': {
                  backgroundColor: isSelected ? (isUpcoming ? palette.secondary.light : palette.grey[100]) : 'background.paper',
                },
              }}
            >
              <ListItemIcon>
                <TierStatusCircle isActive={isHovered || isSelected} {...{ lessonNumber, tierStatuses }} />
              </ListItemIcon>
              <ListItemText
                primary={lessons[lessonNumber - 1].title}
                secondary={`${lessons[lessonNumber - 1].characters.length} ${CHARACTER_AMOUNT_LABEL}`}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  transition: `${constants.animationDuration}ms`,
                  '.MuiListItemText-primary': {
                    ...typography.titleSubtitle.subtitle,
                    color: isHovered || isSelected ? palette.common.black : palette.text.secondary,
                  },
                  '.MuiListItemText-secondary': {
                    ...typography.titleSubtitle.title,
                    color: isHovered || isSelected ? palette.text.secondary : palette.text.disabled,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}

// function findLessonTitleColor({
//   isHovered,
//   isSelected,
//   isUpcoming,
// }: {
//   isHovered: boolean
//   isSelected: boolean
//   isUpcoming: boolean
// }) {
//   const { palette } = useTheme()

//   if (isHovered || isSelected) {
//     return isUpcoming ? palette.primary.main : palette.common.black
//   }

//   return palette.text.secondary
// }
