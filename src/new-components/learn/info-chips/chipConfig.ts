import { faCubesStacked, faBell, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { ChipIds, ChipType } from '../../shared/interfaces'
import {
  INFO_CHIP_NEW_PRIMITIVE_LABEL,
  INFO_CHIP_NEW_PRIMITIVE_EXPLANATION,
  INFO_CHIP_REMINDER_LABEL,
  INFO_CHIP_REMINDER_EXPLANATION,
  INFO_CHIP_PRODUCTIVE_PHONETIC_LABEL,
  INFO_CHIP_PRODUCTIVE_PHONETIC_EXPLANATION,
} from '../../shared/strings'

const { NEW_PRIMITIVE, PRODUCTIVE_PHONETIC, REMINDER } = ChipIds

// The order of the chips matters.
export const chipConfig: ChipType[] = [
  {
    id: PRODUCTIVE_PHONETIC,
    icon: faVolumeHigh,
    label: INFO_CHIP_PRODUCTIVE_PHONETIC_LABEL,
    explanation: INFO_CHIP_PRODUCTIVE_PHONETIC_EXPLANATION,
  },
  {
    id: REMINDER,
    icon: faBell,
    label: INFO_CHIP_REMINDER_LABEL,
    explanation: INFO_CHIP_REMINDER_EXPLANATION,
  },
  {
    id: NEW_PRIMITIVE,
    icon: faCubesStacked,
    label: INFO_CHIP_NEW_PRIMITIVE_LABEL,
    explanation: INFO_CHIP_NEW_PRIMITIVE_EXPLANATION,
  },
]
