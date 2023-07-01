import { FormProvider, useForm } from 'react-hook-form'
import { CharacterSection } from '../admin-content/sections/CharacterSection'
import { CharFormData } from '../../shared/logic/loadAdminChar'
import { ConstituentsSection } from '../admin-content/sections/ConstituentsSection'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CharFormError } from '../admin-content/AdminStepLabel'
import { useCharFormErrors } from '../hooks/useCharFormErrors'
import { hasNoKeyword, hasNoPrimitive } from '../utils/char-form-utils'

export function CharForm({
  charFormData,
  setCharFormData,
  setCharFormErrors,
}: {
  charFormData: CharFormData
  setCharFormData: Dispatch<SetStateAction<CharFormData>>
  setCharFormErrors: Dispatch<SetStateAction<{ [key in CharFormError]: boolean }>>
}) {
  const methods = useForm({ defaultValues: { ...charFormData } })
  const localFormState = methods.watch()

  useCharFormErrors(localFormState, setCharFormErrors)

  // To-Do: Set up validation on the individual fields' onChange events?

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
