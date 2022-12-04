import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { SwiperSlide } from 'swiper/react'
import {
  CardSwiperWrapper,
  CardSwiperContent,
} from '../shared/basic-components'
import { Character } from '../shared/interfaces'
import { CHARS } from './MOCK_CHARS'
import 'swiper/css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCubes, faKey } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '@mui/material'

export default function Learn() {
  const maxContentWidth = '48rem'

  //   const [currentCharIndex, setCurrentCharIndex] = useState<number>(0)

  return (
    <Container component='main' maxWidth='lg' sx={{ pt: '2em', px: 0 }}>
      <Box maxWidth={maxContentWidth} position='relative'>
        {/* <BackToLessonSelectButton onClick={closeLessonDetails} /> */}

        <LearnCharCardSwiper chars={CHARS} />
      </Box>
    </Container>
  )
}

function LearnCharCardSwiper({
  chars,
}: //   currentCharIndex,
{
  chars: Character[]
  //   currentCharIndex: number
}) {
  return (
    <CardSwiperWrapper>
      {chars.map(char => (
        <SwiperSlide key={char.id}>
          <CardSwiperContent>
            <LearnCharCardDetails {...{ char }} />
          </CardSwiperContent>
        </SwiperSlide>
      ))}
    </CardSwiperWrapper>
  )
}

function LearnCharCardDetails({ char }: { char: Character }) {
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
    <Box>
      <Typography variant='charChinese' component='div' textAlign='center'>
        {charChinese}
      </Typography>

      <Keyword {...{ keyword }} />

      {primitiveMeaning ? <PrimitiveMeaning {...{ primitiveMeaning }} /> : null}
    </Box>
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
