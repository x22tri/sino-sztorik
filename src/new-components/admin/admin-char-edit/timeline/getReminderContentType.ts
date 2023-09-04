import { OccurrencePresentation } from '../../../shared/MOCK_DATABASE_ENTRIES'
import { SortedOccurrence } from '../../../shared/MOCK_DATABASE_ENTRIES'
import { CharFormData, TimelineData } from '../../../shared/logic/loadAdminChar'
import { isWithheldConstituentsOccurrence } from '../utils/occurrence-utils'
import { isWithheldPrimitiveOccurrence } from '../utils/occurrence-utils'
import { isWithheldKeywordOccurrence } from '../utils/occurrence-utils'
import { isFullOccurrence } from '../utils/occurrence-utils'
import { isReminder } from '../utils/occurrence-utils'
import { isUnset } from '../utils/occurrence-utils'
import { findAllIndexes } from '../../../shared/utility-functions'
import { isPresent } from '../utils/char-form-utils'

export function getReminderContentType(
  character: CharFormData,
  timelineData: TimelineData,
  index: number
): OccurrencePresentation {
  const previousTiers = timelineData.slice(0, index)

  if (!isPresent(character, 'keyword') && previousTiers.some(occurrence => isFullOccurrence(occurrence))) {
    return 'primitive'
  }

  if (!isPresent(character, 'primitive') && previousTiers.some(occurrence => isFullOccurrence(occurrence))) {
    return 'keyword'
  }

  if (previousTiers.some(occurrence => isFullOccurrence(occurrence))) {
    return 'keywordAndPrimitive'
  }

  if (previousTiers.some(occurrence => isWithheldKeywordOccurrence(occurrence))) {
    return 'primitive'
  }

  if (previousTiers.some(occurrence => isWithheldPrimitiveOccurrence(occurrence))) {
    return 'keyword'
  }

  if (previousTiers.some(occurrence => isWithheldConstituentsOccurrence(occurrence))) {
    return 'keywordLite'
  }

  throw new Error('Reminder type invalid.')
}

export function isValidTierForReminder(occurrences: SortedOccurrence[], index: number) {
  return occurrences.slice(0, index).some(occurrence => !isUnset(occurrence))
}

export function noOrphanedRemindersIfTierWasDeleted(occurrences: SortedOccurrence[], index: number) {
  const ifTierWasDeleted = Array.from(occurrences)
  ifTierWasDeleted.splice(index, 1, { tier: index + 1 })
  const reminderIndexes = findAllIndexes(occurrences, occurrence => isReminder(occurrence))
  const wouldRemindersStillBeValid = reminderIndexes.map(reminderIndex => isValidTierForReminder(ifTierWasDeleted, reminderIndex))
  return wouldRemindersStillBeValid.every(validReminder => validReminder)
}