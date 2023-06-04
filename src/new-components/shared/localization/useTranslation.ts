import LocalizedStrings from 'react-localization'
import { useLanguageContext } from './LanguageContext'
import en from './en.json'
import hu from './hu.json'

export default function useTranslation() {
  const { language } = useLanguageContext()

  const strings = new LocalizedStrings({ en, hu })

  strings.setLanguage(language)

  return strings
}
