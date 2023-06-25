import { faBookOpen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Stack } from '@mui/material'
import { BlueprintStepType } from './Timeline'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { AddOccurrence } from './AddOccurrenceOptions'
import { SortedOccurrence, isUnset } from '../../shared/logic/loadAdminChar'

export function Actions({
  deleteEntry,
  index,
  occurrence,
}: {
  deleteEntry: (source: number) => void
  index: number
  occurrence: SortedOccurrence
}) {
  // const canAddStory = !('story' in occurrence) && ['keyword', 'primitive', 'keywordAndPrimitive'].includes(occurrence.type)
  const canAddStory = false

  const canEditStory = 'story' in occurrence

  const canBeDeleted = !isUnset(occurrence)
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
