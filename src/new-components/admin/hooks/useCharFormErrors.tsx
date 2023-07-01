import { Dispatch, SetStateAction, useEffect } from 'react'
import { CharFormData } from '../../shared/logic/loadAdminChar'
import { CharFormError } from '../admin-content/AdminStepLabel'

export function useCharFormErrors(character: CharFormData, setCharFormErrors: Dispatch<SetStateAction<CharFormError[]>>) {
  useEffect(() => {
    const detectedCharFormErrors = checkForCharFormErrors(character)

    setCharFormErrors(detectedCharFormErrors)
  }, [character])
}

function checkForCharFormErrors(character: CharFormData) {
  const detectedCharFormErrors: CharFormError[] = []

  if ('frequency' in character && Number.isNaN(+character.frequency!)) {
    detectedCharFormErrors.push(CharFormError.FrequencyNotANumber)
  }

  if ((!('keyword' in character) || character.keyword === '') && (!('primitive' in character) || character.primitive === '')) {
    detectedCharFormErrors.push(CharFormError.NoKeywordOrPrimitive)
  }

  return detectedCharFormErrors
}
