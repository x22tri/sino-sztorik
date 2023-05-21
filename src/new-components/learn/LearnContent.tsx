import { useEffect } from 'react'
import Box from '@mui/material/Box'
import { Button, useTheme } from '@mui/material'
import Story from './story/Story'
import { Presentation } from './presentation/Presentation'
import { Subheading } from './subheading/Subheading'
import { AssembledLesson, Character } from '../shared/interfaces'
import { scrollToTop } from '../shared/utility-functions'
import { PrevNextButtons } from '../shared/components/PrevNextButtons'
import { Phrases } from './Phrases'
import { Heading } from './subheading/Heading'
import {
  LEARN_HEADING_CHARACTER,
  LEARN_SUBHEADING_CONSTITUENTS,
  LEARN_HEADING_STORY,
  LEARN_HEADING_SUPPLEMENTS,
  LEARN_SUBHEADING_PHRASES,
  LEARN_FINISH_LESSON_BUTTON,
} from '../shared/strings'
import { When } from 'react-if'
import { ConstituentList } from './ConstituentList'
import { useStore } from '../shared/logic/useStore'
import { Frequency } from './frequency/Frequency'
import { useLoaderData } from 'react-router-dom'

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
  const { spacing } = useTheme()
  const { flashbackChar } = useStore('flashback')
  const { swiperInstance } = useStore('swiper')

  useEffect(() => {
    if (!swiperInstance?.params) {
      return
    }

    scrollToTop()

    !flashbackChar ? swiperInstance.enable() : swiperInstance.disable()
  }, [flashbackChar, swiperInstance])

  const prevChar = lesson.characters[index - 1]?.charChinese ?? null
  const nextChar = lesson.characters[index + 1]?.charChinese ?? null
  const currentChar = flashbackChar ?? lessonChar

  const {
    charChinese,
    constituents,
    explanation,
    frequency,
    keyword,
    newPrimitive,
    pinyin,
    phrases,
    prequel,
    primitiveMeaning,
    productivePhonetic,
    reminder,
    story,
  } = currentChar

  return (
    <Box
      boxSizing='border-box'
      component='main'
      display='grid'
      maxHeight='100%'
      padding={`0 ${spacing(2)} ${spacing(3)}`}
      sx={{
        bgcolor: 'background.paper',
        // gridTemplateColumns: { xs: '1fr', lg: '3fr 1fr' },
        gridTemplateRows: 'auto max-content',
        mt: `${toolbarHeight}px`,
        minHeight: `calc(100vh - ${toolbarHeight}px)`,
      }}
    >
      <Box>
        {/* <InfoChips
        {...{ frequency, newPrimitive, prequel, productivePhonetic, reminder }}
      /> */}

        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Heading title={LEARN_HEADING_CHARACTER} />
          <When condition={frequency}>
            <Frequency frequency={frequency!} />
          </When>
        </Box>

        <Presentation {...{ charChinese, explanation, keyword, pinyin, primitiveMeaning }} />

        <When condition={!!constituents}>
          <Subheading title={LEARN_SUBHEADING_CONSTITUENTS} />
          <ConstituentList constituents={constituents!} />
        </When>

        <Heading title={LEARN_HEADING_STORY} />

        <Story {...{ story }} />

        <When condition={phrases?.length}>
          {/* To-Do: Add other uses, etc. */}
          <Heading title={LEARN_HEADING_SUPPLEMENTS} />
          <When condition={phrases?.length}>
            <Subheading title={LEARN_SUBHEADING_PHRASES} />
            <Phrases lessonChar={charChinese} phrases={phrases!} />
          </When>
        </When>
      </Box>

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
