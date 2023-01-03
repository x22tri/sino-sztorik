import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { ContentContainer } from '../shared-components/ContentContainer'
import { Character } from '../shared/interfaces'
import { CHARS } from './MOCK_CHARS'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import LearnContent from './LearnContent'
import { LearnAppbar } from './learn-appbar/LearnAppbar'
import SwiperInstance, { EffectCreative, EffectFade, Keyboard } from 'swiper'
import useKeydown, {
  scrollToTop,
  useSmallScreen,
} from '../shared/utility-functions'
import { useFlashback } from './logic/useFlashback'

const creativeEffect = {
  prev: {
    opacity: 0,
    translate: ['-20%', 0, -1],
  },
  next: {
    opacity: 1,
    translate: ['100%', 0, 1],
  },
}

export default function Learn() {
  const { constants } = useTheme()

  const lessonDataSource = CHARS

  // const [charToReturnToFromFlashback, setCharToReturnToFromFlashback] =
  //   useState<Character | null>(null)

  // const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
  //   null
  // )

  // const [activeIndex, setActiveIndex] = useState(0)

  // useKeydown(({ key }) => {
  //   if (key === 'ArrowLeft') {
  //     swiperInstance?.slidePrev()
  //   }

  //   if (key === 'ArrowRight') {
  //     swiperInstance?.slideNext()
  //   }
  // })

  return (
    <>
      {/* <LearnAppbar
        lessonLength={CHARS.length}
        {...{
          activeIndex,
          // charToReturnToFromFlashback,
          // returnFromFlashback,
          // swiperInstance,
        }}
      /> */}

      {/* <ContentContainer> */}
      <Swiper
        autoHeight
        // centeredSlides
        effect={useSmallScreen() ? 'creative' : 'slide'}
        // onSwiper={swiper => setSwiperInstance(swiper)}
        onSlideChange={({ activeIndex }) => {
          // setActiveIndex(activeIndex) // Causes lag on mobile. To-Do: See if there's a way to remove lag.
          scrollToTop()
        }}
        onSlideChangeTransitionEnd={scrollToTop}
        modules={[EffectCreative]}
        spaceBetween={0}
        simulateTouch={false}
        style={{
          // maxWidth: constants.maxContentWidth,
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
        {...{ creativeEffect }}
      >
        <LearnAppbar
          lessonLength={CHARS.length}
          {
            ...{
              // activeIndex,
              // charToReturnToFromFlashback,
              // returnFromFlashback,
              // swiperInstance,
            }
          }
        />
        {lessonDataSource.map((char, index) => (
          <SwiperSlide key={index}>
            <LearnContent
              lessonChar={char}
              prevChar={lessonDataSource[index - 1]?.charChinese ?? null}
              nextChar={lessonDataSource[index + 1]?.charChinese ?? null}
              {...{
                // charToReturnToFromFlashback,
                index,
                // setCharToReturnToFromFlashback,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* </ContentContainer> */}

      {/* <Button onClick={() => moveToPreviousCharacter()}>prev</Button>
      <Button onClick={() => moveToNextCharacter()}>next</Button> */}
    </>
  )
}
