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
import { Dispatch, SetStateAction, useState } from 'react'
import { useSmallScreen } from '../../shared/utility-functions'

export function PreviewRow({
  lessons,
  setSelectedLessonNumber,
}: {
  lessons: AssembledLesson[]
  setSelectedLessonNumber: Dispatch<SetStateAction<number | null>>
}) {
  const { constants, palette, typography } = useTheme()

  const isSmallScreen = useSmallScreen()

  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(true)

  const handleScroll = ({
    scrollHeight,
    scrollTop,
    clientHeight,
  }: HTMLUListElement) => {
    setCanScrollUp(scrollTop !== 0)
    setCanScrollDown(scrollHeight - scrollTop !== clientHeight)
  }

  return (
    <List
      disablePadding
      onScroll={({ target }) => handleScroll(target as HTMLUListElement)}
      sx={{
        mt: 1,
        ml: 1,
        borderTop: canScrollUp ? `2px solid ${palette.grey[300]}` : null,
        borderBottom: canScrollDown ? `2px solid ${palette.grey[300]}` : null,
        minWidth: '360px',
        height: isSmallScreen ? undefined : '480px',
        overflow: isSmallScreen ? 'none' : 'scroll',
      }}
    >
      {lessons.map(({ lessonNumber, tierStatuses }) => (
        <ListItem
          disablePadding
          disableGutters
          key={lessonNumber}
          sx={{ mt: lessonNumber === 1 ? 0 : 1 }}
          // sx={{ my: 1 }}
        >
          <ListItemButton
            disableGutters
            onClick={() => setSelectedLessonNumber(lessonNumber)}
            sx={{
              backgroundColor: 'background.paper',
              border: `1px solid ${palette.grey[200]}`,
              borderRadius: 2,
              // mx: 1,
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
