import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import Story from './story/Story'
import { Presentation } from './presentation/Presentation'
import { Subheading } from './subheading/Subheading'
import { AssembledLesson, Character, Constituent, OtherUse, Paragraph, Phrase } from '../shared/interfaces'
import { PrevNextButtons } from '../shared/components/PrevNextButtons'
import { PhrasesAndOtherUses } from './phrases-and-other-uses/PhrasesAndOtherUses'
import { Heading } from './subheading/Heading'
import {
  LEARN_HEADING_CHARACTER,
  LEARN_SUBHEADING_CONSTITUENTS,
  LEARN_HEADING_STORY,
  LEARN_SUBHEADING_PHRASES,
  LEARN_FINISH_LESSON_BUTTON,
  LEARN_SUBHEADING_OTHER_USES,
} from '../shared/strings'
import { When } from 'react-if'
import { ConstituentList } from './ConstituentList'
import { useStore } from '../shared/logic/useStore'
import { Frequency } from './frequency/Frequency'
import { useLoaderData } from 'react-router-dom'
import { useLargeScreen } from '../shared/hooks/useLargeScreen'
import { OtherUses } from './other-uses/OtherUses'

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
  const { charChinese, constituents, otherUses, phrases, story } = currentChar

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

          {/* <OtherUsesSection {...{ otherUses }} /> */}
        </When>
      </Box>

      <When condition={isLargeScreen}>
        <Box gridArea='aside'>
          {/* Keep elements below in sync with duplicates above until CSS Grid Masonry is supported widely */}
          <ConstituentsSection {...{ constituents }} />

          <PhrasesAndOtherUsesSection currentChar={charChinese} {...{ otherUses, phrases }} />

          {/* <OtherUsesSection {...{ otherUses }} /> */}
        </Box>
      </When>

      <When condition={!flashbackChar}>
        <PrevNextButtons
          customEndElement={
            <Button disableElevation variant='contained' href='/' sx={{ borderRadius: 6 }}>
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

function ConstituentsSection({ constituents }: { constituents?: Constituent[] }) {
  return (
    <When condition={!!constituents}>
      <Subheading title={LEARN_SUBHEADING_CONSTITUENTS} />
      <ConstituentList constituents={constituents!} />
    </When>
  )
}

function StorySection({ story }: { story: Paragraph[] }) {
  return (
    <>
      <Heading title={LEARN_HEADING_STORY} />
      <Story {...{ story }} />
    </>
  )
}

function CharacterSection({ currentChar }: { currentChar: Character }) {
  const { frequency } = currentChar

  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Heading title={LEARN_HEADING_CHARACTER} />

        <When condition={frequency}>
          <Frequency frequency={frequency!} />
        </When>
      </Box>

      <Presentation {...{ currentChar }} />
    </>
  )
}

function PhrasesAndOtherUsesSection({
  currentChar,
  otherUses,
  phrases,
}: {
  currentChar: string
  otherUses?: OtherUse[]
  phrases?: Phrase[]
}) {
  return (
    <When condition={phrases?.length || otherUses?.length}>
      <PhrasesAndOtherUses {...{ currentChar, otherUses, phrases }} />
    </When>
  )
}
