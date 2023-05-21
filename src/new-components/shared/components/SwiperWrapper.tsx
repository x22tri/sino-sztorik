import { Swiper, SwiperProps } from 'swiper/react'
import { scrollToTop } from '../utility-functions'
import { useKeydown } from '../hooks/useKeydown'
import { UseKeydownAction } from '../interfaces'
import { useStore } from '../logic/useStore'
import 'swiper/css'

export type SwiperWrapperProps = SwiperProps & { customKeyboardControls?: UseKeydownAction[] }

export function SwiperWrapper({ children, customKeyboardControls, ...restProps }: SwiperWrapperProps) {
  const { swiperInstance, setSwiperInstance } = useStore('swiper')

  useKeydown(
    customKeyboardControls ?? [
      { on: 'ArrowLeft', do: () => swiperInstance?.slidePrev() },
      { on: 'ArrowRight', do: () => swiperInstance?.slideNext() },
    ]
  )

  return (
    <Swiper
      autoHeight
      effect='slide'
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
