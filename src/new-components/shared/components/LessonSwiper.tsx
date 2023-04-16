import { EffectCreative } from 'swiper'
import { Swiper, SwiperProps } from 'swiper/react'
import { scrollToTop } from '../utility-functions'
import { useSmallScreen } from '../hooks/useSmallScreen'
import { useSwiperInstance } from '../state'

export function LessonSwiper(props: SwiperProps) {
  const { setSwiperInstance } = useSwiperInstance()
  const isSmallScreen = useSmallScreen()

  return (
    <Swiper
      creativeEffect={{ prev: { opacity: 0, translate: ['-20%', 0, -1] }, next: { opacity: 1, translate: ['100%', 0, 1] } }}
      effect={isSmallScreen ? 'creative' : 'slide'}
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
