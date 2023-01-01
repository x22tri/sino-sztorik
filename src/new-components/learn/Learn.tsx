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
import { EffectCreative, EffectFade, Keyboard } from 'swiper'
import { useSmallScreen } from '../shared/utility-functions'

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

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

export default function Learn() {
  const { constants } = useTheme()

  const lessonDataSource = CHARS

  const [charToReturnToFromFlashback, setCharToReturnToFromFlashback] =
    useState<Character | null>(null)

  const [isSupplementsOpen, setIsSupplementsOpen] = useState(false)

  const [activeIndex, setActiveIndex] = useState(0)

  // const currentChar = lessonDataSource[activeIndex]

  function moveToPreviousCharacter() {
    // if (activeIndex === 0) {
    //   return
    // }
    // setActiveIndex(prev => prev - 1)
    // scrollToTop()
  }

  function moveToNextCharacter() {
    // if (activeIndex === lessonDataSource.length - 1) {
    //   return
    // }
    // setActiveIndex(prev => prev + 1)
    // scrollToTop()
  }

  useEventListener('keydown', event => {
    const key = (event as unknown as KeyboardEvent).key

    if (key === 'ArrowLeft') {
      moveToPreviousCharacter()
    }

    if (key === 'ArrowRight') {
      moveToNextCharacter()
    }
  })

  return (
    <>
      <LearnAppbar
        lessonLength={CHARS.length}
        {...{ activeIndex, charToReturnToFromFlashback }}
      />

      <ContentContainer>
        <Swiper
          autoHeight
          effect={useSmallScreen() ? 'creative' : 'slide'}
          keyboard
          onSlideChange={({ activeIndex }) => {
            setActiveIndex(activeIndex)
            scrollToTop()
          }}
          onSlideChangeTransitionEnd={scrollToTop}
          modules={[EffectCreative, EffectFade, Keyboard]}
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
