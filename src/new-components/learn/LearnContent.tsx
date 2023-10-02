import { Character } from '../shared/interfaces'
import {
  ConstituentsSection,
  SimilarAppearanceSection,
  SimilarMeaningSection,
} from './learn-content-sections/LearnContentSections'
import { StorySection } from './learn-content-sections/LearnContentSections'
import { CharacterSection } from './learn-content-sections/LearnContentSections'
import { PhrasesAndOtherUsesSection } from './learn-content-sections/LearnContentSections'
import { ReactNode } from 'react'
import { useFlashback } from './store/useFlashback'
import { Box, Divider } from '@mui/material'

export default function LearnContent({ lessonChar, navigation }: { lessonChar: Character; navigation: ReactNode }) {
  const { flashbackChar } = useFlashback()

  const currentChar = flashbackChar ?? lessonChar

  if (!currentChar) {
    return null
  }

  const { glyph, constituents, otherUses, phrases, similarAppearance, similarMeaning, story } = currentChar

  window.scrollTo({ top: 0 })

  return (
    <>
      <Box mt={2} mb={4}>
        <CharacterSection {...{ currentChar }} />

        <Divider sx={{ my: 4 }} />

        <ConstituentsSection {...{ constituents }} />

        <StorySection {...{ story }} />

        <PhrasesAndOtherUsesSection currentChar={glyph} {...{ otherUses, phrases }} />

        <SimilarMeaningSection {...{ similarMeaning }} />

        <SimilarAppearanceSection {...{ similarAppearance }} />
      </Box>

      {navigation}
    </>
  )
}
