import { getFrequencyText } from './getFrequencyText'
import { INFO_CHIP_UNKNOWN_FREQUENCY_EXPLANATION } from '../../shared/strings'
import { replacePlaceholders } from './replacePlaceholders'
import { ChipType } from '../../shared/interfaces'

export function replaceFrequencyPlaceholders(
  text: string,
  frequency: number | undefined
): Partial<ChipType> {
  const frequencyText = getFrequencyText(frequency)

  if (frequency === undefined) {
    return {
      label: frequencyText,
      explanation: INFO_CHIP_UNKNOWN_FREQUENCY_EXPLANATION,
    }
  }

  const frequencyTextMap = {
    frequency: frequency.toString(),
    frequencyTextLowerCase: frequencyText.toLowerCase(),
  }

  return {
    label: frequencyText,
    explanation: replacePlaceholders(text, frequencyTextMap),
  }
}
