import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { AssembledLesson } from '../../shared/interfaces'
import { TierStatusCircle } from '../../lesson-select-new/tier-status-circle/TierStatusCircle'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { useOnChange } from '../../shared/hooks/useOnChange'
import { useSwiperInstance } from '../../shared/state'

const listMinWidth = 360
const listHeight = 480
const listItemHeight = 65
const listItemGap = 8

export function PreviewRow({
  areDetailsShown,
  lessons,
  selectedLessonNumber,
  setSelectedLessonNumber,
  showDetailsOnMobile,
}: {
  areDetailsShown: boolean
  lessons: AssembledLesson[]
  selectedLessonNumber: number
  setSelectedLessonNumber: Dispatch<SetStateAction<number>>
  showDetailsOnMobile: Dispatch<SetStateAction<boolean>>
}) {
  const { constants, palette, typography } = useTheme()

  const isSmallScreen = useSmallScreen()

  const { swiperInstance } = useSwiperInstance()

  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(true)

  const listRef = useRef<HTMLUListElement>(null)

  const updateEdges = (target: HTMLUListElement) => {
    if (isSmallScreen) {
      return
    }

    const { scrollHeight, scrollTop, clientHeight } = target

    setCanScrollUp(scrollTop !== 0)
    setCanScrollDown(scrollHeight - scrollTop !== clientHeight)
  }

  function selectLesson(lesson: number) {
    swiperInstance?.slideTo(lesson - 1)
    setSelectedLessonNumber(lesson)
    showDetailsOnMobile(true)
  }

  function scrollToLesson(lesson: number | null): void {
    if (lesson === null) {
      return
    }

    listRef.current?.scrollTo({
      top: (listItemHeight + listItemGap) * (lesson - 1) + listItemHeight / 2 - listHeight / 2,
      behavior: 'smooth',
    })
  }

  useOnChange(selectedLessonNumber, () => scrollToLesson(selectedLessonNumber))

  useOnChange(areDetailsShown, () => scrollToLesson(selectedLessonNumber))

  return (
    <Box
      marginY={1}
      position='relative'
      sx={{
        ':after': {
          background: isSmallScreen
            ? undefined
            : `linear-gradient(180deg, 
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
        onScroll={({ target }) => updateEdges(target as HTMLUListElement)}
        ref={listRef}
        sx={{
          ml: 1,
          pr: 1,
          minWidth: `${listMinWidth}px`,
          height: isSmallScreen ? undefined : `${listHeight}px`,
          overflow: isSmallScreen ? 'none' : 'scroll',
        }}
      >
        {lessons.map(({ lessonNumber, tierStatuses }) => (
          <ListItem disablePadding disableGutters key={lessonNumber} sx={{ mt: lessonNumber === 1 ? 0 : 1 }}>
            <ListItemButton
              disableGutters
              onClick={() => selectLesson(lessonNumber)}
              sx={{
                backgroundColor: selectedLessonNumber === lessonNumber && !isSmallScreen ? 'primary.light' : 'background.paper',
                border: `1px solid ${palette.grey[200]}`,
                borderRadius: 2,
                transition: `${constants.animationDuration}ms`,
                height: `${listItemHeight}px`,
                padding: 0,
                '.MuiListItemText-multiline': {
                  display: 'flex',
                  flexDirection: 'column-reverse',
                },
                '&:hover': {
                  backgroundColor: selectedLessonNumber === lessonNumber && !isSmallScreen ? 'primary.lightHovered' : undefined,
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
