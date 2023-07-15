import { useContext } from 'react'
import { CharFormData } from '../../shared/logic/loadAdminChar'
import { CharFormError } from '../admin-content/AdminStepLabel'
import { useLazyEffect } from '../../shared/hooks/useLazyEffect'
import { valueof } from '../../shared/interfaces'
import { CharAdminErrorContext } from '../char-admin-error-context/CharAdminErrorContext'
import { isPresent } from '../utils/char-form-utils'

export function useCharFormErrors(charFormData: CharFormData) {
  useRegisterError(charFormData, {
    condition: charFormData.frequency !== undefined && Number.isNaN(+charFormData.frequency),
    dependencies: ['frequency'],
    error: CharFormError.FrequencyNotANumber,
  })

  useRegisterError(charFormData, {
    condition: isPresent(charFormData, 'keyword') !== isPresent(charFormData, 'frequency'),
    dependencies: ['keyword', 'frequency'],
    error: CharFormError.KeywordAndFrequencyGoHandInHand,
  })

  useRegisterError(charFormData, {
    condition: !isPresent(charFormData, 'keyword') && !isPresent(charFormData, 'primitive'),
    dependencies: ['keyword', 'primitive'],
    error: CharFormError.NoKeywordOrPrimitive,
  })

  useRegisterError(charFormData, {
    condition: isPresent(charFormData, 'keyword') !== isPresent(charFormData, 'pinyin'),
    dependencies: ['keyword', 'pinyin'],
    error: CharFormError.KeywordAndPinyinGoHandInHand,
  })

  // useRegisterError({
  //   condition: isPresent(charFormData, 'isProductive') && !isPresent(charFormData, 'pinyin'),
  //   dependencies: [isProductive, pinyin],
  //   error: CharFormError.NoProductivePhoneticWithoutPronunciation,
  // })
}

function useRegisterError(
  charFormData: CharFormData,
  errorConfig: { condition: boolean; dependencies: string[]; error: CharFormError }
) {
  const { setCharFormErrors } = useContext(CharAdminErrorContext)

  useLazyEffect(
    () => {
      setCharFormErrors(prev => ({
        ...prev,
        [errorConfig.error]: { value: errorConfig.condition, dependencies: errorConfig.dependencies },
      }))
    },
    errorConfig.dependencies.map(dep => charFormData[dep as keyof CharFormData])
  )
}
