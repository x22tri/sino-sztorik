import { Dispatch, SetStateAction, useEffect } from 'react'
import { SortedCharacterEntry } from '../../shared/logic/loadAdminChar'
import { CharFormError } from '../admin-content/AdminStepLabel'

export function useCharFormErrors(character: SortedCharacterEntry, setCharFormErrors: Dispatch<SetStateAction<CharFormError[]>>) {
  useEffect(() => {
    const detectedCharFormErrors = checkForCharFormErrors(character)

    setCharFormErrors(detectedCharFormErrors)
  }, [character])
}

function checkForCharFormErrors(character: SortedCharacterEntry) {
  const detectedCharFormErrors: CharFormError[] = []

  if (!('keyword' in character || 'primitive' in character)) {
    detectedCharFormErrors.push(CharFormError.NoKeywordOrPrimitive)
  }

  return detectedCharFormErrors
}
