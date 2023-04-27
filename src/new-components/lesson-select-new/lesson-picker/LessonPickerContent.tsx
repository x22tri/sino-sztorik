import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { useWindowSize } from '../../shared/hooks/useWindowSize'
import { useOnChange } from '../../shared/hooks/useOnChange'
import { useRef } from 'react'
import { useSwiperInstance } from '../../shared/state'
import { useLessonSelect } from '../logic/useLessonSelect'
import { LessonPickerTitle } from './LessonPickerTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRight } from '@fortawesome/free-solid-svg-icons'
import { When } from 'react-if'
import { isDisabledLesson } from '../../shared/utility-functions'

const itemHeight = 64
const gap = 0

export function LessonPickerContent() {
  const listRef = useRef<HTMLUListElement>(null)
  const { lessons, select, selected, toggle, upcoming } = useLessonSelect()
  const { swiperInstance } = useSwiperInstance()
  const { constants, palette, spacing, typography } = useTheme()
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
        backgroundColor: 'background.paper',
        bottom: 0,
        borderRight: `1px solid ${palette.grey[200]}`,
        left: 0,
        gridArea: 'drawer',
        overflow: 'auto',
        position: 'absolute',
        right: 0,
        top: 0,
        width: constants.drawerWidth,
      }}
    >
      {lessons.map(({ lessonNumber, tierStatuses }) => {
        const isUpcoming = upcoming === lessonNumber

        return (
          <ListItem key={lessonNumber} disablePadding>
            <ListItemButton
              disabled={isDisabledLesson(tierStatuses)}
              onClick={() => selectLesson(lessonNumber)}
              selected={selected === lessonNumber}
              sx={{
                border: isUpcoming ? `2px solid ${palette.secondary.main}` : 'none',
                borderRadius: 6,
                color: 'text.secondary',
                height: spacing(6),
                m: 1,
                transition: constants.animationDuration,
                ':hover': { bgcolor: isUpcoming ? `${palette.secondary.main}11` : undefined },
                '&.Mui-selected': {
                  bgcolor: isUpcoming ? `${palette.secondary.main}11` : undefined,
                  color: 'text.primary',
                  ':hover': { bgcolor: isUpcoming ? `${palette.secondary.main}22` : undefined },
                },
              }}
            >
              <ListItemIcon
                sx={{ color: 'text.disabled', justifyContent: 'end', mr: 1, minWidth: '24px', typography: 'overline' }}
              >
                {`${lessonNumber})`}
              </ListItemIcon>

              <ListItemText
                primary={`${lessons[lessonNumber - 1].title}`}
                sx={{ '.MuiListItemText-primary': { ...typography.titleSubtitle.title, fontSize: '90%' } }}
              />

              <When condition={isUpcoming}>
                <ListItemIcon sx={{ justifyContent: 'end', minWidth: 0 }}>
                  <FontAwesomeIcon icon={faCircleRight} color={palette.secondary.main} />
                </ListItemIcon>
              </When>
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}
