import { ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRight } from '@fortawesome/free-solid-svg-icons'
import { When } from 'react-if'
import { isDisabledLesson } from '../../shared/utility-functions'
import { useStore } from '../../shared/logic/useStore'
import { Link, useLoaderData, useParams } from 'react-router-dom'
import { LoadLessonSelect } from '../../shared/logic/loadLessonSelect'
import { LESSON_SELECT_PATH } from '../../shared/paths'

export function LessonPickerContent() {
  const params = useParams<{ lessonNumber: string }>()
  const selectedLessonNumber = Number(params.lessonNumber)
  const { lessons, upcomingIndex } = useLoaderData() as LoadLessonSelect
  const { toggleDrawer } = useStore('mobileDrawer')
  const { constants, palette, spacing, typography } = useTheme()

  return (
    <>
      {lessons.map(({ lessonNumber, tierStatuses, title }, index) => {
        const isUpcoming = upcomingIndex === index

        return (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={Link}
              disabled={isDisabledLesson(tierStatuses)}
              onClick={toggleDrawer}
              to={`${LESSON_SELECT_PATH}/${lessonNumber}`}
              selected={selectedLessonNumber === lessonNumber}
              sx={{
                // border: isUpcoming ? `2px solid ${palette.primary.main}` : 'none',
                borderRadius: 6,
                color: 'text.secondary',
                // height: spacing(6),
                mx: 1,
                my: 0.25,
                transition: constants.animationDuration,
                ':hover': { bgcolor: isUpcoming ? `${palette.primary.main}11` : undefined },
                '&.Mui-selected': {
                  bgcolor: isUpcoming ? `${palette.primary.main}11` : palette.grey[200],
                  color: 'text.primary',
                  ':hover': { bgcolor: isUpcoming ? `${palette.primary.main}22` : palette.grey[300] },
                },
              }}
            >
              <ListItemIcon
                sx={{ color: 'text.disabled', justifyContent: 'end', mr: 1, minWidth: spacing(3), typography: 'overline' }}
              >
                {`${lessonNumber})`}
              </ListItemIcon>

              <ListItemText
                primary={title}
                // sx={{ '.MuiListItemText-primary': { ...typography.titleSubtitle.title, fontSize: '90%' } }}
              />

              <When condition={isUpcoming}>
                <ListItemIcon sx={{ justifyContent: 'end', minWidth: 0 }}>
                  <FontAwesomeIcon icon={faCircleRight} color={palette.primary.main} />
                </ListItemIcon>
              </When>
            </ListItemButton>
          </ListItem>
        )
      })}
    </>
  )
}
