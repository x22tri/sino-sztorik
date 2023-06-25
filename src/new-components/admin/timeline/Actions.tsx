import { faBookOpen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Stack } from '@mui/material'
import { BlueprintStepType } from './Timeline'
import ToolbarButton from '../../shared/components/ToolbarButton'
import { PotentialOccurrence } from '../../shared/logic/loadAdminChar'
import { AddOccurrence } from './AddOccurrenceOptions'

export function Actions({
  contentType,
  deleteEntry,
  index,
  occurrence,
}: {
  contentType: BlueprintStepType | null
  deleteEntry: (source: number) => void
  index: number
  occurrence: PotentialOccurrence
}) {
  const canAddStory = !('story' in occurrence) && ['keyword', 'primitive', 'keywordAndPrimitive'].includes(occurrence.type)

  const canEditStory = 'story' in occurrence

  const canBeDeleted = contentType !== 'unset'

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
