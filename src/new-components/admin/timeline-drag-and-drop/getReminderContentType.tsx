import { BlueprintStep, BlueprintStepType } from './TimelineDragAndDrop'

export function getReminderContentType(steps: BlueprintStep[], index: number): BlueprintStepType {
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

  console.log(steps)
  console.log(index)
  throw new Error('Reminder could not get type.')
}
