import { Dispatch, Fragment, SetStateAction, useReducer, useState } from 'react'
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

  const [isFlashback, setIsFlashback] = useState(false)

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
      {constituents ? <ConstituentList {...{ constituents }} /> : null}

      <Typography
        variant='charChinese'
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

function ConstituentList({ constituents }: { constituents: string[] }) {
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
          <Typography component='span' variant='constituent'>
            {constituent}
          </Typography>
        </Fragment>
      ))}
    </Box>
  )
}
