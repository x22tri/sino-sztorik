import { KeyboardEvent, useState } from 'react'
import { Button, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { ContentContainer } from '../shared-components/ContentContainer'
import { Character } from '../shared/interfaces'
import { CHARS } from './MOCK_CHARS'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import LearnCharCardDetails from './LearnCharCardDetails'
import { LearnAppbar } from '../toolbar/AppbarWrapper'
import useEventListener from '@use-it/event-listener'
import { EffectCreative, Keyboard } from 'swiper'

export default function Learn() {
  const { constants } = useTheme()

  const lessonDataSource = CHARS

  const [charToReturnToFromFlashback, setCharToReturnToFromFlashback] =
    useState<Character | null>(null)

  const [activeIndex, setActiveIndex] = useState(1)

  const currentChar = lessonDataSource[activeIndex]

  function moveToPreviousCharacter() {
    if (activeIndex === 0) {
      return
    }

    setActiveIndex(prev => prev - 1)
    window.scrollTo(0, 0)
  }

  function moveToNextCharacter() {
    if (activeIndex === lessonDataSource.length - 1) {
      return
    }

    setActiveIndex(prev => prev + 1)
    window.scrollTo(0, 0)
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
        isLocked={!!charToReturnToFromFlashback}
        {...{ activeIndex }}
      />

      <ContentContainer>
        <Swiper
          autoHeight
          effect={'creative'}
          keyboard={true}
          spaceBetween={0}
          // simulateTouch={false}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ['-20%', 0, -1],
            },
            next: {
              translate: ['100%', 0, 0],
            },
          }}
          onSlideChange={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }}
          onSlideChangeTransitionEnd={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }}
          modules={[EffectCreative, Keyboard]}
          style={{
            maxWidth: constants.maxContentWidth,
          }}
        >
          {lessonDataSource.map((char, index) => (
            <SwiperSlide key={index}>
              <LearnCharCardDetails
                lessonChar={char}
                {...{
                  charToReturnToFromFlashback,
                  setCharToReturnToFromFlashback,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </ContentContainer>

      <Button onClick={() => moveToPreviousCharacter()}>prev</Button>
      <Button onClick={() => moveToNextCharacter()}>next</Button>
    </>
  )
}
