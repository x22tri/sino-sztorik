import { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react'
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
  // charToReturnToFromFlashback,
  nextChar,
  lessonChar,
  prevChar,
}: // setCharToReturnToFromFlashback,
{
  // charToReturnToFromFlashback: Character | null
  nextChar: string | null
  lessonChar: Character
  prevChar: string | null
  // setCharToReturnToFromFlashback: Dispatch<SetStateAction<Character | null>>
}) {
  const { constants, palette } = useTheme()

  const swiper = useSwiper()

  const { flashback, interrupted, resume, start } = useFlashback()

  useEffect(() => {
    if (!swiper?.params) {
      return
    }

    scrollToTop()

    swiper.updateAutoHeight()

    flashback === null ? swiper.enable() : swiper.disable()
  }, [flashback])

  useKeydown(event => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      event.stopPropagation()
      console.log(event)
      swiper.slidePrev()
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      event.stopPropagation()
      console.log(event)
      swiper.slideNext()
    }
  })

  function startFlashback(constituent: string) {
    const charToFlashbackTo = findCharToFlashbackTo(constituent)

    if (charToFlashbackTo === null) {
      console.log('Constituent not found.')
      return
    }

    // setCharToReturnToFromFlashback(lessonChar)

    // setCharOverride(charToFlashbackTo)

    start(charToFlashbackTo, lessonChar)

    // swiper.disable()

    // scrollToTop()

    // setTimeout(() => swiper.updateAutoHeight(), 200)
  }

  // const currentlyViewedChar = charOverride ?? lessonChar
  const currentlyViewedChar = flashback ?? lessonChar

  const {
    charChinese,
    constituents,
    explanation,
    frequency,
    keyword,
    newPrimitive,
    otherUses,
    pinyin,
    prequel,
    primitiveMeaning,
    productivePhonetic,
    reminder,
    story,
  } = currentlyViewedChar

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

          <ConstituentList
            constituents={constituents!}
            {...{ startFlashback }}
          />
        </>
      </Display>

      <Heading title='Történet' endContent={<StoryTypeSwitch />} />

      <Story {...{ story }} />

      <Heading title='Kiegészítő információk' />

      <Subheading title='Kifejezések a karakterrel' />

      <Phrases {...{ startFlashback }} />

      <Divider sx={{ mb: 1 }} />

      <CharNavigation
        {...{
          // charToReturnToFromFlashback,
          prevChar,
          nextChar,
        }}
      />
    </Box>
  )
}

function findCharToFlashbackTo(constituent: string): Character | null {
  const charInLesson = CHARS.find(char => char.charChinese === constituent)

  if (charInLesson) {
    return charInLesson
  }

  // To-Do: if the char is not in the lesson, fetch it from the server.

  return null
}
