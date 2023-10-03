import { faKey, faCube, faBell, faStar, faPersonRunning } from '@fortawesome/free-solid-svg-icons'
import { Stack, Button, useTheme, Box } from '@mui/material'
import { CharFormData, CharTimelineData } from '../../../../shared/route-loaders/loadCharEdit'
import { isWithheldOccurrence } from '../../utils/occurrence-utils'
import { isFullOccurrence } from '../../utils/occurrence-utils'
import { isValidTierForReminder } from '../../utils/char-form-utils'
import { OccurrenceType } from '../../../../shared/MOCK_DATABASE_ENTRIES'
import { isPresent } from '../../utils/char-form-utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  const { spacing } = useTheme()

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

  const noOptions = !(
    canAddWithheldPrimitiveOccurrence ||
    canAddWithheldKeywordOccurrence ||
    canAddWithheldConstituentsOccurrence ||
    canAddFullOccurrence ||
    canAddReminder
  )

  if (noOptions) {
    return null
  }

  return (
    <Stack gap={1}>
      {!canAddWithheldPrimitiveOccurrence ? (
        false
      ) : (
        <Button
          onClick={() => addEntry(index, 'withheldPrimitive')}
          startIcon={<FontAwesomeIcon icon={faKey} transform='shrink-4' />}
          variant='outlined'
          sx={{ '.MuiButton-startIcon': { marginRight: spacing(0.5) } }}
        >
          Először csak a kulcsszó bevezetése
        </Button>
      )}

      {!canAddWithheldKeywordOccurrence ? (
        false
      ) : (
        <Button
          onClick={() => addEntry(index, 'withheldKeyword')}
          startIcon={<FontAwesomeIcon icon={faCube} transform='shrink-4' />}
          variant='outlined'
          sx={{ '.MuiButton-startIcon': { marginRight: spacing(0.5) } }}
        >
          Először csak az alapelem bevezetése
        </Button>
      )}

      {!canAddWithheldConstituentsOccurrence ? (
        false
      ) : (
        <Button
          onClick={() => addEntry(index, 'withheldConstituents')}
          startIcon={<FontAwesomeIcon icon={faPersonRunning} transform='shrink-4' />}
          variant='outlined'
          sx={{ '.MuiButton-startIcon': { marginRight: spacing(0.5) } }}
        >
          Először csak felületes bevezetés
        </Button>
      )}

      {!canAddFullOccurrence ? (
        false
      ) : (
        <Button
          onClick={() => addEntry(index, 'full')}
          startIcon={<FontAwesomeIcon icon={faStar} transform='shrink-4' />}
          variant='outlined'
          sx={{ '.MuiButton-startIcon': { marginRight: spacing(0.5) } }}
        >
          Teljes karakter bevezetése ebben a körben
        </Button>
      )}

      {!canAddReminder ? (
        false
      ) : (
        <Button
          onClick={() => addEntry(index, 'reminder')}
          startIcon={<FontAwesomeIcon icon={faBell} transform='shrink-4' />}
          variant='outlined'
          sx={{ '.MuiButton-startIcon': { marginRight: spacing(0.5) } }}
        >
          Emlékeztető hozzáadása
        </Button>
      )}
    </Stack>
  )
}
