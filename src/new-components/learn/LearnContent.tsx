import { useEffect } from 'react'
import { useSwiper } from 'swiper/react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material'
import Story from './story/Story'
import InfoChips from './info-chips/InfoChips'
import { Display } from '../shared/utility-components'
import { ConstituentList } from './ConstituentList'
import { Presentation } from './presentation/Presentation'
import { Subheading } from './subheading/Subheading'
import { StoryTypeSwitch } from './subheading/StoryTypeSwitch'
import { Character } from '../shared/interfaces'
import { scrollToTop, useSmallScreen } from '../shared/utility-functions'
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

export default function LearnContent({
  nextChar,
  lessonChar,
  prevChar,
}: {
  nextChar: string | null
  lessonChar: Character
  prevChar: string | null
}) {
  const { constants, palette } = useTheme()

  const swiper = useSwiper()

  const { flashback } = useFlashback()

  useEffect(() => {
    if (!swiper?.params) {
      return
    }

    scrollToTop()

    swiper.updateAutoHeight()

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
    prequel,
    primitiveMeaning,
    productivePhonetic,
    reminder,
    story,
  } = currentChar

  return (
    <Box
      border={`1px solid ${palette.grey[200]}`}
      borderRadius={2}
      marginBottom={1}
      minWidth={0}
      paddingX={useSmallScreen() ? 1 : 2}
      paddingY={1}
      sx={{
        backgroundColor: palette.background.paper,
        maxWidth: constants.maxContentWidth,
        mx: 'auto',
      }}
    >
      <InfoChips
        {...{ frequency, newPrimitive, prequel, productivePhonetic, reminder }}
      />

      <Heading title={LEARN_HEADING_CHARACTER} />

      <Presentation
        {...{ charChinese, explanation, keyword, pinyin, primitiveMeaning }}
      />

      <Display if={constituents}>
        <Subheading title={LEARN_SUBHEADING_CONSTITUENTS} />

        <ConstituentList constituents={constituents!} {...{ lessonChar }} />
      </Display>

      <Heading title={LEARN_HEADING_STORY} endContent={<StoryTypeSwitch />} />

      <Story {...{ story }} />

      <Heading title={LEARN_HEADING_SUPPLEMENTS} />

      <Subheading title={LEARN_SUBHEADING_PHRASES} />

      <Phrases {...{ lessonChar }} />

      <Divider sx={{ mb: 1 }} />

      <CharNavigation {...{ prevChar, nextChar }} />
    </Box>
  )
}
