import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, useTheme, Tooltip, SxProps } from '@mui/material'
import { BlueprintStepType } from './Timeline'
import { When } from 'react-if'
import { getReminderContentType } from './getReminderContentType'
import { PotentialOccurrence, SortedCharacterEntry, SortedOccurrences } from '../../shared/logic/loadAdminChar'
import { OccurrenceContent } from './OccurrenceContent'
import { CourseLocation } from './CourseLocation'
import { Actions } from './Actions'

export function Occurrence({
  addEntry,
  character,
  index,
  deleteEntry,
  occurrence,
  occurrences,
}: {
  addEntry: (atIndex: number, type: BlueprintStepType) => void
  character: SortedCharacterEntry
  index: number
  deleteEntry: (source: number) => void
  occurrence: PotentialOccurrence
  occurrences: SortedOccurrences
}) {
  const isReminder = occurrence.type === 'reminder'

  const contentType = isReminder ? getReminderContentType(occurrences, index) : occurrence.type

  const sx = useStepContentStyles(isReminder, contentType)

  return (
    <Box
      borderRadius={({ spacing }) => spacing(6)}
      display='grid'
      minHeight={({ spacing }) => spacing(10)}
      pr={3}
      pl={2}
      sx={{ grid: `"location content actions" auto / 1fr 7fr 1fr`, ...sx }}
    >
      <When condition={contentType !== 'unset'}>
        <CourseLocation
          tier={occurrence.tier}
          lessonNumber={character.lessonNumber}
          indexInLesson={'index' in occurrence ? occurrence.index : 0}
        />
      </When>

      <Box alignItems='center' display='flex' margin='auto' gridArea='content'>
        <When condition={isReminder}>
          <ReminderIcon />
        </When>

        <OccurrenceContent type={contentType} {...{ addEntry, character, index, occurrences }} />
      </Box>

      <Actions {...{ occurrence, contentType, deleteEntry, index }} />
    </Box>
  )
}

function useStepContentStyles(isReminder: boolean, type: BlueprintStepType | null): SxProps {
  const { palette } = useTheme()

  if (isReminder) {
    switch (type) {
      case 'keyword':
        return { background: palette.background.paper, border: `3px solid ${palette.primary.main}` }
      case 'primitive':
        return { background: palette.background.paper, border: `3px solid ${palette.secondary.main}` }
      case 'keywordAndPrimitive':
        return {
          background: palette.background.paper,
          border: `3px solid`,
          borderColor: `${palette.primary.main} ${palette.secondary.main} ${palette.secondary.main} ${palette.primary.main}`,
        }
      default:
        return {}
    }
  } else {
    switch (type) {
      case 'keyword':
        return { background: palette.primary[200]!, color: palette.primary.main }
      case 'primitive':
        return { background: palette.secondary[200]!, color: palette.secondary.main }
      case 'keywordAndPrimitive':
        return { background: `linear-gradient(150deg, ${palette.primary[200]} 25%, ${palette.secondary[200]} 75%)` }
      case 'unset':
        return {
          background: palette.grey[50],
          color: palette.text.disabled,
          outline: `2px dashed ${palette.text.disabled}`,
          outlineOffset: '-6px',
        }
      default:
        return {}
    }
  }
}

function ReminderIcon() {
  const { palette } = useTheme()

  return (
    <Tooltip title='Emlékeztető'>
      <span>
        <FontAwesomeIcon color={palette.warning.main} icon={faBell} transform='shrink-4' style={{ marginRight: '4px' }} />
      </span>
    </Tooltip>
  )
}
