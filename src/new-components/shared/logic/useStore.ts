import Swiper from 'swiper'
import { create } from 'zustand'
import { Character } from '../interfaces'
import { findFlashbackChar } from './findFlashbackChar'
import { scrollToTop } from '../utility-functions'
import { X } from '../../admin/admin-content/AdminContent'

const useBoundStore = create<Store>((set, get) => {
  function update<SliceType extends keyof Store>(slice: SliceType, updated: Partial<Store[SliceType]>) {
    return set(state => ({ [slice]: { ...state[slice], ...updated } }))
  }

  return {
    adminChar: {
      prevTiers: undefined,
      setPrevTiers: (prevTiers: X) => update('adminChar', { prevTiers }),
    },

    flashback: {
      exitFlashback: () => {
        update('flashback', { flashbackChar: undefined })
        get().swiper.swiperInstance?.enable()
        scrollToTop()
        setTimeout(() => get().swiper.swiperInstance?.updateAutoHeight(), 200)
      },
      flashbackChar: undefined,
      startFlashback: (destination: string) => {
        const foundFlashbackChar = findFlashbackChar(destination)

        if (foundFlashbackChar) {
          update('flashback', { flashbackChar: foundFlashbackChar })
          get().swiper.swiperInstance?.disable()
          scrollToTop()
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
  adminChar: AdminCharState
  flashback: FlashbackSlice
  learn: LearnSlice
  mobileDrawer: MobileDrawerSlice
  swiper: SwiperState
}

interface AdminCharState {
  prevTiers: X | undefined
  setPrevTiers: (prevTiers: X) => void
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
