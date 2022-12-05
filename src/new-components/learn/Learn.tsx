import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { SwiperSlide, useSwiper } from 'swiper/react'
import {
  CardSwiperWrapper,
  CardSwiperContent,
  RoundedCard,
  BackButton,
} from '../shared/basic-components'
import { Character } from '../shared/interfaces'
import { CHARS } from './MOCK_CHARS'
import 'swiper/css'
import Swiper from 'swiper'

export default function Learn() {
  const { constants } = useTheme()

  const [charToReturnToFromFlashback, setCharToReturnToFromFlashback] =
    useState<Character | null>(null)

  const [swiperInstance, setSwiperInstance] = useState<Swiper | null>(null)

  function returnFromFlashback() {
    setCharToReturnToFromFlashback(null)
    swiperInstance!.enable()
  }

  return (
    <Container component='main' maxWidth='lg' sx={{ pt: '2em', px: 0 }}>
      <Box maxWidth={constants.maxContentWidth} position='relative'>
        {charToReturnToFromFlashback !== null ? (
          <BackButton
            onClick={() => returnFromFlashback()}
            text={`Vissza a leckébe (${
              charToReturnToFromFlashback!.charChinese
            })`}
          />
        ) : null}

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
    </Container>
  )
}

function LearnCharCardSwiper({
  chars,
  charToReturnToFromFlashback,
  setCharToReturnToFromFlashback,
  swiperInstance,
  setSwiperInstance,
}: {
  chars: Character[]
  charToReturnToFromFlashback: Character | null
  setCharToReturnToFromFlashback: Dispatch<SetStateAction<Character | null>>
  swiperInstance: Swiper | null
  setSwiperInstance: Dispatch<SetStateAction<Swiper | null>>
}) {
  return (
    <CardSwiperWrapper {...{ setSwiperInstance }}>
      {chars.map(char => (
        <SwiperSlide key={char.id}>
          <CardSwiperContent noArrows={charToReturnToFromFlashback !== null}>
            <LearnCharCardDetails
              {...{
                char,
                charToReturnToFromFlashback,
                setCharToReturnToFromFlashback,
                swiperInstance,
              }}
            />
          </CardSwiperContent>
        </SwiperSlide>
      ))}
    </CardSwiperWrapper>
  )
}

function LearnCharCardDetails({
  char,
  charToReturnToFromFlashback,
  setCharToReturnToFromFlashback,
  swiperInstance,
}: {
  char: Character
  charToReturnToFromFlashback: Character | null
  setCharToReturnToFromFlashback: Dispatch<SetStateAction<Character | null>>
  swiperInstance: Swiper | null
}) {
  const [charOverride, setCharOverride] = useState<Character | null>(null)

  useEffect(() => {
    if (charToReturnToFromFlashback === null) {
      setCharOverride(null)
    }
  }, [charToReturnToFromFlashback])

  function startFlashback(constituent: string) {
    setCharToReturnToFromFlashback(char)

    const charToFlashbackTo = findCharToFlashbackTo(constituent)

    setCharOverride(charToFlashbackTo)

    swiperInstance!.disable()
  }

  function findCharToFlashbackTo(constituent: string) {
    return CHARS[0]
  }

  const currentlyViewedChar = charOverride ?? char

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
        m: 2,
        ...(charToReturnToFromFlashback !== null
          ? { borderColor: 'black' }
          : {}),
      }}
      className='disable-select'
    >
      {constituents ? (
        <ConstituentList
          {...{
            constituents,
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
      {story.split('\n').map((storySegment, index) => (
        <Typography
          key={index}
          component='p'
          variant='body1'
          sx={{ mx: 1, mb: 1 }}
        >
          {storySegment}
        </Typography>
      ))}
    </>
  )
}

function ConstituentList({
  constituents,
  startFlashback,
}: {
  constituents: string[]
  startFlashback: (constituent: string) => void
}) {
  return (
    <Box display='flex' justifyContent='center'>
      {constituents.map((constituent, index) => (
        <Fragment key={index}>
          {index === 0 ? null : (
            <Divider
              orientation='vertical'
              variant='middle'
              flexItem
              sx={{ mx: 1 }}
            />
          )}
          <Typography
            component='span'
            variant='chineseNormal'
            onClick={() => startFlashback(constituent)}
          >
            {constituent}
          </Typography>
        </Fragment>
      ))}
    </Box>
  )
}
