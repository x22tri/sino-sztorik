import { OccurrenceV3, UnsetOccurrence } from '../../shared/MOCK_DATABASE_ENTRIES'
import { SortedOccurrence } from '../../shared/MOCK_DATABASE_ENTRIES'
import {
  ReminderOccurrence,
  FullOccurrence,
  WithheldKeywordOccurrence,
  WithheldPrimitiveOccurrence,
  WithheldConstituentsOccurrence,
  OccurrenceType,
} from '../../shared/MOCK_DATABASE_ENTRIES'

export function isUnset(occurrence: SortedOccurrence): occurrence is UnsetOccurrence {
  return !('index' in occurrence)
}
export function isSet(occurrence: SortedOccurrence): occurrence is OccurrenceV3 {
  return 'index' in occurrence
}
export function isReminder(occurrence: SortedOccurrence): occurrence is ReminderOccurrence {
  return !('story' in occurrence) && 'index' in occurrence
}
export function isFullOccurrence(occurrence: SortedOccurrence): occurrence is FullOccurrence {
  return !('withhold' in occurrence) && 'story' in occurrence
}
export function isWithheldOccurrence(
  occurrence: SortedOccurrence
): occurrence is WithheldKeywordOccurrence | WithheldPrimitiveOccurrence | WithheldConstituentsOccurrence {
  return 'withhold' in occurrence
}
export function isWithheldKeywordOccurrence(occurrence: SortedOccurrence): occurrence is WithheldConstituentsOccurrence {
  return 'withhold' in occurrence && occurrence.withhold === 'keyword'
}
export function isWithheldPrimitiveOccurrence(occurrence: SortedOccurrence): occurrence is WithheldPrimitiveOccurrence {
  return 'withhold' in occurrence && occurrence.withhold === 'primitive'
}
export function isWithheldConstituentsOccurrence(occurrence: SortedOccurrence): occurrence is WithheldConstituentsOccurrence {
  return 'withhold' in occurrence && occurrence.withhold === 'constituents'
}
export function getOccurrenceType(occurrence: SortedOccurrence): OccurrenceType {
  if (isFullOccurrence(occurrence)) {
    return 'full'
  }

  if (isReminder(occurrence)) {
    return 'reminder'
  }

  if (isWithheldKeywordOccurrence(occurrence)) {
    return 'withheldKeyword'
  }

  if (isWithheldPrimitiveOccurrence(occurrence)) {
    return 'withheldPrimitive'
  }

  if (isWithheldConstituentsOccurrence(occurrence)) {
    return 'withheldConstituents'
  }

  throw new Error('Occurrence type could not be determined.')
}
