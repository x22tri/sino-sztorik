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
        window.scrollTo({ top: 0 })
      },
      flashbackChar: undefined,
      startFlashback: (destination: string) => {
        const foundFlashbackChar = findFlashbackChar(destination)

        if (foundFlashbackChar) {
          update('flashback', { flashbackChar: foundFlashbackChar })
          window.scrollTo({ top: 0 })
        } else {
          console.log(`${destination} nem található`)
        }
      },
    },

    learn: {
      selectedCharIndex: 0,
      selectCharIndex: (index: number) => update('learn', { selectedCharIndex: index }),
    },
  }
})

export function useStore<SliceType extends keyof Store>(slice: SliceType): Store[SliceType] {
  return useBoundStore(state => state[slice])
}

type Store = {
  flashback: FlashbackSlice
  learn: LearnSlice
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
