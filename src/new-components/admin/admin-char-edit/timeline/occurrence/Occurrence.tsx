import { faPencil, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, useTheme, Stack, Button, Typography, Drawer } from '@mui/material'
import { OccurrenceType, SortedOccurrence, OccurrencePresentation } from '../../../../shared/MOCK_DATABASE_ENTRIES'
import { CharFormData, CharTimelineData } from '../../../../shared/route-loaders/loadCharEdit'
import { isPresent } from '../../utils/char-form-utils'
import { isReminder, isUnset } from '../../utils/occurrence-utils'
import { OccurrenceContent } from '../OccurrenceContent'
import { getReminderContentType, noOrphanedRemindersIfTierWasDeleted } from '../getReminderContentType'
import { AddOccurrenceOptions } from '../AddOccurrenceOptions'
import { BlueprintChip } from '../blueprint-chip/BlueprintChip'
import { CourseLocation } from '../course-location/CourseLocation'
import { useState } from 'react'
import { StoryDrawerContent } from '../story-drawer-content/StoryDrawerContent'

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
  const { constants, palette, spacing } = useTheme()
  const [isStoryDrawerOpen, toggleStoryDrawer] = useState(false)
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

  const occurrenceHasNoStory = 'story' in occurrence && occurrence.story.length === 0

  const canBeDeleted = !isUnset(occurrence) && noOrphanedRemindersIfTierWasDeleted(timelineData, index)

  function openStoryDrawer() {
    toggleStoryDrawer(true)
  }

  function closeStoryDrawer() {
    toggleStoryDrawer(false)
  }

  return (
    <>
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
              {canBeDeleted && (
                <Button
                  color='error'
                  endIcon={<FontAwesomeIcon icon={faXmark} />}
                  onClick={() => deleteEntry(index)}
                  sx={{ '.MuiButton-endIcon': { marginLeft: spacing(0.75), marginBottom: '-3px' } }}
                >
                  Változat törlése
                </Button>
              )}
            </Box>

            <Box alignItems='center' display='flex' mt={1}>
              <OccurrenceContent type={contentType} {...{ addEntry, charFormData, index, timelineData }} />
            </Box>

            {'index' in occurrence && <CourseLocation lessonNumber={charFormData.lessonNumber} index={occurrence.index} />}

            {reminder ? (
              <Box color='text.disabled' mt={3}>
                Lásd a legutolsó történetet
              </Box>
            ) : (
              <Stack
                alignItems='center'
                direction={{ xs: 'column', md: 'row' }}
                gap={1.5}
                justifyContent={{ xs: 'center', md: 'space-between' }}
                mt={3}
              >
                <Box color={occurrenceHasNoStory ? 'error.main' : 'text.primary'}>
                  {occurrenceHasNoStory ? 'Nincs megadva történet!' : 'Történet'}
                </Box>

                <Button
                  onClick={openStoryDrawer}
                  startIcon={<FontAwesomeIcon icon={occurrenceHasNoStory ? faPlus : faPencil} transform='shrink-4' />}
                  variant={occurrenceHasNoStory ? 'contained' : 'text'}
                  sx={{ '.MuiButton-startIcon': { marginRight: spacing(0.5) } }}
                >
                  {occurrenceHasNoStory ? 'Történet hozzáadása' : 'Történet szerkesztése'}
                </Button>
              </Stack>
            )}
          </>
        )}
      </Stack>

      <Drawer
        anchor='right'
        open={isStoryDrawerOpen}
        onClose={closeStoryDrawer}
        sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', minWidth: `${constants.drawerWidth}px`, width: 0.5 } }}
      >
        <StoryDrawerContent />
      </Drawer>
    </>
  )
}
