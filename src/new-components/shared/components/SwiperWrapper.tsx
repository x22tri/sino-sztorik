import { EffectCreative } from 'swiper'
import { Swiper, SwiperProps } from 'swiper/react'
import { scrollToTop } from '../utility-functions'
import { useSmallScreen } from '../hooks/useSmallScreen'
import { useKeydown } from '../hooks/useKeydown'
import { UseKeydownAction } from '../interfaces'
import { useStore } from '../logic/useStore'
import 'swiper/css'
import 'swiper/css/effect-creative'

export function SwiperWrapper({
  children,
  customKeyboardControls,
  ...restProps
}: SwiperProps & { customKeyboardControls?: UseKeydownAction[] }) {
  const { swiperInstance, setSwiperInstance } = useStore('swiper')
  const isSmallScreen = useSmallScreen()

  useKeydown(
    customKeyboardControls ?? [
      { on: 'ArrowLeft', do: () => swiperInstance?.slidePrev() },
      { on: 'ArrowRight', do: () => swiperInstance?.slideNext() },
    ]
  )

  return (
    <Swiper
      autoHeight
      // creativeEffect={{ prev: { opacity: 0, translate: ['-20%', 0, -1] }, next: { opacity: 1, translate: ['100%', 0, 1] } }}
      // effect={isSmallScreen ? 'creative' : 'slide'}
      effect='slide'
      // modules={[EffectCreative]}
      onSlideChangeTransitionEnd={scrollToTop}
      onSwiper={swiper => setSwiperInstance(swiper)}
      simulateTouch={false}
      spaceBetween={0}
      {...restProps}
    >
      {children}
    </Swiper>
  )
}
