import { faKey, faCube, faBell, faStar, faPersonRunning } from '@fortawesome/free-solid-svg-icons'
import { Stack, Divider } from '@mui/material'
import { CharFormData, CharTimelineData } from '../../../shared/route-loaders/loadCharEdit'
import { isWithheldOccurrence } from '../utils/occurrence-utils'
import { isFullOccurrence } from '../utils/occurrence-utils'
import { isValidTierForReminder } from './getReminderContentType'
import { OccurrenceType } from '../../../shared/MOCK_DATABASE_ENTRIES'
import { isPresent } from '../utils/char-form-utils'
import { IconButtonAddOrEdit } from '../../shared/IconButtonAddOrEdit'

export function AddOccurrenceOptions({
  addEntry,
  charFormData,
  timelineData,
  index,
}: {
  addEntry: (atIndex: number, type: OccurrenceType) => void
  charFormData: CharFormData
  timelineData: CharTimelineData
  index: number
}) {
  const canAddFullOccurrence =
    !timelineData.some(occurrence => isFullOccurrence(occurrence)) &&
    !timelineData.some((occurrence, i) => i > index && isWithheldOccurrence(occurrence))

  const canAddReminder = isValidTierForReminder(timelineData, index)

  const primitiveInChar = isPresent(charFormData, 'primitive')

  const canAddWithheldBase =
    isPresent(charFormData, 'keyword') &&
    !timelineData.some(occurrence => isWithheldOccurrence(occurrence)) &&
    timelineData.some((occurrence, i) => i > index && isFullOccurrence(occurrence))

  const canAddWithheldPrimitiveOccurrence = canAddWithheldBase && primitiveInChar

  const canAddWithheldKeywordOccurrence = canAddWithheldPrimitiveOccurrence

  const canAddWithheldConstituentsOccurrence = canAddWithheldBase && !primitiveInChar

  return (
    <Stack direction='row' divider={<Divider flexItem orientation='vertical' />} gap={2}>
      {!canAddWithheldPrimitiveOccurrence ? (
        false
      ) : (
        <IconButtonAddOrEdit
          icon={faKey}
          tooltip='Először csak a kulcsszó bevezetése'
          onClick={() => addEntry(index, 'withheldPrimitive')}
        />
      )}

      {!canAddWithheldKeywordOccurrence ? (
        false
      ) : (
        <IconButtonAddOrEdit
          icon={faCube}
          tooltip='Először csak az alapelem bevezetése'
          onClick={() => addEntry(index, 'withheldKeyword')}
        />
      )}

      {!canAddWithheldConstituentsOccurrence ? (
        false
      ) : (
        <IconButtonAddOrEdit
          icon={faPersonRunning}
          tooltip='Először csak felületes bevezetés'
          onClick={() => addEntry(index, 'withheldConstituents')}
        />
      )}

      {!canAddFullOccurrence ? (
        false
      ) : (
        <IconButtonAddOrEdit
          icon={faStar}
          tooltip='Teljes karakter bevezetése ebben a körben'
          onClick={() => addEntry(index, 'full')}
        />
      )}

      {!canAddReminder ? (
        false
      ) : (
        <IconButtonAddOrEdit icon={faBell} tooltip='Emlékeztető hozzáadása' onClick={() => addEntry(index, 'reminder')} />
      )}
    </Stack>
  )
}
