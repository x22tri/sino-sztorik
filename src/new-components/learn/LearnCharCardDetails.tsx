import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  Fragment,
  FC,
  CSSProperties,
} from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Snackbar from '@mui/material/Snackbar'
import { Character, valueof } from '../shared/interfaces'
import { CHARS } from './MOCK_CHARS'
import Story from './story/Story'
import {
  Button,
  Card,
  IconButton,
  TypographyProps,
  useTheme,
} from '@mui/material'
import InfoChips from './info-chips/InfoChips'
import { Display, Spacer } from '../shared/utility-components'
import { ConstituentList } from './ConstituentList'
import { KeywordExplanation } from './presentation/KeywordExplanation'
import { useStoryHorizontalPadding } from './useStoryHorizontalPadding'
import {
  IconDefinition,
  faChartColumn,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LearnActionButton } from '../shared-components/LearnActionButton'
import { Presentation } from './presentation/Presentation'
import { Subheading } from './subheading/Subheading'
import { StoryTypeSwitch } from './subheading/StoryTypeSwitch'
import { useSwiper } from 'swiper/react'

export default function LearnCharCardDetails({
  lessonChar,
  index,
  charToReturnToFromFlashback,
  setCharToReturnToFromFlashback,
}: {
  lessonChar: Character
  index: number
  charToReturnToFromFlashback: Character | null
  setCharToReturnToFromFlashback: Dispatch<SetStateAction<Character | null>>
}) {
  const { palette } = useTheme()

  const [charOverride, setCharOverride] = useState<Character | null>(null)

  const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useState(false)

  useEffect(() => {
    if (charToReturnToFromFlashback === null) {
      setCharOverride(null)
    }
  }, [charToReturnToFromFlashback])

  function startFlashback(constituent: string) {
    const charToFlashbackTo = findCharToFlashbackTo(constituent)

    if (charToFlashbackTo === null) {
      setIsErrorSnackbarOpen(true)
      return
    }

    setCharToReturnToFromFlashback(lessonChar)

    setCharOverride(charToFlashbackTo)
  }

  function findCharToFlashbackTo(constituent: string): Character | null {
    const charInLesson = CHARS.find(char => char.charChinese === constituent)

    if (charInLesson) {
      return charInLesson
    }

    // To-Do: if the char is not in the lesson, fetch it from the server.

    return null
  }

  const currentlyViewedChar = charOverride ?? lessonChar

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

  const swiper = useSwiper()

  console.log(swiper.activeIndex, charChinese, index)

  return (
    <Box
      minWidth={0}
      // marginBottom='-1px'
      marginBottom={1}
      border={`1px solid ${palette.grey[200]}`}
    >
      <Snackbar
        open={isErrorSnackbarOpen}
        autoHideDuration={6000}
        message='Constituent not found.'
      />

      <Box
        borderRadius={2}
        paddingX={useStoryHorizontalPadding()}
        paddingY={1}
        sx={{ backgroundColor: palette.background.paper }}
      >
        <InfoChips char={currentlyViewedChar} />

        <Subheading title='Karakter' isFirst />

        <Presentation
          {...{ charChinese, explanation, keyword, pinyin, primitiveMeaning }}
        />

        <Display if={constituents}>
          <>
            <Subheading title='Összetétel' small />

            <ConstituentList
              constituents={constituents!}
              {...{ startFlashback }}
            />
          </>
        </Display>

        <Subheading title='Történet' endContent={<StoryTypeSwitch />} />

        <Story {...{ story }} />
      </Box>
    </Box>
  )
}
