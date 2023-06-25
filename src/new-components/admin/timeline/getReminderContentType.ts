import { OccurrencePresentation } from '../../shared/MOCK_DATABASE_ENTRIES'
import {
  SortedCharacterEntry,
  SortedOccurrence,
  isFullOccurrence,
  isReminder,
  isUnset,
  isWithheldConstituentsOccurrence,
  isWithheldKeywordOccurrence,
  isWithheldPrimitiveOccurrence,
} from '../../shared/logic/loadAdminChar'
import { findAllIndexes } from '../../shared/utility-functions'

export function getReminderContentType(
  character: SortedCharacterEntry,
  occurrences: SortedOccurrence[],
  index: number
): OccurrencePresentation {
  const previousTiers = occurrences.slice(0, index)

  if (!('keyword' in character) && previousTiers.some(occurrence => isFullOccurrence(occurrence))) {
    return 'primitive'
  }

  if (!('primitive' in character) && previousTiers.some(occurrence => isFullOccurrence(occurrence))) {
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
