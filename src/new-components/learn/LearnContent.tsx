import Box from '@mui/material/Box'
import { Button, Stack, useTheme } from '@mui/material'
import { Character } from '../shared/interfaces'
import { LEARN_FINISH_LESSON_BUTTON } from '../shared/strings'
import { Unless } from 'react-if'
import { useStore } from '../shared/logic/useStore'
import {
  ConstituentsSection,
  SimilarAppearanceSection,
  SimilarMeaningSection,
} from './learn-content-sections/LearnContentSections'
import { StorySection } from './learn-content-sections/LearnContentSections'
import { CharacterSection } from './learn-content-sections/LearnContentSections'
import { PhrasesAndOtherUsesSection } from './learn-content-sections/LearnContentSections'
import { LESSON_SELECT_PATH } from '../shared/paths'
import { PrevNextLinks } from '../shared/components/PrevNextLinks'
import { useSmallScreen } from '../shared/hooks/useSmallScreen'

export default function LearnContent({
  lessonChar,
  nextChar,
  prevChar,
  selectCharIndex,
  selectedCharIndex,
}: {
  lessonChar: Character
  nextChar: string | undefined
  prevChar: string | undefined
  selectCharIndex: (index: number) => void
  selectedCharIndex: number
}) {
  const { constants, spacing } = useTheme()
  const { flashbackChar } = useStore('flashback')
  const isSmallScreen = useSmallScreen()

  const currentChar = flashbackChar ?? lessonChar

  if (!currentChar) {
    return null
  }

  const { glyph, constituents, otherUses, phrases, similarAppearance, similarMeaning, story } = currentChar

  window.scrollTo({ top: 0 })

  return (
    <>
      <Box p={{ xs: 2, md: 4 }} boxShadow={constants.boxShadow} borderRadius={spacing(2)}>
        <CharacterSection {...{ currentChar }} />

        <ConstituentsSection {...{ constituents }} />

        <StorySection {...{ story }} />

        <PhrasesAndOtherUsesSection currentChar={glyph} {...{ otherUses, phrases }} />

        <SimilarMeaningSection {...{ similarMeaning }} />

        <SimilarAppearanceSection {...{ similarAppearance }} />
      </Box>

      <Unless condition={!!flashbackChar}>
        <PrevNextLinks
          customEndElement={
            <Button variant='contained' href={LESSON_SELECT_PATH} sx={{ borderRadius: 6, width: isSmallScreen ? 1 : undefined }}>
              {LEARN_FINISH_LESSON_BUTTON}
            </Button>
          }
          prevTitle={prevChar}
          prevOnClick={() => selectCharIndex(selectedCharIndex - 1)}
          nextTitle={nextChar}
          nextOnClick={() => selectCharIndex(selectedCharIndex + 1)}
        />
      </Unless>
    </>
  )
}
