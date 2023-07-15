import { FormProvider, useForm, useFormContext, useFormState, useWatch } from 'react-hook-form'
import { CharacterSection } from '../admin-content/sections/CharacterSection'
import { CharFormData } from '../../shared/logic/loadAdminChar'
import { ConstituentsSection } from '../admin-content/sections/ConstituentsSection'
import { Box } from '@mui/material'
import { useCharFormErrors } from '../hooks/useCharFormErrors'
import { Dispatch, SetStateAction } from 'react'

export function CharForm({ saveCharForm }: { saveCharForm: Dispatch<SetStateAction<CharFormData>> }) {
  const { handleSubmit } = useFormContext()

  function onSubmit(data: any) {
    saveCharForm(data)
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CharacterSection />

      <ConstituentsSection />

      <Box mt={10}>
        <button type='submit'>Log current values</button>
      </Box>
    </form>
  )
}
