import { ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRight } from '@fortawesome/free-solid-svg-icons'
import { When } from 'react-if'
import { isDisabledLesson } from '../../shared/utility-functions'
import { Link, useLoaderData, useParams } from 'react-router-dom'
import { LoadLessonSelect } from '../../shared/logic/loadLessonSelect'

export function LessonPickerContent({ toggleDrawer }: { toggleDrawer: () => void }) {
  const params = useParams<{ lessonNumber: string }>()
  const selectedLessonNumber = Number(params.lessonNumber)
  const { lessons, upcomingIndex } = useLoaderData() as LoadLessonSelect
  const { constants, palette, spacing } = useTheme()

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
              to={`/lessons/${lessonNumber}`}
              selected={selectedLessonNumber === lessonNumber}
              sx={{
                borderRadius: 6,
                color: 'text.secondary',
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

              <ListItemText primary={title} sx={{ '.MuiListItemText-primary': { fontSize: '90%', fontWeight: 'bold' } }} />

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
