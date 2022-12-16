import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import { SwiperSlide, useSwiper } from 'swiper/react'
import {
  CardSwiperWrapper,
  CardSwiperContent,
  RoundedCard,
  BackButton,
  ContentContainer,
} from '../shared/basic-components'
import { Character, SpecialParagraphStyles } from '../shared/interfaces'
import { CHARS } from './MOCK_CHARS'
import Swiper from 'swiper'
import 'swiper/css'
import {
  BACK_TO_LESSON_FROM_FLASHBACK,
  SPECIAL_PARAGRAPH_EXPLANATION,
  SPECIAL_PARAGRAPH_NOTES,
  SPECIAL_PARAGRAPH_TIP,
  SPECIAL_PARAGRAPH_WHENPRIMITIVE,
} from '../shared/strings'
import {
  mockStory,
  SpecialParagraph as SpecialParagraphType,
  StoryType,
  Segment,
  SpecialParagraphKeys,
  SpecialParagraphKey,
} from './MOCK_STORY'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircle,
  faCube,
  faCubesStacked,
  faInfo,
  faLightbulb,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons'
import Story from './Story'

export default function Learn() {
  const { constants } = useTheme()

  const [charToReturnToFromFlashback, setCharToReturnToFromFlashback] =
    useState<Character | null>(null)

  const [swiperInstance, setSwiperInstance] = useState<Swiper | null>(null) // Outside of Swiper, useSwiper() can't be used.

  function returnFromFlashback() {
    setCharToReturnToFromFlashback(null)
    swiperInstance!.enable()
  }

  return (
    <ContentContainer>
      <Box
        maxWidth={constants.maxContentWidth}
        position='relative'
        margin='auto'
      >
        <Box sx={{ minHeight: '40px' }}>
          {charToReturnToFromFlashback !== null ? (
            <BackButton
              onClick={() => returnFromFlashback()}
              text={`${BACK_TO_LESSON_FROM_FLASHBACK} 
              (${charToReturnToFromFlashback!.charChinese})
              `}
            />
          ) : null}
        </Box>

        <LearnCharCardSwiper
          chars={CHARS}
          {...{
            charToReturnToFromFlashback,
            setCharToReturnToFromFlashback,
            swiperInstance,
            setSwiperInstance,
          }}
        />
      </Box>
    </ContentContainer>
  )
}

function LearnCharCardSwiper({
  chars,
  charToReturnToFromFlashback,
  setCharToReturnToFromFlashback,
  setSwiperInstance,
}: {
  chars: Character[]
  charToReturnToFromFlashback: Character | null
  setCharToReturnToFromFlashback: Dispatch<SetStateAction<Character | null>>
  setSwiperInstance: Dispatch<SetStateAction<Swiper | null>>
}) {
  return (
    <CardSwiperWrapper
      noArrows={charToReturnToFromFlashback !== null}
      {...{ setSwiperInstance }}
    >
      {chars.map(char => (
        <SwiperSlide key={char.id}>
          {({ isActive }) => (
            <CardSwiperContent>
              <LearnCharCardDetails
                lessonChar={char}
                isActiveSlide={isActive}
                {...{
                  charToReturnToFromFlashback,
                  setCharToReturnToFromFlashback,
                }}
              />
            </CardSwiperContent>
          )}
        </SwiperSlide>
      ))}
    </CardSwiperWrapper>
  )
}

function LearnCharCardDetails({
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
    story,
    pinyin,
    frequency,
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
      {constituents ? (
        <ConstituentList
          {...{
            constituents,
            isActiveSlide,
            startFlashback,
          }}
        />
      ) : null}

      <Typography
        variant='chineseHeading'
        component='h2'
        textAlign='center'
        sx={{ mt: constituents ? 1 : 7, mb: 2 }}
      >
        {charChinese}
      </Typography>

      <KeywordPrimitiveBox {...{ keyword, primitiveMeaning }} />

      <Divider sx={{ my: 2 }} />

      {/* <Story {...{ story }} /> */}
      <Story story={mockStory} />
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
  const { palette } = useTheme()

  return (
    <Box display='flex' justifyContent='center'>
      {constituents.map((constituent, index) => (
        <Fragment key={index}>
          {index === 0 ? null : (
            <Divider
              orientation='vertical'
              variant='middle'
              flexItem
              sx={{ mx: 2 }}
            />
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
