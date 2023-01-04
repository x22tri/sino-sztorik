import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react'
import Swiper from 'swiper'
import { useSwiper } from 'swiper/react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { Grid, useTheme } from '@mui/material'
import { CHARS } from './MOCK_CHARS'
import Story from './story/Story'
import InfoChips from './info-chips/InfoChips'
import { Display } from '../shared/utility-components'
import { ConstituentList } from './ConstituentList'
import { Presentation } from './presentation/Presentation'
import { Subheading } from './subheading/Subheading'
import { StoryTypeSwitch } from './subheading/StoryTypeSwitch'
import { Character } from '../shared/interfaces'
import useKeydown, {
  scrollToTop,
  useSmallScreen,
} from '../shared/utility-functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { CharNavigation } from './char-navigation/CharNavigation'
import { Phrases } from './Phrases'
import { Heading } from './subheading/Heading'
import { useFlashback } from './logic/useFlashback'

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
  }, [flashback])

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

      <Heading title='Karakter' />

      <Presentation
        {...{ charChinese, explanation, keyword, pinyin, primitiveMeaning }}
      />

      <Display if={constituents}>
        <>
          <Subheading title='Összetétel' />

          <ConstituentList constituents={constituents!} {...{ lessonChar }} />
        </>
      </Display>

      <Heading title='Történet' endContent={<StoryTypeSwitch />} />

      <Story {...{ story }} />

      <Heading title='Kiegészítő információk' />

      <Subheading title='Kifejezések a karakterrel' />

      <Phrases {...{ lessonChar }} />

      <Divider sx={{ mb: 1 }} />

      <CharNavigation {...{ prevChar, nextChar }} />
    </Box>
  )
}
