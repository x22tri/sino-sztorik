import { KeyboardEvent, useState } from 'react'
import { Button, useMediaQuery, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { ContentContainer } from '../shared-components/ContentContainer'
import { Character } from '../shared/interfaces'
import { CHARS } from './MOCK_CHARS'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'
import LearnCharCardDetails from './LearnCharCardDetails'
import { LearnAppbar } from '../toolbar/AppbarWrapper'
import useEventListener from '@use-it/event-listener'
import { EffectCreative, EffectFade, Keyboard } from 'swiper'
import { Theme } from '@material-ui/core'

export default function Learn() {
  const { breakpoints, constants } = useTheme()

  const lessonDataSource = CHARS

  const [charToReturnToFromFlashback, setCharToReturnToFromFlashback] =
    useState<Character | null>(null)

  // const [activeIndex, setActiveIndex] = useState(1)

  // const currentChar = lessonDataSource[activeIndex]

  function moveToPreviousCharacter() {
    // if (activeIndex === 0) {
    //   return
    // }

    // setActiveIndex(prev => prev - 1)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  function moveToNextCharacter() {
    // if (activeIndex === lessonDataSource.length - 1) {
    //   return
    // }

    // setActiveIndex(prev => prev + 1)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
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

  const isSmallScreen = useMediaQuery(breakpoints.down('md'))

  return (
    <>
      <LearnAppbar
        lessonLength={CHARS.length}
        isLocked={!!charToReturnToFromFlashback}
        activeIndex={0}
      />

      <ContentContainer>
        <Swiper
          autoHeight
          effect={isSmallScreen ? 'creative' : 'slide'}
          keyboard={true}
          spaceBetween={0}
          simulateTouch={false}
          creativeEffect={{
            prev: {
              opacity: 0,
              translate: ['-20%', 0, -1],
            },
            next: {
              opacity: 1,
              translate: ['100%', 0, 1],
            },
          }}
          onSlideChange={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }}
          onSlideChangeTransitionEnd={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
          }}
          modules={[EffectCreative, EffectFade, Keyboard]}
          style={{ maxWidth: constants.maxContentWidth }}
        >
          {lessonDataSource.map((char, index) => (
            <SwiperSlide key={index}>
              <LearnCharCardDetails
                // activeIndex=
                lessonChar={char}
                {...{
                  charToReturnToFromFlashback,
                  setCharToReturnToFromFlashback,
                  index,
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
