import { OccurrencePresentation, SortedOccurrence } from '../../../shared/MOCK_DATABASE_ENTRIES'
import { CharFormData, CharTimelineData } from '../../../shared/route-loaders/loadCharEdit'
import { findAllIndexes } from '../../../shared/utility-functions'
import {
  isFullOccurrence,
  isWithheldKeywordOccurrence,
  isWithheldPrimitiveOccurrence,
  isWithheldConstituentsOccurrence,
  isReminder,
  isUnset,
} from './occurrence-utils'

export function hasNoKeyword(character: CharFormData) {
  return !('keyword' in character) || character.keyword === ''
}

export function hasNoPrimitive(character: CharFormData) {
  return !('primitive' in character) || character.primitive === ''
}

export function isPresent(character: CharFormData, key: string) {
  return key in character && character[key as keyof CharFormData] !== ''
}

export function getReminderContentType(
  character: CharFormData,
  timelineData: CharTimelineData,
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

export function getOccurrencePresentation(charFormData: CharFormData, occurrence: SortedOccurrence): OccurrencePresentation {
  return 'withhold' in occurrence
    ? occurrence.withhold === 'keyword'
      ? 'primitive'
      : occurrence.withhold === 'primitive'
      ? 'keyword'
      : occurrence.withhold === 'constituents'
      ? 'keywordLite'
      : 'unset' // Should not happen
    : isReminder(occurrence)
    ? 'reminder'
    : isUnset(occurrence)
    ? 'unset'
    : !isPresent(charFormData, 'keyword')
    ? 'primitive'
    : !isPresent(charFormData, 'primitive')
    ? 'keyword'
    : 'keywordAndPrimitive'
}

export function noOrphanedRemindersIfTierWasDeleted(occurrences: SortedOccurrence[], index: number) {
  const ifTierWasDeleted = Array.from(occurrences)
  ifTierWasDeleted.splice(index, 1, { tier: index + 1 })
  const reminderIndexes = findAllIndexes(occurrences, occurrence => isReminder(occurrence))
  const wouldRemindersStillBeValid = reminderIndexes.map(reminderIndex => isValidTierForReminder(ifTierWasDeleted, reminderIndex))
  return wouldRemindersStillBeValid.every(validReminder => validReminder)
}
export function isValidTierForReminder(occurrences: SortedOccurrence[], index: number) {
  return occurrences.slice(0, index).some(occurrence => !isUnset(occurrence))
}
