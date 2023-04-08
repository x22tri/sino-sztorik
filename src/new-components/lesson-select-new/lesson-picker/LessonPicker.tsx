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
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { useWindowSize } from '../../shared/hooks/useWindowSize'
import { useOnChange } from '../../shared/hooks/useOnChange'
import { Else, If, Then } from 'react-if'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons'
import { LESSON_SELECT_TITLE } from '../../shared/strings'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useSwiperInstance } from '../../shared/state'
import { AssembledLesson } from '../../shared/interfaces'
import { constants } from 'buffer'
import { Wrap } from '../../shared/utility-components'
import { useLessonSelect } from '../../lesson-select/logic/useLessonSelect'

const listItemHeight = 80
const listItemGap = 0

export default function LessonPicker({}: // mobileOpen,
// setMobileOpen,
// lessons,
// selectedLessonNumber,
// setSelectedLessonNumber,
{
  // mobileOpen: boolean
  // setMobileOpen: Dispatch<SetStateAction<boolean>>
  // lessons: AssembledLesson[]
  // selectedLessonNumber: number
  // setSelectedLessonNumber: (lesson: number) => void
}) {
  const { constants } = useTheme()
  const isSmallScreen = useSmallScreen()
  const { isOpen, lessons, select, selected, toggle } = useLessonSelect()

  return (
    <Wrap
      if={isSmallScreen}
      with={children => (
        <Drawer
          ModalProps={{ keepMounted: true }}
          open={isOpen}
          onClose={toggle}
          variant='temporary'
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: constants.drawerWidth,
            },
          }}
        >
          {children}
        </Drawer>
      )}
    >
      <LessonPickerContent
      // {...{
      //   lessons,
      //   selectedLessonNumber,
      //   setSelectedLessonNumber,
      //   setMobileOpen,
      // }}
      />
    </Wrap>
  )
}

function LessonPickerContent({}: // lessons,
// selectedLessonNumber,
// setMobileOpen,
// setSelectedLessonNumber,
{
  // lessons: AssembledLesson[]
  // selectedLessonNumber: number
  // setMobileOpen: Dispatch<SetStateAction<boolean>>
  // setSelectedLessonNumber: (lesson: number) => void
}) {
  const { constants, palette, typography } = useTheme()

  const listRef = useRef<HTMLUListElement>(null)

  const { lessons, select, selected, toggle } = useLessonSelect()

  const { height } = useWindowSize()

  const { swiperInstance } = useSwiperInstance()

  function selectLesson(lesson: number) {
    swiperInstance?.slideTo(lesson - 1)
    // setSelectedLessonNumber(lesson)
    // setMobileOpen(false)
    select(lesson)
    toggle()
  }

  function scrollToLesson(lesson: number | null): void {
    if (lesson === null || height === undefined) {
      return
    }

    listRef.current?.scrollTo({
      top:
        (listItemHeight + listItemGap) * (lesson - 1) +
        listItemHeight / 2 -
        height / 2,
      behavior: 'smooth',
    })
  }

  useOnChange(selected, () => scrollToLesson(selected!))

  return (
    <List
      ref={listRef}
      subheader={<LessonPickerTitle />}
      sx={{
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        overflow: 'auto',
        width: constants.drawerWidth,
        backgroundColor: palette.background.paper,
      }}
    >
      {lessons.map(({ lessonNumber, tierStatuses }) => (
        <ListItem disablePadding disableGutters key={lessonNumber}>
          <ListItemButton
            onClick={() => selectLesson(lessonNumber)}
            sx={{
              backgroundColor:
                selected === lessonNumber
                  ? 'primary.light'
                  : 'background.paper',
              transition: `${constants.animationDuration}ms`,
              '&:hover': {
                backgroundColor:
                  selected === lessonNumber
                    ? 'primary.lightHovered'
                    : undefined,
              },
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
