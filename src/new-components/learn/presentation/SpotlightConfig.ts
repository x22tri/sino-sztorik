import { IconDefinition, faCubesStacked, faVolumeHigh, faBell } from '@fortawesome/free-solid-svg-icons'
import { Character } from '../../shared/interfaces'
import {
  INFO_CHIP_NEW_PRIMITIVE_EXPLANATION,
  INFO_CHIP_PRODUCTIVE_PHONETIC_EXPLANATION,
  INFO_CHIP_REMINDER_EXPLANATION,
} from '../../shared/strings'

export type SpotlightConfigKey = keyof Pick<Character, 'newPrimitive' | 'productivePhonetic' | 'reminder'>
type SpotlightConfigValue = { icon: IconDefinition; popoverText: string }
type SpotlightConfig = Record<SpotlightConfigKey, SpotlightConfigValue>

export const spotlightConfig: SpotlightConfig = {
  newPrimitive: { icon: faCubesStacked, popoverText: INFO_CHIP_NEW_PRIMITIVE_EXPLANATION },
  productivePhonetic: { icon: faVolumeHigh, popoverText: INFO_CHIP_PRODUCTIVE_PHONETIC_EXPLANATION },
  reminder: { icon: faBell, popoverText: INFO_CHIP_REMINDER_EXPLANATION },
} as const
