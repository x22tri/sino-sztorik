import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react'

type Locales = 'hu' | 'en'

type LanguageContextType = {
  language: Locales
  changeLanguage: Dispatch<SetStateAction<Locales>>
}

const LanguageContext = createContext({ language: 'hu', changeLanguage: () => undefined } as LanguageContextType)

export const useLanguageContext = () => useContext(LanguageContext)

export default function LanguageContextProvider({ children }: { children: ReactNode }) {
  const [language, changeLanguage] = useState<Locales>('hu')

  return <LanguageContext.Provider value={{ language, changeLanguage }}>{children}</LanguageContext.Provider>
}
