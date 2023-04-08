import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'
import { TierStatusCircle } from '../../lesson-select/tier-status-circle/TierStatusCircle'
import { LESSONS } from '../../shared/MOCK_LESSONS'
import { useOnChange, useSmallScreen } from '../../shared/utility-functions'
import { Else, If, Then } from 'react-if'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons'
import { LESSON_SELECT_TITLE } from '../../shared/strings'
import { Dispatch, SetStateAction, useRef } from 'react'
import { useSwiperInstance } from '../../shared/state'
import { AssembledLesson } from '../../shared/interfaces'

// const listMinWidth = 360
// const listHeight = 480
// const listItemHeight = 80
// const listItemGap = 8

export default function LessonPicker({
  mobileOpen,
  toggleDrawer,
  lessons,
  selectedLessonNumber,
  setSelectedLessonNumber,
}: {
  mobileOpen: boolean
  toggleDrawer: () => void
  lessons: AssembledLesson[]
  selectedLessonNumber: number
  setSelectedLessonNumber: Dispatch<SetStateAction<number>>
}) {
  const { constants, palette } = useTheme()
  const isSmallScreen = useSmallScreen()

  return (
    <If condition={isSmallScreen}>
      <Then>
        <Drawer
          ModalProps={{ keepMounted: true }}
          open={mobileOpen}
          onClose={toggleDrawer}
          variant='temporary'
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: constants.drawerWidth,
            },
          }}
        >
          <LessonPickerContent
            {...{ lessons, selectedLessonNumber, setSelectedLessonNumber }}
          />
        </Drawer>
      </Then>

      <Else>
        <Box
          bottom={0}
          top={0}
          left={0}
          right={0}
          position='absolute'
          overflow='auto'
          width={constants.drawerWidth}
          sx={{ backgroundColor: palette.background.paper }}
        >
          <LessonPickerContent
            {...{ lessons, selectedLessonNumber, setSelectedLessonNumber }}
          />
        </Box>
      </Else>
    </If>
  )
}

function LessonPickerContent({
  lessons,
  selectedLessonNumber,
  setSelectedLessonNumber,
}: {
  lessons: AssembledLesson[]
  selectedLessonNumber: number
  setSelectedLessonNumber: Dispatch<SetStateAction<number>>
}) {
  const { palette, typography } = useTheme()

  const listRef = useRef<HTMLUListElement>(null)

  const { swiperInstance } = useSwiperInstance()

  function selectLesson(lesson: number) {
    swiperInstance?.slideTo(lesson - 1)
    setSelectedLessonNumber(lesson)
  }

  function scrollToLesson(lesson: number | null): void {
    if (lesson === null) {
      return
    }

    // listRef.current?.scrollTo({
    //   top:
    //     (listItemHeight + listItemGap) * (lesson - 1) +
    //     listItemHeight / 2 -
    //     listHeight / 2,
    //   behavior: 'smooth',
    // })
  }

  useOnChange(selectedLessonNumber, () => scrollToLesson(selectedLessonNumber))

  return (
    <List ref={listRef} subheader={<LessonPickerTitle />}>
      {lessons.map(({ lessonNumber, tierStatuses }) => (
        <ListItem disablePadding disableGutters key={lessonNumber}>
          <ListItemButton
            onClick={() => selectLesson(lessonNumber)}
            sx={{
              '.MuiListItemText-multiline': {
                display: 'flex',
                flexDirection: 'column',
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

function LessonPickerTitle() {
  const { palette, spacing } = useTheme()

  return (
    <Accordion elevation={0}>
      <AccordionSummary
        expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
        sx={{ px: 2, py: 1 }}
      >
        <Typography variant='button' color={palette.grey[700]}>
          <FontAwesomeIcon
            icon={faGraduationCap}
            size='lg'
            style={{ marginRight: spacing(1) }}
          />
          {LESSON_SELECT_TITLE}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* To-Do: Add "Character Finder" etc. when applicable */}
      </AccordionDetails>
    </Accordion>
  )
}
