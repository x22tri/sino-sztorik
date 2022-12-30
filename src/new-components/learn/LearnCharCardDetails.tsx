import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  Fragment,
  ReactNode,
  FC,
  CSSProperties,
} from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import { Character, valueof } from '../shared/interfaces'
import { CHARS } from './MOCK_CHARS'
import Story from './Story'
import {
  Button,
  Card,
  IconButton,
  Stack,
  TypographyProps,
  useTheme,
} from '@mui/material'
import InfoChips from './info-chips/InfoChips'
import { Display, Spacer } from '../shared/utility-components'
import { ConstituentList } from './ConstituentList'
import { StoryTypeSwitch } from './StoryTypeSwitch'
import { KeywordExplanation } from './KeywordExplanation'
import { useStoryHorizontalPadding } from './useStoryHorizontalPadding'
import {
  IconDefinition,
  faChartColumn,
  faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LearnActionButton } from '../shared/basic-components'
import { Presentation } from './Presentation'

export default function LearnCharCardDetails({
  lessonChar,
  charToReturnToFromFlashback,
  setCharToReturnToFromFlashback,
}: {
  lessonChar: Character
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
    keyword,
    newPrimitive,
    otherUses,
    pinyin,
    primitiveMeaning,
    productivePhonetic,
    reminder,
    story,
  } = currentlyViewedChar

  return (
    <Box minWidth={0}>
      <Snackbar
        open={isErrorSnackbarOpen}
        autoHideDuration={6000}
        message='Constituent not found.'
      />
      <InfoChips char={currentlyViewedChar} />
      <Box
        borderRadius={2}
        paddingX={useStoryHorizontalPadding()}
        paddingY={1}
        sx={{ backgroundColor: palette.background.paper }}
      >
        <Subheading
          title='Karakter'
          isFirst
          endContent={
            <LearnActionButton
              color='neutral'
              icon={faChartColumn}
              label='Gyakoriság'
            />
          }
        />

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

        <Subheading
          title='Történet'
          endContent={<StorySubheadingEndContent />}
        />

        <Story {...{ story }} />
      </Box>
    </Box>
  )
}

function StorySubheadingEndContent() {
  return (
    <Stack
      direction='row'
      gap={1}
      divider={<Divider flexItem orientation='vertical' />}
    >
      <LearnActionButton
        color='neutral'
        icon={faClockRotateLeft}
        label='Előzmény: []'
      />
      <StoryTypeSwitch />
    </Stack>
  )
}

function Subheading({
  endContent,
  isFirst = false,
  small = false,
  title,
}: {
  endContent?: ReactNode
  isFirst?: boolean
  small?: boolean
  title: string
}) {
  return (
    <Box marginBottom={small ? 1 : 4} marginTop={isFirst ? 1 : 5}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography
          variant='h6'
          fontWeight={700}
          fontSize={small ? '90% !important' : '100%'}
        >
          {title}
        </Typography>
        {endContent}
      </Box>

      <Display if={!small}>
        <Divider />
      </Display>
    </Box>
  )
}
