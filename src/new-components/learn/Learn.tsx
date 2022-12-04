import { Dispatch, SetStateAction, useReducer, useState } from 'react'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { SwiperSlide } from 'swiper/react'
import {
  CardSwiperWrapper,
  CardSwiperContent,
  RoundedCard,
  BackButton,
} from '../shared/basic-components'
import { Character } from '../shared/interfaces'
import { CHARS } from './MOCK_CHARS'
import 'swiper/css'

export default function Learn() {
  const { constants } = useTheme()

  const [isFlashback, setIsFlashback] = useState(true)

  return (
    <Container component='main' maxWidth='lg' sx={{ pt: '2em', px: 0 }}>
      <Box maxWidth={constants.maxContentWidth} position='relative'>
        {isFlashback ? (
          <BackButton onClick={() => setIsFlashback(false)} text={'aaa'} />
        ) : null}

        <LearnCharCardSwiper
          chars={CHARS}
          {...{ isFlashback, setIsFlashback }}
        />
      </Box>
    </Container>
  )
}

function LearnCharCardSwiper({
  chars,
  isFlashback,
  setIsFlashback,
}: {
  chars: Character[]
  isFlashback: boolean
  setIsFlashback: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <CardSwiperWrapper enabled={!isFlashback}>
      {chars.map(char => (
        <SwiperSlide key={char.id}>
          <CardSwiperContent noArrows={isFlashback}>
            <LearnCharCardDetails {...{ char, isFlashback, setIsFlashback }} />
          </CardSwiperContent>
        </SwiperSlide>
      ))}
    </CardSwiperWrapper>
  )
}

function LearnCharCardDetails({
  char,
  isFlashback,
  setIsFlashback,
}: {
  char: Character
  isFlashback: boolean
  setIsFlashback: Dispatch<SetStateAction<boolean>>
}) {
  const {
    charChinese,
    keyword,
    primitiveMeaning,
    constituents,
    story,
    pinyin,
    frequency,
    otherUses,
  } = char

  return (
    <RoundedCard
      sx={{ m: 2, ...(isFlashback ? { borderColor: 'red' } : {}) }}
      className='disable-select'
    >
      <Typography variant='charChinese' component='div' textAlign='center'>
        {charChinese}
      </Typography>

      {keyword ? <Keyword {...{ keyword }} /> : null}

      {primitiveMeaning ? <PrimitiveMeaning {...{ primitiveMeaning }} /> : null}

      <Divider sx={{ my: 2 }} />

      <Story {...{ story }} />
    </RoundedCard>
  )
}

function Keyword({ keyword }: { keyword: string }) {
  return (
    <Typography
      component='div'
      variant='h4'
      display='flex'
      justifyContent='center'
      sx={{ mt: 3 }}
    >
      {keyword}
    </Typography>
  )
}

function PrimitiveMeaning({ primitiveMeaning }: { primitiveMeaning: string }) {
  return (
    <Typography
      component='div'
      variant='primitiveMeaning'
      display='flex'
      justifyContent='center'
    >
      {primitiveMeaning}
    </Typography>
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
