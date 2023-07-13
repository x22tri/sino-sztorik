import { useContext } from 'react'
import { CharFormData } from '../../shared/logic/loadAdminChar'
import { CharFormError } from '../admin-content/AdminStepLabel'
import { useLazyEffect } from '../../shared/hooks/useLazyEffect'
import { valueof } from '../../shared/interfaces'
import { CharAdminErrorContext } from '../char-admin-error-context/CharAdminErrorContext'
import { hasNoKeyword, hasNoPrimitive } from '../utils/char-form-utils'

export function useCharFormErrors(charFormData: CharFormData) {
  const { frequency, keyword, primitive } = charFormData

  useRegisterError({
    condition: 'frequency' in charFormData && Number.isNaN(+frequency!),
    dependencies: [frequency],
    error: CharFormError.FrequencyNotANumber,
  })

  useRegisterError({
    condition: +frequency! === 0 && !!keyword,
    dependencies: [keyword, frequency],
    error: CharFormError.FrequencyNotPresentWithKeyword,
  })

  useRegisterError({
    condition: hasNoKeyword(charFormData) && hasNoPrimitive(charFormData),
    dependencies: [keyword, primitive],
    error: CharFormError.NoKeywordOrPrimitive,
  })
}

function useRegisterError(errorConfig: { condition: boolean; dependencies: valueof<CharFormData>[]; error: CharFormError }) {
  const { setCharFormErrors } = useContext(CharAdminErrorContext)

  useLazyEffect(() => {
    setCharFormErrors(prev => ({ ...prev, [errorConfig.error]: errorConfig.condition }))
  }, errorConfig.dependencies)
}
