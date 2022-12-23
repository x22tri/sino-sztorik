import { Dispatch, SetStateAction, useState, useEffect, Fragment } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import { useSwiper } from 'swiper/react'
import { RoundedCard } from '../shared/basic-components'
import { Character } from '../shared/interfaces'
import Frequency from './Frequency'
import { CHARS } from './MOCK_CHARS'
import Story from './Story'
import SupplementsOverview from './SupplementsOverview'
import { blue, teal } from '@mui/material/colors'
import { useTheme } from '@mui/material'

export default function LearnCharCardDetails({
  lessonChar,
  charToReturnToFromFlashback,
  isActiveSlide,
  setCharToReturnToFromFlashback,
}: {
  lessonChar: Character
  charToReturnToFromFlashback: Character | null
  isActiveSlide: boolean
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
    keyword,
    primitiveMeaning,
    constituents,
    frequency,
    story,
    otherUses,
  } = currentlyViewedChar

  return (
    <Box
      sx={{
        mx: 1,
        ...(charToReturnToFromFlashback !== null
          ? { borderColor: 'black' }
          : {}),
      }}
      className='disable-select'
    >
      <Snackbar
        open={isErrorSnackbarOpen}
        autoHideDuration={6000}
        message='Constituent not found.'
      />
      <Box position='relative' minHeight='32px'>
        <Frequency {...{ frequency }} />

        {constituents ? (
          <ConstituentList
            {...{
              constituents,
              isActiveSlide,
              startFlashback,
            }}
          />
        ) : null}

        <SupplementsOverview {...{ otherUses }} />
      </Box>
      <Box
        position='relative'
        zIndex={2}
        sx={{
          borderRadius: '12px',
          border: `2px solid`,
          boxShadow: `3px 5px ${palette.grey[400]}`,
          py: 2,
          my: 1,
        }}
      >
        <Typography
          variant='chineseHeading'
          component='h2'
          textAlign='center'
          sx={{ my: 1 }}
        >
          {charChinese}
        </Typography>

        {!keyword ? null : (
          <Typography variant='h4' display='flex' justifyContent='center'>
            {keyword}
          </Typography>
        )}
      </Box>

      {!primitiveMeaning ? null : (
        <Box
          sx={{
            borderRadius: '0 8px',
            border: `2px solid ${palette.secondary.main}`,
            boxShadow: `3px 5px ${palette.secondary.main}`,
            backgroundColor: `${palette.background.default}`,
            py: 0.5,
          }}
        >
          <Typography
            component='h4'
            variant='primitiveMeaning'
            display='flex'
            justifyContent='center'
          >
            {primitiveMeaning}
          </Typography>
        </Box>
      )}

      <Box sx={{ height: spacing(2) }} />

      <Story {...{ story }} />
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
