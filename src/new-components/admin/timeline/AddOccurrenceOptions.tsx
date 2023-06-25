import { faKey, faCube, faBell, IconDefinition, faPlus, faPen, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Stack, Divider, Tooltip, IconButton } from '@mui/material'
import { SortedCharacterEntry, SortedOccurrences, isFullOccurrence, isWithheldOccurrence } from '../../shared/logic/loadAdminChar'
import { BlueprintStepType } from './Timeline'
import { getReminderContentType, isValidTierForReminder } from './getReminderContentType'
import { OccurrenceEnum } from '../../shared/MOCK_DATABASE_ENTRIES'

export function AddOccurrenceOptions({
  addEntry,
  character,
  occurrences,
  index,
}: {
  addEntry: (atIndex: number, type: OccurrenceEnum) => void
  character: SortedCharacterEntry
  occurrences: SortedOccurrences
  index: number
}) {
  const canAddFullOccurrence =
    !occurrences.some(occurrence => isFullOccurrence(occurrence)) &&
    !occurrences.some((occurrence, i) => i > index && isWithheldOccurrence(occurrence))

  const canAddReminder = isValidTierForReminder(occurrences, index)

  const canAddWithheldPrimitiveOccurrence =
    'keyword' in character &&
    'primitive' in character &&
    !occurrences.some(occurrence => isWithheldOccurrence(occurrence)) &&
    occurrences.some((occurrence, i) => i > index && isFullOccurrence(occurrence))

  const canAddWithheldKeywordOccurrence =
    'keyword' in character &&
    'primitive' in character &&
    !occurrences.some(occurrence => isWithheldOccurrence(occurrence)) &&
    occurrences.some((occurrence, i) => i > index && isFullOccurrence(occurrence))

  const canAddWithheldConstituentsOccurrence =
    'keyword' in character &&
    !('primitive' in character) &&
    !occurrences.some(occurrence => isWithheldOccurrence(occurrence)) &&
    occurrences.some((occurrence, i) => i > index && isFullOccurrence(occurrence))

  /* 
  
  should be:
   canAddFullOccurrence = if occurrences does not include one already (whether keyword, primitive or k/p depends on what char has)
    the icon, tooltip and OccurrenceContent should reflect that
    and if no withheld are present after

  canAddReminderOccurrence = if previous occurrences include at least one non-unset

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
      {!canAddWithheldPrimitiveOccurrence ? (
        false
      ) : (
        <AddOccurrence
          icon={faKey}
          tooltip='Először csak a kulcsszó bevezetése'
          onClick={() => addEntry(index, 'withheldPrimitive')}
        />
      )}

      {!canAddWithheldKeywordOccurrence ? (
        false
      ) : (
        <AddOccurrence
          icon={faCube}
          tooltip='Először csak az alapelem bevezetése'
          onClick={() => addEntry(index, 'withheldKeyword')}
        />
      )}

      {!canAddFullOccurrence ? (
        false
      ) : (
        <AddOccurrence icon={faStar} tooltip='Karakter bevezetése ebben a körben' onClick={() => addEntry(index, 'full')} />
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
