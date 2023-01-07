import {
  faCubesStacked,
  faBell,
  faVolumeDown,
  faClockRotateLeft,
  faChartColumn,
} from '@fortawesome/free-solid-svg-icons'
import { ChipIds, ChipType } from '../../shared/interfaces'
import {
  INFO_CHIP_NEW_PRIMITIVE_LABEL,
  INFO_CHIP_NEW_PRIMITIVE_EXPLANATION,
  INFO_CHIP_REMINDER_LABEL,
  INFO_CHIP_REMINDER_EXPLANATION,
  INFO_CHIP_PREQUEL_LABEL,
  INFO_CHIP_FREQUENCY_EXPLANATION,
  INFO_CHIP_PREQUEL_EXPLANATION,
  INFO_CHIP_PRODUCTIVE_PHONETIC_EXPLANATION,
  INFO_CHIP_PRODUCTIVE_PHONETIC_LABEL,
} from '../../shared/strings'

const { FREQUENCY, NEW_PRIMITIVE, PREQUEL, PRODUCTIVE_PHONETIC, REMINDER } =
  ChipIds

// Chips will be shown in the order of the array elements.
export const chipConfig: ChipType[] = [
  {
    id: FREQUENCY,
    icon: faChartColumn,
    label: '',
    explanation: INFO_CHIP_FREQUENCY_EXPLANATION,
  },
  {
    id: PREQUEL,
    icon: faClockRotateLeft,
    label: `${INFO_CHIP_PREQUEL_LABEL} []`,
    explanation: INFO_CHIP_PREQUEL_EXPLANATION,
  },
  {
    id: PRODUCTIVE_PHONETIC,
    icon: faVolumeDown,
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
