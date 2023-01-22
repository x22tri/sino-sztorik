import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material'
import { AssembledLesson } from '../../shared/interfaces'
import { TierStatusCircle } from '../tier-status-circle/TierStatusCircle'
import { Dispatch, SetStateAction } from 'react'

export function PreviewRow({
  lessons,
  setSelectedLessonNumber,
}: {
  lessons: AssembledLesson[]
  setSelectedLessonNumber: Dispatch<SetStateAction<number | null>>
}) {
  const { palette, typography } = useTheme()
  return (
    <List disablePadding>
      {lessons.map(({ lessonNumber, tierStatuses }) => (
        <ListItem
          disablePadding
          disableGutters
          key={lessonNumber}
          sx={{ my: 1 }}
        >
          <ListItemButton
            disableGutters
            onClick={() => setSelectedLessonNumber(lessonNumber)}
            sx={{
              backgroundColor: 'background.paper',
              borderRadius: 2,
              mx: 1,
              padding: 0,
              '.MuiListItemText-multiline': {
                display: 'flex',
                flexDirection: 'column-reverse',
              },
            }}
          >
            <ListItemIcon>
              <TierStatusCircle {...{ lessonNumber, tierStatuses }} />
            </ListItemIcon>
            <ListItemText
              primary='Lecke címe'
              secondary='11 karakter'
              sx={{
                '.MuiListItemText-primary': {
                  ...typography.titleSubtitle.subtitle,
                  color: palette.text.secondary,
                },
                '.MuiListItemText-secondary': {
                  ...typography.titleSubtitle.title,
                  color: palette.text.disabled,
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
