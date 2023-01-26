import create from 'zustand'
import Swiper from 'swiper'

interface SwiperState {
  setSwiperInstance: (swiperInstance: Swiper) => void
  swiperInstance: Swiper | undefined
}

export const useSwiperInstance = create<SwiperState>(set => ({
  setSwiperInstance: (swiperInstance: Swiper) => set({ swiperInstance }),
  swiperInstance: undefined,
}))
