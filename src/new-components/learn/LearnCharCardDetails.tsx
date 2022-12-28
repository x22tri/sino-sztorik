import { Dispatch, SetStateAction, useState, useEffect, Fragment } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import { useSwiper } from 'swiper/react'
import { Character } from '../shared/interfaces'
import { CHARS } from './MOCK_CHARS'
import Story from './Story'
import { Tooltip, useMediaQuery, useTheme } from '@mui/material'
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
  const { palette, spacing } = useTheme()

  const swiper = useSwiper()

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

    swiper.disable()
  }

  function findCharToFlashbackTo(constituent: string): Character | null {
    const charInLesson = CHARS.find(char => char.charChinese === constituent)

    if (charInLesson) {
      return charInLesson
    }

    return null
  }

  const currentlyViewedChar = charOverride ?? lessonChar

  const {
    charChinese,
    constituents,
    explanation,
    frequency,
    keyword,
    otherUses,
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
      {/* <Box position='relative' minHeight='32px'> */}
      {/* <Frequency {...{ frequency }} /> */}
      {/* {constituents ? (
        <ConstituentList
          {...{
            constituents,
            isActiveSlide,
            startFlashback,
          }}
        />
      ) : null} */}
      {/* <SupplementsOverview {...{ otherUses }} /> */}
      {/* </Box> */}
      {/* <Subheading title='Karakter' /> */}

      <Box sx={{ height: spacing(3) }} />

      <Box>
        <Typography
          variant='chineseHeading'
          component='h2'
          textAlign='center'
          sx={{ my: 1 }}
        >
          {charChinese}
        </Typography>

        <Display if={keyword}>
          <Box
            display='flex'
            justifyContent='center'
            position='relative'
            typography='h4'
          >
            <Typography
              variant='h4'
              position='relative'
              color={palette.primary.main}
            >
              {keyword}

              <Display if={explanation}>
                <KeywordExplanation />
              </Display>
            </Typography>
          </Box>
        </Display>
      </Box>

      <Display if={primitiveMeaning}>
        <Typography
          component='h4'
          variant='primitiveMeaning'
          display='flex'
          justifyContent='center'
        >
          {primitiveMeaning}
        </Typography>
      </Display>

      <InfoChips char={currentlyViewedChar} />

      <Subheading title='Sztori' />

      <Story {...{ story }} />
    </Box>
  )
}

function Subheading({ title }: { title: string }) {
  const { palette } = useTheme()
  return (
    <Box sx={{ px: useStoryHorizontalPadding(), color: palette.grey[500] }}>
      <Typography variant='h6'>{title}</Typography>
      <Divider sx={{ mb: 2, borderBottomWidth: '2px' }} />
    </Box>
  )
}

function ConstituentList({
  constituents,
  isActiveSlide,
  startFlashback,
}: {
  constituents: string[]
  isActiveSlide: boolean
  startFlashback: (constituent: string) => void
}) {
  return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      {constituents.map((constituent, index) => (
        <Fragment key={index}>
          <Link
            onClick={() => startFlashback(constituent)}
            tabIndex={isActiveSlide ? index + 1 : -1}
            underline='hover'
            sx={{
              mx: 1,
              typography: 'chineseNormal',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            {constituent}
          </Link>
        </Fragment>
      ))}
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
