import { PotentialOccurrence } from '../../shared/logic/loadAdminChar'
import { BlueprintStepType } from './Timeline'

export function getReminderContentType(occurrences: PotentialOccurrence[], index: number): BlueprintStepType | null {
  const previousTiers = occurrences.slice(0, index).map(({ type }) => type)

  if (previousTiers.includes('keywordAndPrimitive')) {
    return 'keywordAndPrimitive'
  }

  if (previousTiers.includes('keyword')) {
    // Check for keywordLite?
    if (previousTiers.includes('primitive')) {
      return 'keywordAndPrimitive'
    } else {
      return 'keyword'
    }
  }

  if (previousTiers.includes('primitive')) {
    return 'primitive'
  }

  return null
}
