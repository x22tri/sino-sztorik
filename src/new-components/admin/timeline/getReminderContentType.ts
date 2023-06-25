import { CharacterEntryV3 } from '../../shared/MOCK_DATABASE_ENTRIES'
import {
  SortedCharacterEntry,
  SortedOccurrence,
  isFullOccurrence,
  isUnset,
  isWithheldKeywordOccurrence,
  isWithheldPrimitiveOccurrence,
} from '../../shared/logic/loadAdminChar'
import { BlueprintStepType } from './Timeline'

// export function getReminderContentType(occurrences: PotentialOccurrence[], index: number): BlueprintStepType | null {
//   const previousTiers = occurrences.slice(0, index).map(({ type }) => type)

//   if (previousTiers.includes('keywordAndPrimitive')) {
//     return 'keywordAndPrimitive'
//   }

//   if (previousTiers.includes('keyword')) {
//     // Check for keywordLite?
//     if (previousTiers.includes('primitive')) {
//       return 'keywordAndPrimitive'
//     } else {
//       return 'keyword'
//     }
//   }

//   if (previousTiers.includes('primitive')) {
//     return 'primitive'
//   }

//   return null
// }

export function getReminderContentType(
  character: SortedCharacterEntry,
  occurrences: SortedOccurrence[],
  index: number
): BlueprintStepType | null {
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

  return null
}

export function isValidTierForReminder(occurrences: SortedOccurrence[], index: number) {
  return occurrences.slice(0, index).some(occurrence => !isUnset(occurrence))
}
