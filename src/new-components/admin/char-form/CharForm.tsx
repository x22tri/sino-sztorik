import { FormProvider, useForm } from 'react-hook-form'
import { CharacterSection } from '../admin-content/sections/CharacterSection'
import { CharFormData } from '../../shared/logic/loadAdminChar'
import { ConstituentsSection } from '../admin-content/sections/ConstituentsSection'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction, useEffect } from 'react'

export function CharForm({
  charFormData,
  setCharFormData,
}: {
  charFormData: CharFormData
  setCharFormData: Dispatch<SetStateAction<CharFormData>>
}) {
  const methods = useForm({ defaultValues: { ...charFormData } })
  const localFormState = methods.watch()

  useEffect(() => {
    setCharFormData(localFormState)
  }, [localFormState])

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
