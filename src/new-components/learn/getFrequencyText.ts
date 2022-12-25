import {
  FREQUENCY_UNKNOWN,
  FREQUENCY_VERY_COMMON,
  FREQUENCY_QUITE_COMMON,
  FREQUENCY_COMMON,
  FREQUENCY_UNCOMMON,
  FREQUENCY_VERY_RARE,
} from '../shared/strings'

export function getFrequencyText(frequency?: number): string {
  if (typeof frequency !== 'number') {
    return FREQUENCY_UNKNOWN
  }

  const frequencyTooltipMap = new Map([
    [500, FREQUENCY_VERY_COMMON],
    [1000, FREQUENCY_QUITE_COMMON],
    [1500, FREQUENCY_COMMON],
    [2000, FREQUENCY_UNCOMMON],
    [3000, FREQUENCY_VERY_RARE],
  ])

  for (const [key, value] of frequencyTooltipMap) {
    if (frequency < key) {
      return value
    }
  }

  return FREQUENCY_VERY_RARE
}
