import { faBookOpen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Stack } from '@mui/material'
import { BlueprintStepType } from './Timeline'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { AddOccurrence } from './AddOccurrenceOptions'
import { SortedOccurrence, SortedOccurrences, isReminder, isUnset } from '../../shared/logic/loadAdminChar'
import { noOrphanedRemindersIfTierWasDeleted } from './getReminderContentType'

export function Actions({
  deleteEntry,
  index,
  occurrence,
  occurrences,
}: {
  deleteEntry: (source: number) => void
  index: number
  occurrence: SortedOccurrence
  occurrences: SortedOccurrences
}) {
  const canAddStory = 'story' in occurrence && occurrence.story.length === 0

  const canEditStory = 'story' in occurrence && occurrence.story.length !== 0

  const canBeDeleted = !isUnset(occurrence) && noOrphanedRemindersIfTierWasDeleted(occurrences, index)
  // occurrences.findIndex((occurrence, i) => {
  //   // console.log(i, index, occurrence)
  //   return i !== index && !(isUnset(occurrence) || isReminder(occurrence))
  // }) !== -1
  // cannot be deleted if later reminder would be the first non-unset element upon deletion

  return (
    <Stack alignItems='center' direction='row' gap={1.5} justifyContent='flex-end'>
      {!canAddStory ? false : <AddOccurrence icon={faBookOpen} isAction tooltip='Történet hozzáadása' onClick={() => {}} />}

      {!canEditStory ? (
        false
      ) : (
        <AddOccurrence icon={faBookOpen} isAction mode='edit' tooltip='Történet szerkesztése' onClick={() => {}} />
      )}

      {!canBeDeleted ? (
        false
      ) : (
        <ToolbarButton icon={faTrash} tooltip='Karakter törlése a körből' onClick={() => deleteEntry(index)} sx={{ p: 0 }} />
      )}
    </Stack>
  )
}
