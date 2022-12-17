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
    <RoundedCard
      sx={{
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

      <Typography
        variant='chineseHeading'
        component='h2'
        textAlign='center'
        sx={{ mt: 1, mb: 2 }}
      >
        {charChinese}
      </Typography>

      <KeywordPrimitiveBox {...{ keyword, primitiveMeaning }} />

      <Divider sx={{ my: 2 }} />

      <Story {...{ story }} />
    </RoundedCard>
  )
}

function KeywordPrimitiveBox({
  keyword,
  primitiveMeaning,
}: {
  keyword: string | undefined
  primitiveMeaning: string | undefined
}) {
  return (
    <Box display='flex' flexDirection='column' minHeight='64px'>
      {keyword ? (
        <Typography
          variant='h4'
          display='flex'
          justifyContent='center'
          sx={{ mb: 1 }}
        >
          {keyword}
        </Typography>
      ) : null}

      {primitiveMeaning ? (
        <Typography
          component='h4'
          variant='primitiveMeaning'
          display='flex'
          justifyContent='center'
        >
          {primitiveMeaning}
        </Typography>
      ) : null}
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
          {index === 0 ? null : (
            <Divider orientation='vertical' flexItem sx={{ mx: 2 }} />
          )}

          <Link
            onClick={() => startFlashback(constituent)}
            tabIndex={isActiveSlide ? index + 1 : -1}
            underline='hover'
            sx={{
              p: 0,
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
