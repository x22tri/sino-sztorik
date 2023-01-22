import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material'
import { AssembledLesson } from '../../shared/interfaces'
import { TierStatusCircle } from '../tier-status-circle/TierStatusCircle'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
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

  const minWidth = '360px'
  const height = '480px'

  return (
    <Box
      marginTop={1}
      position='relative'
      sx={{
        ':after': {
          background: `linear-gradient(180deg, 
${canScrollUp ? `${palette.background.default} 0%, rgba(0,0,0,0) 10%` : ''} 
${canScrollUp && canScrollDown ? ',' : ''}
${canScrollDown ? `rgba(0,0,0,0) 90%, ${palette.background.default} 100%` : ''}
          )`,
          bottom: 0,
          content: '""',
          height: '100%',
          pointerEvents: 'none',
          position: 'absolute',
          width: '100%',
        },
      }}
    >
      <List
        disablePadding
        onScroll={({ target }) => handleScroll(target as HTMLUListElement)}
        sx={{
          ml: 1,
          pr: 1,
          borderTop: canScrollUp ? `2px solid ${palette.grey[300]}` : null,
          borderBottom: canScrollDown ? `2px solid ${palette.grey[300]}` : null,
          minWidth,
          height: isSmallScreen ? undefined : height,
          overflow: isSmallScreen ? 'none' : 'scroll',
        }}
      >
        {lessons.map(({ lessonNumber, tierStatuses }) => (
          <ListItem
            disablePadding
            disableGutters
            key={lessonNumber}
            sx={{ mt: lessonNumber === 1 ? 0 : 1 }}
          >
            <ListItemButton
              disableGutters
              onClick={() => setSelectedLessonNumber(lessonNumber)}
              sx={{
                backgroundColor: 'background.paper',
                border: `1px solid ${palette.grey[200]}`,
                borderRadius: 2,
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
    </Box>
  )
}
