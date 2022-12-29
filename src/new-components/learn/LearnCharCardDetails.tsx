import { Dispatch, SetStateAction, useState, useEffect, Fragment } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import { Character } from '../shared/interfaces'
import { CHARS } from './MOCK_CHARS'
import Story from './Story'
import { Button, Card, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { Theme } from '@material-ui/core'
import { KEYWORD_EXPLANATION_TOOLTIP } from '../shared/strings'
import InfoChips from './info-chips/InfoChips'
import { Display } from '../shared/utility-components'

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
      {/* <InfoChips char={currentlyViewedChar} /> */}

      {/* <Divider flexItem /> */}
      {/*<Box sx={{ height: spacing(1) }} /> 

      {/* <Subheading title='Karakter' /> */}

      {/* <Box sx={{ height: spacing(3) }} /> */}

      {/* <Box display='flex' flexDirection='row'> */}
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Display if={constituents}>
          <ConstituentList
            constituents={constituents!}
            {...{ startFlashback }}
          />
        </Display>

        {/* <Subheading title='Sztori' /> */}
        {/* <Box sx={{ height: spacing(1) }} /> */}

        {/* <Subheading title={''}  /> */}

        <Divider flexItem sx={{ borderBottomWidth: '2px' }} />

        <Box sx={{ height: spacing(1) }} />

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

      {/* </Box> */}

      <Box sx={{ height: spacing(3) }} />
      <Subheading title='Sztori' />

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

function ConstituentList({
  constituents,
  startFlashback,
}: {
  constituents: string[]
  startFlashback: (constituent: string) => void
}) {
  const { constants, palette, typography } = useTheme()

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <Box
      display='flex'
      // justifyContent='center'
      alignItems='center'
      width='100%'
      gap={2}
      sx={{ p: 1 }}
    >
      {constituents.map((constituent, index) => {
        const isHovered = hoveredIndex === index

        return (
          <Button
            key={index}
            onClick={() => startFlashback(constituent)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            startIcon={
              <Typography
                variant='chineseNormal'
                sx={{
                  color: isHovered
                    ? palette.secondary.contrastText
                    : palette.text.primary,
                  backgroundColor: isHovered
                    ? palette.secondary.main
                    : palette.secondary.light,
                  borderRadius: 6,
                  p: 1,
                  lineHeight: 1,
                  transition: `${constants.animationDuration}ms`,
                }}
              >
                {constituent}
              </Typography>
            }
            variant='text'
            sx={{
              boxShadow: 'none',
              display: 'flex',
              textTransform: 'none',
              px: 1.5,
              '&.MuiButtonBase-root': {
                '&:hover': {
                  boxShadow: 'none',
                  backgroundColor: 'initial',
                },
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Typography
                component='span'
                sx={{
                  ...typography.storySegments.keyword,
                  color: isHovered
                    ? palette.primary.main
                    : palette.text.disabled,
                  fontSize: '80%',
                  transition: `${constants.animationDuration}ms`,
                }}
                lineHeight={1}
              >
                keyword
              </Typography>
              <Typography
                component='span'
                sx={{
                  ...typography.storySegments.primitive,
                  color: isHovered
                    ? palette.secondary.main
                    : palette.text.primary,
                  transition: `${constants.animationDuration}ms`,
                }}
                lineHeight={1}
              >
                primitive
              </Typography>
            </Box>
          </Button>
        )
      })}
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
