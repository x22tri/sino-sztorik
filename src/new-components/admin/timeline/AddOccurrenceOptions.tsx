import { faKey, faCube, faBell, IconDefinition, faPlus, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Stack, Divider, Tooltip, IconButton } from '@mui/material'
import { SortedCharacterEntry, SortedOccurrences } from '../../shared/logic/loadAdminChar'
import { BlueprintStepType } from './Timeline'
import { getReminderContentType, isValidTierForReminder } from './getReminderContentType'

export function AddOccurrenceOptions({
  addEntry,
  character,
  occurrences,
  index,
}: {
  addEntry: (atIndex: number, type: BlueprintStepType) => void
  character: SortedCharacterEntry
  occurrences: SortedOccurrences
  index: number
}) {
  // const canAddKeyword = !occurrences.some(({ type }) => ['keyword', 'keywordAndPrimitive'].includes(type))
  const canAddKeyword = false

  // const canAddPrimitive = !occurrences.some(({ type }) => ['primitive', 'keywordAndPrimitive'].includes(type))
  const canAddPrimitive = false

  const canAddReminder = isValidTierForReminder(occurrences, index)
  // const canAddReminder = false

  /* 
  
  should be:
   canAddFullOccurrence = if occurrences does not include one already (whether keyword, primitive or k/p depends on what char has)
    the icon, tooltip and OccurrenceContent should reflect that

  canAddReminderOccurrence = if previous occurrences include at least one non-reminder

  canAddWithheldKeywordOccurrence = if keyword in char and primitive in char
  and occurrences do not have a withheld occurrence already
  (if later occurrences don't have a full occurrence, validation problem occurs)

  canAddWithheldPrimitiveOccurrence = if keyword in char and primitive in char
  and occurrences do not have a withheld occurrence already
  (if later occurrences don't have a full occurrence, validation problem occurs)

  canAddWithheldConstituentsOccurrence = if keyword in char and no primitive in char
  and occurrences do not have a withheld occurrence already
  (if later occurrences don't have a full occurrence, validation problem occurs)
  
  */

  return (
    <Stack direction='row' divider={<Divider flexItem orientation='vertical' />} gap={2}>
      {!canAddKeyword ? (
        false
      ) : (
        <AddOccurrence icon={faKey} tooltip='Kulcsszó hozzáadása' onClick={() => addEntry(index, 'keyword')} />
      )}

      {!canAddPrimitive ? (
        false
      ) : (
        <AddOccurrence icon={faCube} tooltip='Alapelem hozzáadása' onClick={() => addEntry(index, 'primitive')} />
      )}

      {!canAddReminder ? (
        false
      ) : (
        <AddOccurrence icon={faBell} tooltip='Emlékeztető hozzáadása' onClick={() => addEntry(index, 'reminder')} />
      )}
    </Stack>
  )
}

export function AddOccurrence({
  icon,
  isAction = false,
  tooltip,
  mode = 'add',
  onClick,
}: {
  icon: IconDefinition
  isAction?: boolean
  tooltip: string
  mode?: 'add' | 'edit'
  onClick: () => void
}) {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        className='fa-layers'
        {...{ onClick }}
        sx={{ color: isAction ? undefined : 'text.disabled', justifyContent: 'center' }}
      >
        <FontAwesomeIcon className='fa-fw' {...{ icon }} transform='left-4' />

        <FontAwesomeIcon icon={mode === 'add' ? faPlus : faPen} transform='shrink-6 up-9 right-9' />
      </IconButton>
    </Tooltip>
  )
}
