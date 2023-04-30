import { ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { useSwiperInstance } from '../../shared/state'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRight } from '@fortawesome/free-solid-svg-icons'
import { When } from 'react-if'
import { isDisabledLesson } from '../../shared/utility-functions'
import { useStore } from '../../shared/logic/useStore'

export function LessonPickerContent() {
  const { lessons, selectLessonIndex, selectedLessonIndex, upcomingLessonIndex } = useStore(({ lessonSelect }) => lessonSelect)
  const { toggleDrawer } = useStore(({ mobileDrawer }) => mobileDrawer)
  const { swiperInstance } = useSwiperInstance()
  const { constants, palette, spacing, typography } = useTheme()

  function selectLesson(index: number) {
    swiperInstance?.slideTo(index)
    selectLessonIndex(index)
    toggleDrawer()
  }

  return (
    <>
      {lessons.map(({ lessonNumber, tierStatuses }, index) => {
        const isUpcoming = upcomingLessonIndex === index

        return (
          <ListItem key={index} disablePadding>
            <ListItemButton
              disabled={isDisabledLesson(tierStatuses)}
              onClick={() => selectLesson(index)}
              selected={selectedLessonIndex === index}
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
                sx={{ color: 'text.disabled', justifyContent: 'end', mr: 1, minWidth: spacing(3), typography: 'overline' }}
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
    </>
  )
}
