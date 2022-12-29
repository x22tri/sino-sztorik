import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  Fragment,
  ReactNode,
} from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import { Character, valueof } from '../shared/interfaces'
import { CHARS } from './MOCK_CHARS'
import Story from './Story'
import { Button, Card, IconButton, Stack, useTheme } from '@mui/material'
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
    pinyin,
    primitiveMeaning,
    story,
  } = currentlyViewedChar

  return (
    <Box minWidth={0} marginX={1}>
      <Snackbar
        open={isErrorSnackbarOpen}
        autoHideDuration={6000}
        message='Constituent not found.'
      />
      <Box paddingX={useStoryHorizontalPadding()}>
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

        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography
            variant='chineseHeading'
            component='ruby'
            marginBottom={1}
            display='flex'
            flexDirection='column-reverse'
            alignItems='center'
          >
            {charChinese}

            <Typography component='rt' fontStyle='italic'>
              {pinyin}
            </Typography>
          </Typography>

          <Display if={keyword}>
            <Typography variant='h4' position='relative' color='primary.main'>
              {keyword}

              <Display if={explanation}>
                <KeywordExplanation />
              </Display>
            </Typography>
          </Display>

          <Display if={primitiveMeaning}>
            <Typography component='h4' variant='primitiveMeaning'>
              {primitiveMeaning}
            </Typography>
          </Display>
        </Box>
        <Display if={constituents}>
          <>
            <Subheading title='Összetétel' small />
            {/* <Typography
              variant='h6'
              fontWeight={700}
              // color={palette.text.secondary}
              marginTop={3}
              marginBottom={1}
            >
              Összetétel
            </Typography> */}

            <ConstituentList
              constituents={constituents!}
              {...{ startFlashback }}
            />
          </>
        </Display>
        {/* <InfoChips char={currentlyViewedChar} /> */}
        <Subheading
          title='Történet'
          endContent={<StorySubheadingEndContent />}
        />
      </Box>
      <Story {...{ story }} />
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
      <LearnActionButton icon={faClockRotateLeft} label='Előzmény: []' />
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
    <Box marginBottom={1} marginTop={isFirst ? 1 : 5}>
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
