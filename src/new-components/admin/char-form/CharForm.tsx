import { useFormContext } from 'react-hook-form'
import { CharacterSection } from '../admin-content/sections/CharacterSection'
import { CharFormData } from '../../shared/logic/loadAdminChar'
import { ConstituentsSection } from '../admin-content/sections/ConstituentsSection'
import { Dispatch, SetStateAction } from 'react'
import { OtherUsesSection } from '../admin-content/sections/OtherUsesSection'
import { Subheading } from '../../learn/headings/Subheading'

export function CharForm({ saveCharForm }: { saveCharForm: Dispatch<SetStateAction<CharFormData>> }) {
  const { handleSubmit } = useFormContext()

  function onSubmit(data: any) {
    saveCharForm(data)
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Subheading styles={{ marginBottom: 2, marginTop: 0 }} title='Alapadatok' />
      <CharacterSection />

      <Subheading styles={{ marginBottom: 2, marginTop: 6 }} title='Összetétel' />
      <ConstituentsSection />

      <Subheading styles={{ marginBottom: 2, marginTop: 6 }} title='Egyéb jelentései' />
      <OtherUsesSection />

      <button onClick={onSubmit}>Log current values</button>
    </form>
  )
}
