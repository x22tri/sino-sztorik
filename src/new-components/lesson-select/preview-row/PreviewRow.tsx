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
import { useSmallScreen } from '../../shared/utility-functions'

export function PreviewRow({
  lessons,
  setSelectedLessonNumber,
}: {
  lessons: AssembledLesson[]
  setSelectedLessonNumber: Dispatch<SetStateAction<number | null>>
}) {
  const { palette, typography } = useTheme()

  const isSmallScreen = useSmallScreen()

  return (
    <List disablePadding sx={{ minWidth: '300px' }}>
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
              border: `1px solid ${palette.grey[200]}`,
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
