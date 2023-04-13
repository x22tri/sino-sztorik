import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
  useTheme,
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { AssembledLesson } from '../../shared/interfaces'
import { CHARACTER_AMOUNT_LABEL, LEARN_BUTTON, LESSON_START_MORE_OPTIONS } from '../../shared/strings'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { useLargeScreen } from '../../shared/hooks/useLargeScreen'
import { Else, If, Then, When } from 'react-if'
import { MajorActionButton } from '../../shared/components/MajorActionButton'
import { useState, useRef } from 'react'
import { LearnReviewButton } from './LearnReviewButton'

export function LessonStart({ lesson }: { lesson: AssembledLesson }) {
  const isSmallScreen = useSmallScreen()
  const isLargeScreen = useLargeScreen()
  const { constants } = useTheme()
  const { characters } = lesson

  // const options = ['Tanulás', 'Ismétlés']

  return (
    <Box
      alignItems='center'
      bottom={0}
      display='grid'
      gap={2}
      gridTemplateColumns={`repeat(${isLargeScreen ? 4 : 3}, 1fr)`}
      height={constants.lessonStartMobileHeight}
      paddingX={2}
      position='sticky'
      width='100%'
      zIndex={1}
      sx={{ bgcolor: 'background.paper', boxShadow: constants.boxShadowLessonSelect, clipPath: 'inset(0px 0px 0px -20px)' }}
    >
      {/* <Typography variant='h6' color='text.secondary'>{`${characters.length} ${CHARACTER_AMOUNT_LABEL}`}</Typography> */}
      <Box /> {/* Spacer */}
      {/* <MajorActionButton text={LEARN_BUTTON} sx={{ alignSelf: 'center', maxHeight: '42px', width: '100%' }} /> */}
      <LearnReviewButton />
      <When condition={isLargeScreen}>
        <Box /> {/* Spacer */}
      </When>
      <If condition={isLargeScreen}>
        <Then>
          <Box /> {/* Spacer */}
        </Then>
        <Else>{/* 6 karakter */}</Else>
      </If>
    </Box>
  )
}
