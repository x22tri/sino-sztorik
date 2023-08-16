import Box from '@mui/material/Box'
import { Button } from '@mui/material'
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

export default function LearnContent({
  lessonChar,
  nextChar,
  prevChar,
  selectCharIndex,
  selectedCharIndex,
  toolbarHeight,
}: {
  lessonChar: Character
  nextChar: string | undefined
  prevChar: string | undefined
  selectCharIndex: (index: number) => void
  selectedCharIndex: number
  toolbarHeight: number
}) {
  const { flashbackChar } = useStore('flashback')

  const currentChar = flashbackChar ?? lessonChar

  if (!currentChar) {
    return null
  }

  const { charChinese, constituents, otherUses, phrases, similarAppearance, similarMeaning, story } = currentChar

  window.scrollTo({ top: 0 })

  return (
    <Box
      boxSizing='border-box'
      component='main'
      columnGap={6}
      display='grid'
      marginTop={`${toolbarHeight}px`}
      minHeight={`calc(100vh - ${toolbarHeight}px)`}
      padding={2}
      paddingTop={0}
      sx={{
        bgcolor: 'background.paper',
        grid: {
          xs: `"learn" auto
               "prev-next" max-content
               / auto`,
          lg: `"learn aside" max-content
               "prev-next prev-next" auto
               / 3fr 1fr`,
        },
      }}
    >
      <Box gridArea='learn'>
        <CharacterSection {...{ currentChar }} />

        <ConstituentsSection {...{ constituents }} />

        <StorySection {...{ story }} />

        <PhrasesAndOtherUsesSection currentChar={charChinese} {...{ otherUses, phrases }} />

        <SimilarMeaningSection {...{ similarMeaning }} />

        <SimilarAppearanceSection {...{ similarAppearance }} />
      </Box>

      <Unless condition={!!flashbackChar}>
        <PrevNextLinks
          customEndElement={
            <Button variant='contained' href={LESSON_SELECT_PATH} sx={{ borderRadius: 6 }}>
              {LEARN_FINISH_LESSON_BUTTON}
            </Button>
          }
          prevTitle={prevChar}
          prevOnClick={() => selectCharIndex(selectedCharIndex - 1)}
          nextTitle={nextChar}
          nextOnClick={() => selectCharIndex(selectedCharIndex + 1)}
        />
      </Unless>
    </Box>
  )
}
