import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
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
import { BACK_TO_LESSON_FROM_FLASHBACK } from '../shared/strings'
import {
  ExplanationParagraph,
  mockStory,
  NotesParagraph,
  PrimitiveNotesParagraph,
  SpecialParagraph as SpecialParagraphType,
  StoryType,
  TipParagraph,
  Segment,
  SpecialParagraphKeys,
  SpecialParagraphKey,
} from './MOCK_STORY'

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
      <Box maxWidth={constants.maxContentWidth} position='relative'>
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
    <CardSwiperWrapper {...{ setSwiperInstance }}>
      {chars.map(char => (
        <SwiperSlide key={char.id}>
          {({ isActive }) => (
            <CardSwiperContent noArrows={charToReturnToFromFlashback !== null}>
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

function Story({ story }: { story: string }) {
  return (
    <>
      {/* {story.split('\n').map((storySegment, index) => (
        <Typography
          key={index}
          component='p'
          variant='body1'
          sx={{ mx: 1, mb: 1 }}
        >
          {storySegment}
        </Typography>
      ))} */}
      {parseStory(mockStory)}
    </>
  )
}

function getParagraphKey(
  paragraph: SpecialParagraphType
): [SpecialParagraphKey, string | Segment[]] {
  const { EXPLANATION, TIP, NOTES, WHENPRIMITIVE } = SpecialParagraphKeys

  return EXPLANATION in paragraph
    ? [EXPLANATION, paragraph[EXPLANATION]]
    : TIP in paragraph
    ? [TIP, paragraph[TIP]]
    : NOTES in paragraph
    ? [NOTES, paragraph[NOTES]]
    : [WHENPRIMITIVE, paragraph[WHENPRIMITIVE]]
}

function SpecialParagraph({ paragraph }: { paragraph: SpecialParagraphType }) {
  const { EXPLANATION, TIP, NOTES, WHENPRIMITIVE } = SpecialParagraphKeys

  const dictionary: Record<SpecialParagraphKey, SpecialParagraphStyles> = {
    [EXPLANATION]: {
      backgroundColor: 'blue',
      title: 'Mit jelent?',
    },
    [NOTES]: {
      backgroundColor: 'gray',
      title: 'Megjegyzés',
    },
    [TIP]: {
      backgroundColor: 'yellow',
      title: 'Tipp',
    },
    [WHENPRIMITIVE]: {
      backgroundColor: 'orange',
      title: 'Alapelemként...',
    },
  }

  const [paragraphKey, paragraphContent] = getParagraphKey(paragraph)

  const { backgroundColor, title } = dictionary[paragraphKey]

  return (
    <Box sx={{ backgroundColor }}>
      {title}
      <p>{JSON.stringify(paragraphContent)}</p>
    </Box>
  )
}

function parseStory(story: StoryType) {
  return story.map(paragraph => {
    if (Array.isArray(paragraph)) {
      return <p>{JSON.stringify(paragraph)}</p>
    } else {
      return <SpecialParagraph {...{ paragraph }} />
    }
  })
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
            <Divider orientation='vertical' variant='middle' flexItem />
          )}

          <Button
            onClick={() => startFlashback(constituent)}
            tabIndex={isActiveSlide ? index + 1 : -1}
            sx={{
              p: 0,
              color: 'inherit',
              typography: 'chineseNormal',
              '&:hover': {
                backgroundColor: 'inherit',
                color: palette.grey[700],
                cursor: 'pointer',
              },
              '&:focus': {
                color: palette.grey[700],
              },
            }}
          >
            {constituent}
          </Button>
        </Fragment>
      ))}
    </Box>
  )
}
