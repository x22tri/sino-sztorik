import { FormContainer } from 'react-hook-form-mui'
import { CharacterSection } from '../admin-content/sections/CharacterSection'
import { CharFormData } from '../../shared/logic/loadAdminChar'

export function CharEditForm({ charFormData }: { charFormData: CharFormData }) {
  return (
    <FormContainer defaultValues={charFormData} onSuccess={(data: any) => console.log(data)}>
      <CharacterSection />

      <button type='submit'>aa</button>
    </FormContainer>
  )
}
