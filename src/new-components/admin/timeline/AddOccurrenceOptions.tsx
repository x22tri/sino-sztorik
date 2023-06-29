import { faKey, faCube, faBell, IconDefinition, faPlus, faPen, faStar, faPersonRunning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Stack, Divider, Tooltip, IconButton } from '@mui/material'
import { SortedCharacterEntry, SortedOccurrences } from '../../shared/logic/loadAdminChar'
import { isWithheldOccurrence } from '../utils/occurrence-utils'
import { isFullOccurrence } from '../utils/occurrence-utils'
import { isValidTierForReminder } from './getReminderContentType'
import { OccurrenceType } from '../../shared/MOCK_DATABASE_ENTRIES'

export function AddOccurrenceOptions({
  addEntry,
  character,
  occurrences,
  index,
}: {
  addEntry: (atIndex: number, type: OccurrenceType) => void
  character: SortedCharacterEntry
  occurrences: SortedOccurrences
  index: number
}) {
  const canAddFullOccurrence =
    !occurrences.some(occurrence => isFullOccurrence(occurrence)) &&
    !occurrences.some((occurrence, i) => i > index && isWithheldOccurrence(occurrence))

  const canAddReminder = isValidTierForReminder(occurrences, index)

  const primitiveInChar = 'primitive' in character

  const canAddWithheldBase =
    'keyword' in character &&
    !occurrences.some(occurrence => isWithheldOccurrence(occurrence)) &&
    occurrences.some((occurrence, i) => i > index && isFullOccurrence(occurrence))

  const canAddWithheldPrimitiveOccurrence = canAddWithheldBase && primitiveInChar

  const canAddWithheldKeywordOccurrence = canAddWithheldPrimitiveOccurrence

  const canAddWithheldConstituentsOccurrence = canAddWithheldBase && !primitiveInChar

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

      {!canAddWithheldConstituentsOccurrence ? (
        false
      ) : (
        <AddOccurrence
          icon={faPersonRunning}
          tooltip='Először csak felületes bevezetés'
          onClick={() => addEntry(index, 'withheldConstituents')}
        />
      )}

      {!canAddFullOccurrence ? (
        false
      ) : (
        <AddOccurrence
          icon={faStar}
          tooltip='Teljes karakter bevezetése ebben a körben'
          onClick={() => addEntry(index, 'full')}
        />
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
