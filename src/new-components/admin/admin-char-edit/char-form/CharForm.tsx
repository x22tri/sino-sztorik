import { CharacterSection } from '../admin-content/sections/CharacterSection'
import { ConstituentsSection } from '../admin-content/sections/ConstituentsSection'
import { OtherUsesSection } from '../admin-content/sections/OtherUsesSection'
import { Subheading } from '../../../learn/headings/Subheading'
import { useParams } from 'react-router-dom'

export enum CharFormSteps {
  CHARACTER = '1',
  CONSTITUENTS = '2',
  OTHER_USES = '3',
}

export function CharForm() {
  const { step } = useParams()

  switch (step as CharFormSteps) {
    case CharFormSteps.CHARACTER:
      return <CharacterSection />
    case CharFormSteps.CONSTITUENTS:
      return <ConstituentsSection />
    case CharFormSteps.OTHER_USES:
      return <OtherUsesSection />
    default:
      throw new Error('An invalid step was provided.')
  }
}
