import { FormProvider, useForm } from 'react-hook-form'
import { CharacterSection } from '../admin-content/sections/CharacterSection'
import { CharFormData } from '../../shared/logic/loadAdminChar'
import { ConstituentsSection } from '../admin-content/sections/ConstituentsSection'
import { Box } from '@mui/material'
import { useContext } from 'react'
import { useCharFormErrors } from '../hooks/useCharFormErrors'
import { CharAdminErrorContext } from '../char-admin-error-context/CharAdminErrorContext'

export function CharForm({ charFormData }: { charFormData: CharFormData }) {
  const methods = useForm({ defaultValues: { ...charFormData } })
  const charFormState = methods.watch()
  const { setCharFormErrors } = useContext(CharAdminErrorContext)

  useCharFormErrors(charFormState, setCharFormErrors)

  function onSubmit(data: any) {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CharacterSection />

        <ConstituentsSection />

        <Box mt={10}>
          <button type='submit'>Log current values</button>
        </Box>
      </form>
    </FormProvider>
  )
}
