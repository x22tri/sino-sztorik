import { CharacterSection } from '../admin-content/sections/CharacterSection'
import { ConstituentsSection } from '../admin-content/sections/ConstituentsSection'
import { OtherUsesSection } from '../admin-content/sections/OtherUsesSection'
import { Subheading } from '../../../learn/headings/Subheading'

export function CharForm() {
  return (
    <form>
      <Subheading styles={{ marginBottom: 2, marginTop: 0 }} title='Alapadatok' />
      <CharacterSection />

      <Subheading styles={{ marginBottom: 2, marginTop: 6 }} title='Összetétel' />
      <ConstituentsSection />

      <Subheading styles={{ marginBottom: 2, marginTop: 6 }} title='Egyéb jelentései' />
      <OtherUsesSection />
    </form>
  )
}
