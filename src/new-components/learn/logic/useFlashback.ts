import create from 'zustand'
import { Character } from '../../shared/interfaces'

interface FlashbackState {
  flashback: Character | null
  interrupted: Character | null
  resume: () => void
  start: (flashback: Character, interrupted?: Character) => void
}

export const useFlashback = create<FlashbackState>(set => ({
  flashback: null,
  interrupted: null,
  resume: () => set({ flashback: null, interrupted: null }),
  start: (flashback: Character, interrupted?: Character) =>
    set(state => ({
      flashback,
      interrupted: state.interrupted ?? interrupted,
    })),
}))
