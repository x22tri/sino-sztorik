import { faPencil, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, useTheme, Stack, Button, Typography, Drawer, Chip, SxProps } from '@mui/material'
import { OccurrenceType, SortedOccurrence, OccurrencePresentation, OccurrenceV3 } from '../../../../shared/MOCK_DATABASE_ENTRIES'
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
import { Link } from 'react-router-dom'

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

  const canBeDeleted = !isUnset(occurrence) && noOrphanedRemindersIfTierWasDeleted(timelineData, index)

  const occurrenceHasNoStory = 'story' in occurrence && occurrence.story.length === 0

  const noOccurrenceInTier = contentType === 'unset'

  function openStoryDrawer() {
    toggleStoryDrawer(true)
  }

  function closeStoryDrawer() {
    toggleStoryDrawer(false)
  }

  const bg = useStepContentStyles(reminder, contentType)

  return (
    <>
      <Stack
        bgcolor={noOccurrenceInTier ? 'grey.50' : 'background.default'}
        borderRadius={spacing(2)}
        gap={1}
        justifyContent='center'
        minHeight='200px'
        sx={{
          // border: noOccurrenceInTier ? 'none' : `1px solid ${palette.grey[300]}`,
          outline: noOccurrenceInTier ? `2px dashed ${palette.text.disabled}` : 'none',
          outlineOffset: '-6px',

          // ...bg,
        }}
      >
        {noOccurrenceInTier ? (
          <Stack alignItems='center' gap={2}>
            <Typography color='text.secondary'>{`${index === 0 ? 'Az' : 'A'} ${index + 1}. körben nem jelenik meg`}</Typography>

            <AddOccurrenceOptions {...{ addEntry, charFormData, timelineData, index }} />
          </Stack>
        ) : (
          <>
            <Box alignItems='center' display='flex' justifyContent='space-between'>
              <Stack direction='row' gap={1.5}>
                <BlueprintChip isReminder={reminder} type={contentType} />

                <Chip
                  component={Link}
                  label={`${(occurrence as OccurrenceV3).index}. karakter a leckében`}
                  to={`/admin/lessons/${charFormData.lessonNumber}`}
                  sx={{ ':hover': { cursor: 'pointer' } }}
                />
              </Stack>

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

            {/* <Box alignItems='center' display='flex' mt={1}>
              <OccurrenceContent type={contentType} {...{ addEntry, charFormData, index, timelineData }} />
            </Box> */}

            {/* {'index' in occurrence && <CourseLocation lessonNumber={charFormData.lessonNumber} index={occurrence.index} />} */}

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
                  {occurrenceHasNoStory ? 'Nincs megadva történet!' : 'Történet...'}
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
        return { background: `linear-gradient(150deg, ${palette.primary[200]} 25%, ${palette.secondary[200]} 60%)` }
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
