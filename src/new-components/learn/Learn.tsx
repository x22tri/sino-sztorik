import { CHARS } from './MOCK_CHARS'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import LearnContent from './LearnContent'
import { LearnAppbar } from './learn-appbar/LearnAppbar'
import SwiperInstance, { EffectCreative } from 'swiper'
import {
  useKeydown,
  useSmallScreen,
  scrollToTop,
} from '../shared/utility-functions'

export default function Learn() {
  const lesson = CHARS

  let swiperInstance: SwiperInstance | undefined

  useKeydown([
    { on: 'ArrowLeft', do: () => swiperInstance?.slidePrev() },
    { on: 'ArrowRight', do: () => swiperInstance?.slideNext() },
  ])

  return (
    <>
      <Swiper
        autoHeight
        effect={useSmallScreen() ? 'creative' : 'slide'}
        modules={[EffectCreative]}
        onSlideChange={scrollToTop}
        onSlideChangeTransitionEnd={scrollToTop}
        onSwiper={swiper => (swiperInstance = swiper)}
        simulateTouch={false}
        spaceBetween={0}
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
        {...{ creativeEffect }}
      >
        <LearnAppbar lessonLength={CHARS.length} />
        {lesson.map((char, index) => (
          <SwiperSlide key={index}>
            <LearnContent
              lessonChar={char}
              prevChar={lesson[index - 1]?.charChinese ?? null}
              nextChar={lesson[index + 1]?.charChinese ?? null}
              {...{ index }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

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
