import { faPencil, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, useTheme, Stack, Button, Typography } from '@mui/material'
import { OccurrenceType, SortedOccurrence, OccurrencePresentation } from '../../../../shared/MOCK_DATABASE_ENTRIES'
import { CharFormData, CharTimelineData } from '../../../../shared/route-loaders/loadCharEdit'
import { isPresent } from '../../utils/char-form-utils'
import { isReminder, isUnset } from '../../utils/occurrence-utils'
import { OccurrenceContent } from '../OccurrenceContent'
import { getReminderContentType } from '../getReminderContentType'
import { AddOccurrenceOptions } from '../AddOccurrenceOptions'
import { BlueprintChip } from '../blueprint-chip/BlueprintChip'
import { CourseLocation } from '../course-location/CourseLocation'

export function Occurrence({
  addEntry,
  calculatedIndex,
  charFormData,
  index,
  deleteEntry,
  occurrence,
  timelineData,
}: {
  addEntry: (atIndex: number, type: OccurrenceType) => void
  calculatedIndex: number
  charFormData: CharFormData
  index: number
  deleteEntry: (source: number) => void
  occurrence: SortedOccurrence
  timelineData: CharTimelineData
}) {
  const { palette, spacing } = useTheme()
  const reminder = isReminder(occurrence)

  const currentOccurrence = timelineData[index]

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
      ? getReminderContentType(charFormData, timelineData, index)
      : isUnset(currentOccurrence)
      ? 'unset'
      : !isPresent(charFormData, 'keyword')
      ? 'primitive'
      : !isPresent(charFormData, 'primitive')
      ? 'keyword'
      : 'keywordAndPrimitive'

  return (
    <Stack
      bgcolor={contentType === 'unset' ? 'grey.50' : 'background.default'}
      borderRadius={spacing(2)}
      gap={1}
      justifyContent='center'
      minHeight='200px'
      sx={{
        outline: contentType === 'unset' ? `2px dashed ${palette.text.disabled}` : 'none',
        outlineOffset: '-6px',
      }}
    >
      {contentType === 'unset' ? (
        <Stack alignItems='center' gap={2}>
          <Typography color='text.secondary'>{`${index === 0 ? 'Az' : 'A'} ${index + 1}. körben nem jelenik meg`}</Typography>

          <AddOccurrenceOptions {...{ addEntry, charFormData, timelineData, index }} />
        </Stack>
      ) : (
        <>
          <Box alignItems='center' display='flex' justifyContent='space-between'>
            <BlueprintChip isReminder={reminder} type={contentType} />

            <Button
              color='error'
              endIcon={<FontAwesomeIcon icon={faXmark} />}
              onClick={() => deleteEntry(index)}
              sx={{ '.MuiButton-endIcon': { marginLeft: spacing(0.75), marginBottom: '-3px' } }}
            >
              Változat törlése
            </Button>
          </Box>

          <Box alignItems='center' display='flex' mt={1}>
            <OccurrenceContent type={contentType} {...{ addEntry, charFormData, index, timelineData }} />
          </Box>

          {'index' in occurrence && (
            <CourseLocation tier={occurrence.tier} lessonNumber={charFormData.lessonNumber} index={occurrence.index} />
          )}

          <Stack
            alignItems='center'
            direction={{ xs: 'column', md: 'row' }}
            gap={1.5}
            justifyContent={{ xs: 'center', md: 'space-between' }}
            mt={3}
          >
            <Box color={!('story' in occurrence) ? 'error.main' : 'text.primary'}>
              {'story' in occurrence ? 'Történet' : 'Nincs megadva történet'}
            </Box>

            <Button
              startIcon={<FontAwesomeIcon icon={'story' in occurrence ? faPencil : faPlus} transform='shrink-4' />}
              variant={'story' in occurrence ? 'text' : 'contained'}
              sx={{ '.MuiButton-startIcon': { marginRight: spacing(0.5) } }}
            >
              {'story' in occurrence ? 'Történet szerkesztése' : 'Történet hozzáadása'}
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  )
}
