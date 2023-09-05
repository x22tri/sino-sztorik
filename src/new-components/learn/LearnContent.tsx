import { Character } from '../shared/interfaces'
import { useStore } from '../shared/logic/useStore'
import {
  ConstituentsSection,
  SimilarAppearanceSection,
  SimilarMeaningSection,
} from './learn-content-sections/LearnContentSections'
import { StorySection } from './learn-content-sections/LearnContentSections'
import { CharacterSection } from './learn-content-sections/LearnContentSections'
import { PhrasesAndOtherUsesSection } from './learn-content-sections/LearnContentSections'
import { ReactNode } from 'react'

export default function LearnContent({ lessonChar, navigation }: { lessonChar: Character; navigation: ReactNode }) {
  const { flashbackChar } = useStore('flashback')

  const currentChar = flashbackChar ?? lessonChar

  if (!currentChar) {
    return null
  }

  const { glyph, constituents, otherUses, phrases, similarAppearance, similarMeaning, story } = currentChar

  window.scrollTo({ top: 0 })

  return (
    <>
      <div>
        <CharacterSection {...{ currentChar }} />

        <ConstituentsSection {...{ constituents }} />

        <StorySection {...{ story }} />

        <PhrasesAndOtherUsesSection currentChar={glyph} {...{ otherUses, phrases }} />

        <SimilarMeaningSection {...{ similarMeaning }} />

        <SimilarAppearanceSection {...{ similarAppearance }} />
      </div>

      {navigation}
    </>
  )
}
