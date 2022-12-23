import { Dispatch, SetStateAction, useState } from 'react'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import {
  CardSwiperWrapper,
  CardSwiperContent,
  BackButton,
  ContentContainer,
} from '../shared/basic-components'
import { Character } from '../shared/interfaces'
import { BACK_TO_LESSON_FROM_FLASHBACK } from '../shared/strings'
import { CHARS } from './MOCK_CHARS'
import Swiper from 'swiper'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import LearnCharCardDetails from './LearnCharCardDetails'
import { LearnAppbar } from '../toolbar/AppbarWrapper'

export default function Learn() {
  const { constants } = useTheme()

  const lessonDataSource = CHARS

  const [charToReturnToFromFlashback, setCharToReturnToFromFlashback] =
    useState<Character | null>(null)

  const [swiperInstance, setSwiperInstance] = useState<Swiper | null>(null) // Outside of Swiper, useSwiper() can't be used.

  const [activeIndex, setActiveIndex] = useState(0)

  function returnFromFlashback() {
    setCharToReturnToFromFlashback(null)
    swiperInstance!.enable()
  }

  return (
    <>
      <LearnAppbar lessonLength={CHARS.length} {...{ activeIndex }} />
      <ContentContainer>
        <Box
          maxWidth={constants.maxContentWidth}
          height='100%'
          position='relative'
          margin='auto'
        >
          <Box sx={{ minHeight: constants.backButtonStripHeight }}>
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
            chars={lessonDataSource}
            {...{
              charToReturnToFromFlashback,
              setCharToReturnToFromFlashback,
              swiperInstance,
              setSwiperInstance,
              setActiveIndex,
            }}
          />
        </Box>
      </ContentContainer>
    </>
  )
}

function LearnCharCardSwiper({
  chars,
  charToReturnToFromFlashback,
  setCharToReturnToFromFlashback,
  setSwiperInstance,
  setActiveIndex,
}: {
  chars: Character[]
  charToReturnToFromFlashback: Character | null
  setCharToReturnToFromFlashback: Dispatch<SetStateAction<Character | null>>
  setSwiperInstance: Dispatch<SetStateAction<Swiper | null>>
  setActiveIndex: Dispatch<SetStateAction<number>>
}) {
  return (
    <CardSwiperWrapper
      noArrows={charToReturnToFromFlashback !== null}
      {...{ setSwiperInstance, setActiveIndex }}
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
