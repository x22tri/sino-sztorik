import { Dispatch, SetStateAction, useState } from 'react'
import { CharFormData } from '../../shared/logic/loadAdminChar'
import { CharFormError } from '../admin-content/AdminStepLabel'
import { useLazyEffect } from '../../shared/hooks/useLazyEffect'
import { valueof } from '../../shared/interfaces'

export function useCharFormErrors(
  charFormData: CharFormData,
  setCharFormErrors: Dispatch<SetStateAction<{ [key in CharFormError]: boolean }>>
) {
  const { frequency, keyword, primitive } = charFormData

  useRegisterError(setCharFormErrors, {
    condition: 'frequency' in charFormData && Number.isNaN(+frequency!),
    dependencies: [frequency],
    error: CharFormError.FrequencyNotANumber,
  })

  useRegisterError(setCharFormErrors, {
    condition: +frequency! === 0 && !!keyword,
    dependencies: [keyword, frequency],
    error: CharFormError.FrequencyNotPresentWithKeyword,
  })

  useRegisterError(setCharFormErrors, {
    condition: hasNoKeyword(charFormData) && hasNoPrimitive(charFormData),
    dependencies: [keyword, primitive],
    error: CharFormError.NoKeywordOrPrimitive,
  })
}

export function getCharFormErrors(errors: { [key in CharFormError]: boolean }) {
  return Object.entries(errors).flatMap(([key, value]) => (value ? (key as CharFormError) : []))
}

function hasNoKeyword(character: CharFormData) {
  return !('keyword' in character) || character.keyword === ''
}

function hasNoPrimitive(character: CharFormData) {
  return !('primitive' in character) || character.primitive === ''
}

function useRegisterError(
  setCharFormErrors: Dispatch<SetStateAction<{ [key in CharFormError]: boolean }>>,
  errorConfig: { condition: boolean; dependencies: valueof<CharFormData>[]; error: CharFormError }
) {
  useLazyEffect(() => {
    setCharFormErrors(prev => ({ ...prev, [errorConfig.error]: errorConfig.condition }))
  }, errorConfig.dependencies)
}
