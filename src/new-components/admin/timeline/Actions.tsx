import { faBookOpen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Stack } from '@mui/material'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { AddOccurrence } from './AddOccurrenceOptions'
import { SortedOccurrence, SortedOccurrences } from '../../shared/logic/loadAdminChar'
import { isReminder } from '../utils/occurrence-utils'
import { isUnset } from '../utils/occurrence-utils'
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
