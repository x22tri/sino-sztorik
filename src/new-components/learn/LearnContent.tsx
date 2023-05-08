import { useEffect } from 'react'
import { useSwiper } from 'swiper/react'
import Box from '@mui/material/Box'
import { Button, useTheme } from '@mui/material'
import Story from './story/Story'
import { Presentation } from './presentation/Presentation'
import { Subheading } from './subheading/Subheading'
import { Character } from '../shared/interfaces'
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
import { ConstituentListNew } from './ConstituentListNew'
import { useStore } from '../shared/logic/useStore'

export default function LearnContent({
  nextChar,
  lessonChar,
  prevChar,
}: {
  nextChar: string | null
  lessonChar: Character
  prevChar: string | null
}) {
  const swiper = useSwiper()
  const { spacing } = useTheme()
  const { flashbackChar } = useStore('flashback')

  useEffect(() => {
    if (!swiper?.params) {
      return
    }

    scrollToTop()

    !flashbackChar ? swiper.enable() : swiper.disable()
  }, [flashbackChar, swiper])

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
      sx={{ bgcolor: 'background.paper', gridTemplateColumns: { xs: '1fr', lg: '3fr 1fr' }, overflowY: 'auto' }}
    >
      <Box>
        {/* <InfoChips
        {...{ frequency, newPrimitive, prequel, productivePhonetic, reminder }}
      /> */}

        <Heading title={LEARN_HEADING_CHARACTER} />

        <Presentation {...{ charChinese, explanation, keyword, pinyin, primitiveMeaning }} />

        <When condition={!!constituents}>
          <Subheading title={LEARN_SUBHEADING_CONSTITUENTS} />
          <ConstituentListNew constituents={constituents!} />
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

        <PrevNextButtons
          customEndElement={
            <Button disableElevation color='secondary' variant='contained' href='/' sx={{ borderRadius: 6 }}>
              {LEARN_FINISH_LESSON_BUTTON}
            </Button>
          }
          prev={prevChar}
          next={nextChar}
        />
      </Box>
    </Box>
  )
}
