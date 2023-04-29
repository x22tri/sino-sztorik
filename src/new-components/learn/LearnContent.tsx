import { useEffect } from 'react'
import { useSwiper } from 'swiper/react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material'
import Story from './story/Story'
import InfoChips from './info-chips/InfoChips'
import { ConstituentList } from './ConstituentList'
import { Presentation } from './presentation/Presentation'
import { Subheading } from './subheading/Subheading'
import { StoryTypeSwitch } from './subheading/StoryTypeSwitch'
import { Character } from '../shared/interfaces'
import { scrollToTop } from '../shared/utility-functions'
import { useSmallScreen } from '../shared/hooks/useSmallScreen'
import { CharNavigation } from './char-navigation/CharNavigation'
import { Phrases } from './Phrases'
import { Heading } from './subheading/Heading'
import { useFlashback } from './logic/useFlashback'
import {
  LEARN_HEADING_CHARACTER,
  LEARN_SUBHEADING_CONSTITUENTS,
  LEARN_HEADING_STORY,
  LEARN_HEADING_SUPPLEMENTS,
  LEARN_SUBHEADING_PHRASES,
} from '../shared/strings'
import { If, Then, When } from 'react-if'
import { ConstituentListNew } from './ConstituentListNew'

export default function LearnContent({
  nextChar,
  lessonChar,
  prevChar,
}: {
  nextChar: string | null
  lessonChar: Character
  prevChar: string | null
}) {
  const { constants, palette, spacing } = useTheme()

  const swiper = useSwiper()

  const { flashback } = useFlashback()

  useEffect(() => {
    if (!swiper?.params) {
      return
    }

    scrollToTop()

    // swiper.updateAutoHeight()

    flashback === null ? swiper.enable() : swiper.disable()
  }, [flashback, swiper])

  const currentChar = flashback ?? lessonChar

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
      // border={`1px solid ${palette.grey[300]}`}

      boxSizing='border-box'
      // display='grid'
      maxHeight='100%'
      // minWidth={0}
      // marginX='auto'
      component='main'
      sx={{ bgcolor: 'background.paper', overflowY: 'auto' }}
    >
      <Box
        // borderRadius={4}
        // gridArea='learnContent'
        marginBottom={1}
        // marginX='auto'
        maxWidth='56rem'
        paddingBottom={3}
        paddingX={2}
        sx={{ p: `${spacing(1)} ${spacing(2)} ${spacing(3)}` }}
      >
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

        {/* <Divider sx={{ my: 1 }} /> */}

        {/* <CharNavigation {...{ prevChar, nextChar }} /> */}
      </Box>
    </Box>
  )
}
