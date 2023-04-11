import { Accordion, AccordionDetails, AccordionSummary, Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { useSmallScreen } from '../../shared/hooks/useSmallScreen'
import { LearnButton } from './LearnButton'
import { AssembledLesson } from '../../shared/interfaces'
import { CHARACTER_AMOUNT_LABEL, LESSON_START_MORE_OPTIONS } from '../../shared/strings'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { useLargeScreen } from '../../shared/hooks/useLargeScreen'
import { Else, If, Then, When } from 'react-if'

export function LessonStart({ lesson }: { lesson: AssembledLesson }) {
  const isSmallScreen = useSmallScreen()
  const isLargeScreen = useLargeScreen()
  const { constants } = useTheme()
  const { characters } = lesson

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
      <Typography variant='h6' color='text.secondary'>{`${characters.length} ${CHARACTER_AMOUNT_LABEL}`}</Typography>

      <Box>
        <LearnButton />
      </Box>

      <When condition={isLargeScreen}>
        <Box />
      </When>

      <If condition={isSmallScreen}>
        <Then>
          <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', marginLeft: 'auto', width: '37px' }}>
            <ToolbarButton
              ariaLabel={LESSON_START_MORE_OPTIONS}
              icon={faEllipsisVertical}
              onClick={() => {}}
              tooltip={LESSON_START_MORE_OPTIONS}
            />
          </Box>
        </Then>
        <Else>
          {/* To-Do: Add "Review" when applicable */}
          <Button
            color='neutral'
            endIcon={<FontAwesomeIcon icon={faChevronUp} style={{ transform: 'scale(0.85)' }} />}
            sx={{ justifySelf: 'flex-end', maxWidth: 'fit-content' }}
          >
            {LESSON_START_MORE_OPTIONS}
          </Button>
        </Else>
      </If>
    </Box>
  )
}
