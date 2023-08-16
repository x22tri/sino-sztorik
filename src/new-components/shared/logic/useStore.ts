import Swiper from 'swiper'
import { create } from 'zustand'
import { Character } from '../interfaces'
import { findFlashbackChar } from './findFlashbackChar'

const useBoundStore = create<Store>((set, get) => {
  function update<SliceType extends keyof Store>(slice: SliceType, updated: Partial<Store[SliceType]>) {
    return set(state => ({ [slice]: { ...state[slice], ...updated } }))
  }

  return {
    flashback: {
      exitFlashback: () => {
        update('flashback', { flashbackChar: undefined })
        get().swiper.swiperInstance?.enable()
        window.scrollTo({ top: 0 })
        setTimeout(() => get().swiper.swiperInstance?.updateAutoHeight(), 200)
      },
      flashbackChar: undefined,
      startFlashback: (destination: string) => {
        const foundFlashbackChar = findFlashbackChar(destination)

        if (foundFlashbackChar) {
          update('flashback', { flashbackChar: foundFlashbackChar })
          get().swiper.swiperInstance?.disable()
          window.scrollTo({ top: 0 })
          setTimeout(() => get().swiper.swiperInstance?.updateAutoHeight(), 200)
        } else {
          console.log(`${destination} nem található`)
        }
      },
    },

    mobileDrawer: {
      isOpen: false,
      toggleDrawer: () => set(({ mobileDrawer }) => ({ mobileDrawer: { ...mobileDrawer, isOpen: !mobileDrawer.isOpen } })),
    },

    learn: {
      selectedCharIndex: 0,
      selectCharIndex: (index: number) => update('learn', { selectedCharIndex: index }),
    },

    swiper: {
      setSwiperInstance: (swiperInstance: Swiper | undefined) => update('swiper', { swiperInstance }),
      swiperInstance: undefined,
    },
  }
})

export function useStore<SliceType extends keyof Store>(slice: SliceType): Store[SliceType] {
  return useBoundStore(state => state[slice])
}

type Store = {
  flashback: FlashbackSlice
  learn: LearnSlice
  mobileDrawer: MobileDrawerSlice
  swiper: SwiperState
}

interface FlashbackSlice {
  exitFlashback: () => void
  flashbackChar: Character | undefined
  startFlashback: (destination: string) => void
}

interface LearnSlice {
  selectedCharIndex: number
  selectCharIndex: (index: number) => void
}

interface MobileDrawerSlice {
  isOpen: boolean
  toggleDrawer: () => void
}

interface SwiperState {
  setSwiperInstance: (swiperInstance: Swiper | undefined) => void
  swiperInstance: Swiper | undefined
}
