import { create } from 'zustand'
import Swiper from 'swiper'

interface SwiperState {
  setSwiperInstance: (swiperInstance: Swiper | undefined) => void
  swiperInstance: Swiper | undefined
}

export const useSwiperInstance = create<SwiperState>(set => ({
  setSwiperInstance: (swiperInstance: Swiper | undefined) =>
    set({ swiperInstance }),
  swiperInstance: undefined,
}))
