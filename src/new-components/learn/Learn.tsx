import { KeyboardEvent, useState } from 'react'
import { Box, useTheme } from '@mui/material'
import { ContentContainer } from '../shared-components/ContentContainer'
import { Character } from '../shared/interfaces'
import { CHARS } from './MOCK_CHARS'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import LearnContent from './LearnContent'
import { LearnAppbar } from './learn-appbar/LearnAppbar'
import useEventListener from '@use-it/event-listener'
import SwiperInstance, { EffectCreative, EffectFade, Keyboard } from 'swiper'
import { scrollToTop, useSmallScreen } from '../shared/utility-functions'

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

  const [charToReturnToFromFlashback, setCharToReturnToFromFlashback] =
    useState<Character | null>(null)

  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null
  )

  const [isSupplementsOpen, setIsSupplementsOpen] = useState(false)

  const [activeIndex, setActiveIndex] = useState(0)

  function returnFromFlashback() {
    setCharToReturnToFromFlashback(null)

    swiperInstance?.enable()

    scrollToTop()

    setTimeout(() => swiperInstance?.updateAutoHeight(), 200)
  }

  return (
    <>
      <LearnAppbar
        lessonLength={CHARS.length}
        {...{
          activeIndex,
          charToReturnToFromFlashback,
          returnFromFlashback,
          swiperInstance,
        }}
      />

      <ContentContainer>
        <Swiper
          autoHeight
          effect={useSmallScreen() ? 'creative' : 'slide'}
          keyboard
          onSwiper={swiper => setSwiperInstance(swiper)}
          onSlideChange={({ activeIndex }) => {
            setActiveIndex(activeIndex) // Causes lag on mobile. To-Do: See if there's a way to remove lag.
            scrollToTop()
          }}
          onSlideChangeTransitionEnd={scrollToTop}
          modules={[EffectCreative, Keyboard]}
          spaceBetween={0}
          simulateTouch={false}
          style={{ maxWidth: constants.maxContentWidth }}
          {...{ creativeEffect }}
        >
          {lessonDataSource.map((char, index) => (
            <SwiperSlide key={index}>
              <LearnContent
                lessonChar={char}
                prevChar={lessonDataSource[index - 1]?.charChinese ?? null}
                nextChar={lessonDataSource[index + 1]?.charChinese ?? null}
                {...{
                  charToReturnToFromFlashback,
                  index,
                  isSupplementsOpen,
                  setCharToReturnToFromFlashback,
                  setIsSupplementsOpen,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </ContentContainer>

      {/* <Button onClick={() => moveToPreviousCharacter()}>prev</Button>
      <Button onClick={() => moveToNextCharacter()}>next</Button> */}
    </>
  )
}
