import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CharFormData } from '../../shared/logic/loadAdminChar'
import { CharFormError } from '../admin-content/AdminStepLabel'
import { hasNoKeyword, hasNoPrimitive } from '../utils/char-form-utils'

export function useCharFormErrors(
  character: CharFormData,
  setCharFormErrors: Dispatch<SetStateAction<{ [key in CharFormError]: boolean }>>
) {
  // const [frequencyNotANumber, setFrequencyNotANumber] = useState(false)
  // const [noKeywordOrPrimitive, setNoKeywordOrPrimitive] = useState(false)

  // const [errors, setErrors] = useState({
  //   [CharFormError.FrequencyNotANumber]: false,
  //   [CharFormError.NoKeywordOrPrimitive]: false,
  // })

  useEffect(() => {
    setCharFormErrors(prev => ({
      ...prev,
      [CharFormError.FrequencyNotANumber]: 'frequency' in character && Number.isNaN(+character.frequency!),
    }))
  }, [character.frequency])

  useEffect(() => {
    setCharFormErrors(prev => ({
      ...prev,
      [CharFormError.NoKeywordOrPrimitive]: hasNoKeyword(character) && hasNoPrimitive(character),
    }))
  }, [character.keyword, character.primitive])
}

export function getCharFormErrors(errors: { [key in CharFormError]: boolean }) {
  return Object.entries(errors).flatMap(([key, value]) => (value ? (key as CharFormError) : []))
}
