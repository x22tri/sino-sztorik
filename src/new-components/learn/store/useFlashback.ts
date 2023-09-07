import { create } from 'zustand'
import { Character } from '../../shared/interfaces'
import { findFlashbackChar } from './findFlashbackChar'

export const useFlashback = create<FlashbackStore>()(set => ({
  flashbackChar: null,
  startFlashback: (destination: string) => {
    const foundFlashbackChar = findFlashbackChar(destination)

    if (foundFlashbackChar) {
      set(() => ({ flashbackChar: foundFlashbackChar }))
      window.scrollTo({ top: 0 })
    } else {
      console.log(`${destination} nem található`)
    }
  },
  quitFlashback: () => {
    set(() => ({ flashbackChar: null }))
    window.scrollTo({ top: 0 })
  },
}))

interface FlashbackStore {
  flashbackChar: Character | null
  startFlashback: (destination: string) => void
  quitFlashback: () => void
}
