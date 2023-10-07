import { CharFormData, CharTimelineData } from '../../../../shared/route-loaders/loadCharEdit'
import { faBell, faCube, faKey, faPersonRunning, faStar } from '@fortawesome/free-solid-svg-icons'
import { isFullOccurrence, isWithheldOccurrence } from '../../utils/occurrence-utils'
import { isPresent, isValidTierForReminder } from '../../utils/char-form-utils'
import { OverviewLink } from '../../../shared/overview-link/OverviewLink'

export function AddOccurrenceOptions({
  charFormData,
  tier,
  timelineData,
}: {
  charFormData: CharFormData
  tier: number
  timelineData: CharTimelineData
}) {
  const index = tier - 1

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
    <>
      {!canAddWithheldPrimitiveOccurrence ? (
        false
      ) : (
        <OverviewLink
          icon={faKey}
          link={`story/${tier}`}
          state={{ mode: 'add', title: 'Kulcsszó bevezetése', type: 'withheldPrimitive' }}
          text='Először csak a kulcsszó bevezetése'
        />
      )}

      {!canAddWithheldKeywordOccurrence ? (
        false
      ) : (
        <OverviewLink
          icon={faCube}
          link={`story/${tier}`}
          state={{ mode: 'add', title: 'Alapelem bevezetése', type: 'withheldKeyword' }}
          text='Először csak az alapelem bevezetése'
        />
      )}

      {!canAddWithheldConstituentsOccurrence ? (
        false
      ) : (
        <OverviewLink
          icon={faPersonRunning}
          link={`story/${tier}`}
          state={{ mode: 'add', title: 'Felületes bevezetés', type: 'withheldConstituents' }}
          text='Először csak felületes bevezetés'
        />
      )}

      {!canAddFullOccurrence ? (
        false
      ) : (
        <OverviewLink
          icon={faStar}
          link={`story/${tier}`}
          state={{ mode: 'add', title: 'Teljes karakter bevezetése', type: 'full' }}
          text='Teljes karakter bevezetése'
        />
      )}

      {!canAddReminder ? (
        false
      ) : (
        <OverviewLink
          icon={faBell}
          link={`story/${tier}`}
          state={{ mode: 'add', title: 'Emlékeztető hozzáadása', type: 'reminder' }}
          text='Emlékeztető hozzáadása'
        />
      )}
    </>
  )
}
