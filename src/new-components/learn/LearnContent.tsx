import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import { AssembledLesson, Character } from '../shared/interfaces'
import { PrevNextButtons } from '../shared/components/PrevNextButtons'
import { LEARN_SUBHEADING_PHRASES, LEARN_FINISH_LESSON_BUTTON, LEARN_SUBHEADING_OTHER_USES } from '../shared/strings'
import { When } from 'react-if'
import { useStore } from '../shared/logic/useStore'
import { useLoaderData } from 'react-router-dom'
import { useLargeScreen } from '../shared/hooks/useLargeScreen'
import { OtherUses } from './other-uses/OtherUses'
import {
  ConstituentsSection,
  SimilarAppearanceSection,
  SimilarMeaningSection,
} from './learn-content-sections/LearnContentSections'
import { StorySection } from './learn-content-sections/LearnContentSections'
import { CharacterSection } from './learn-content-sections/LearnContentSections'
import { PhrasesAndOtherUsesSection } from './learn-content-sections/LearnContentSections'
import { LESSON_SELECT_PATH } from '../shared/paths'

export default function LearnContent({
  lessonChar,
  index,
  toolbarHeight,
}: {
  lessonChar: Character
  index: number
  toolbarHeight: number
}) {
  const lesson = useLoaderData() as AssembledLesson
  const isLargeScreen = useLargeScreen()
  const { flashbackChar } = useStore('flashback')

  const prevChar = lesson.characters[index - 1]?.charChinese ?? null
  const nextChar = lesson.characters[index + 1]?.charChinese ?? null
  const currentChar = flashbackChar ?? lessonChar
  const { charChinese, constituents, otherUses, phrases, similarAppearance, similarMeaning, story } = currentChar

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

        <When condition={!isLargeScreen}>
          <ConstituentsSection {...{ constituents }} />
        </When>

        <StorySection {...{ story }} />

        <When condition={!isLargeScreen}>
          <PhrasesAndOtherUsesSection currentChar={charChinese} {...{ otherUses, phrases }} />

          <SimilarMeaningSection {...{ similarMeaning }} />

          <SimilarAppearanceSection {...{ similarAppearance }} />
        </When>
      </Box>

      <When condition={isLargeScreen}>
        <Box gridArea='aside'>
          {/* Keep elements below in sync with duplicates above until CSS Grid Masonry is supported widely */}
          <ConstituentsSection {...{ constituents }} />

          <PhrasesAndOtherUsesSection currentChar={charChinese} {...{ otherUses, phrases }} />

          <SimilarMeaningSection {...{ similarMeaning }} />

          <SimilarAppearanceSection {...{ similarAppearance }} />
        </Box>
      </When>

      <When condition={!flashbackChar}>
        <PrevNextButtons
          customEndElement={
            <Button disableElevation variant='contained' href={LESSON_SELECT_PATH} sx={{ borderRadius: 6 }}>
              {LEARN_FINISH_LESSON_BUTTON}
            </Button>
          }
          prev={prevChar}
          next={nextChar}
        />
      </When>
    </Box>
  )
}
