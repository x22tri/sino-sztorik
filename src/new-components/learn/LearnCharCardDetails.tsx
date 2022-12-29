import { Dispatch, SetStateAction, useState, useEffect, Fragment } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import { Character } from '../shared/interfaces'
import { CHARS } from './MOCK_CHARS'
import Story from './Story'
import { Card, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { Theme } from '@material-ui/core'
import { KEYWORD_EXPLANATION_TOOLTIP } from '../shared/strings'
import InfoChips from './info-chips/InfoChips'
import { Display } from '../shared/utility-components'
import { ConstituentList } from './ConstituentList'

export function useStoryHorizontalPadding() {
  return useMediaQuery((theme: Theme) => theme.breakpoints.down('md')) ? 1 : 2
}

export default function LearnCharCardDetails({
  lessonChar,
  charToReturnToFromFlashback,
  setCharToReturnToFromFlashback,
}: {
  lessonChar: Character
  charToReturnToFromFlashback: Character | null
  setCharToReturnToFromFlashback: Dispatch<SetStateAction<Character | null>>
}) {
  const { spacing } = useTheme()

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

      {/* <Divider flexItem /> */}
      {/*<Box sx={{ height: spacing(1) }} /> 

      {/* <Subheading title='Karakter' /> */}

      {/* <Box sx={{ height: spacing(3) }} /> */}

      {/* <Box display='flex' flexDirection='row'> */}
      <Display if={constituents}>
        <ConstituentList constituents={constituents!} {...{ startFlashback }} />
      </Display>

      {/* <Divider sx={{ borderBottomWidth: '2px' }} /> */}

      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        marginTop={constituents ? 0 : 8}
      >
        {/* <Subheading title='Sztori' /> */}
        {/* <Box sx={{ height: spacing(1) }} /> */}

        {/* <Subheading title={''}  /> */}

        {/* <Box sx={{ height: spacing(3) }} /> */}

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

      <InfoChips char={currentlyViewedChar} />

      {/* </Box> */}

      <Box sx={{ height: spacing(5) }} />
      {/* <Subheading title='Sztori' /> */}

      <Story {...{ story }} />
    </Box>
  )
}

function Subheading({ title }: { title: string }) {
  const { palette } = useTheme()
  return (
    <Box sx={{ px: useStoryHorizontalPadding(), color: palette.grey[500] }}>
      {/* <Typography variant='h6'>{title}</Typography> */}
      <Divider sx={{ borderBottomWidth: '2px' }} />
    </Box>
  )
}

function KeywordExplanation() {
  const { palette } = useTheme()

  return (
    <Tooltip title={KEYWORD_EXPLANATION_TOOLTIP}>
      <Box
        display='flex'
        component='span'
        position='absolute'
        right={0}
        top={0}
        color={palette.primary.light}
        sx={{
          transform: 'translate(85%)',
          '&:hover': { color: palette.primary.lightHovered },
        }}
      >
        <FontAwesomeIcon
          size='xs'
          transform='shrink-7'
          icon={faQuestionCircle}
        />
      </Box>
    </Tooltip>
  )
}
