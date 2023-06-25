import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { Box, useTheme, Tooltip, SxProps } from '@mui/material'
import { When } from 'react-if'
import { SortedCharacterEntry, SortedOccurrence, SortedOccurrences, isReminder, isUnset } from '../../shared/logic/loadAdminChar'
import { OccurrenceContent } from './OccurrenceContent'
import { CourseLocation } from './CourseLocation'
import { Actions } from './Actions'
import { forwardRef, ForwardedRef } from 'react'
import { OccurrenceType, OccurrencePresentation } from '../../shared/MOCK_DATABASE_ENTRIES'
import { getReminderContentType } from './getReminderContentType'

export function Occurrence({
  addEntry,
  character,
  index,
  deleteEntry,
  occurrence,
  occurrences,
}: {
  addEntry: (atIndex: number, type: OccurrenceType) => void
  character: SortedCharacterEntry
  index: number
  deleteEntry: (source: number) => void
  occurrence: SortedOccurrence
  occurrences: SortedOccurrences
}) {
  const reminder = isReminder(occurrence)

  const currentOccurrence = occurrences[index]

  const contentType: OccurrencePresentation =
    'withhold' in currentOccurrence
      ? currentOccurrence.withhold === 'keyword'
        ? 'primitive'
        : currentOccurrence.withhold === 'primitive'
        ? 'keyword'
        : currentOccurrence.withhold === 'constituents'
        ? 'keywordLite'
        : 'unset' // Should not happen
      : reminder
      ? getReminderContentType(character, occurrences, index)
      : isUnset(currentOccurrence)
      ? 'unset'
      : !('keyword' in character)
      ? 'primitive'
      : !('primitive' in character)
      ? 'keyword'
      : 'keywordAndPrimitive'

  const sx = useStepContentStyles(reminder, contentType)

  return (
    <Box
      borderRadius={({ spacing }) => spacing(6)}
      display='grid'
      minHeight={({ spacing }) => spacing(10)}
      pr={3}
      pl={2}
      sx={{ grid: `"location content actions" auto / 1fr 7fr 1fr`, ...sx }}
    >
      <When condition={!isUnset(occurrence)}>
        <CourseLocation
          tier={occurrence.tier}
          lessonNumber={character.lessonNumber}
          indexInLesson={'index' in occurrence ? occurrence.index : 0}
        />
      </When>

      <Box alignItems='center' display='flex' margin='auto' gridArea='content'>
        <When condition={reminder}>
          <ReminderIcon />
        </When>

        <OccurrenceContent type={contentType} {...{ addEntry, character, index, occurrences }} />
      </Box>

      <Actions {...{ occurrence, occurrences, deleteEntry, index }} />
    </Box>
  )
}

function ReminderIcon() {
  const { palette } = useTheme()

  return (
    <Tooltip title='Emlékeztető'>
      <IconForwardRef color={palette.warning.main} icon={faBell} transform='shrink-4' style={{ marginRight: '4px' }} />
    </Tooltip>
  )
}

const IconForwardRef = forwardRef((props: FontAwesomeIconProps, ref: ForwardedRef<HTMLOrSVGElement>) => {
  return <FontAwesomeIcon forwardedRef={ref} {...props}></FontAwesomeIcon>
})

function useStepContentStyles(isReminder: boolean, type: OccurrencePresentation | null): SxProps {
  const { palette } = useTheme()

  if (isReminder) {
    switch (type) {
      case 'keyword':
        return { background: palette.background.paper, border: `3px solid ${palette.primary.main}` }
      case 'keywordLite':
        return { background: palette.background.paper, border: `3px solid ${palette.primary[100]}` }
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
      case 'keywordLite':
        return { background: palette.primary[50]!, color: palette.primary.main }
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
