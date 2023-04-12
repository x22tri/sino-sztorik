import { EffectCreative } from 'swiper'
import { Swiper, SwiperProps } from 'swiper/react'
import { scrollToTop } from '../utility-functions'
import { useSmallScreen } from '../hooks/useSmallScreen'
import { useKeydown } from '../hooks/useKeydown'
import { useSwiperInstance } from '../state'

export function LessonSwiper(props: SwiperProps) {
  const { swiperInstance, setSwiperInstance } = useSwiperInstance()

  useKeydown([
    { on: 'ArrowLeft', do: () => swiperInstance?.slidePrev() },
    { on: 'ArrowRight', do: () => swiperInstance?.slideNext() },
  ])

  return (
    <Swiper
      creativeEffect={{
        prev: { opacity: 0, translate: ['-20%', 0, -1] },
        next: { opacity: 1, translate: ['100%', 0, 1] },
      }}
      effect={useSmallScreen() ? 'creative' : 'slide'}
      modules={[EffectCreative]}
      onSlideChange={scrollToTop}
      onSlideChangeTransitionEnd={scrollToTop}
      onSwiper={swiper => setSwiperInstance(swiper)}
      simulateTouch={false}
      spaceBetween={0}
      {...props}
    >
      {props.children}
    </Swiper>
  )
}
