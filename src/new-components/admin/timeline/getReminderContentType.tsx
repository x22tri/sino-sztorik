import { BlueprintStep, BlueprintStepType } from './Timeline'

export function getReminderContentType(steps: BlueprintStep[], index: number): BlueprintStepType | null {
  const previousTiers = steps.slice(0, index).map(step => step.type)

  if (previousTiers.includes('keyword')) {
    // Check for unexpounded?
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
