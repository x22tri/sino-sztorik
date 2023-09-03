import { useFormContext } from 'react-hook-form'
import { CharacterSection } from '../admin-content/sections/CharacterSection'
import { CharFormData } from '../../shared/logic/loadAdminChar'
import { ConstituentsSection } from '../admin-content/sections/ConstituentsSection'
import { Dispatch, SetStateAction } from 'react'
import { OtherUsesSection } from '../admin-content/sections/OtherUsesSection'
import { Subheading } from '../../learn/headings/Subheading'

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
