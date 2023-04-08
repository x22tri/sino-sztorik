import { create } from 'zustand'
import { Character } from '../../shared/interfaces'
import { CHARS } from '../MOCK_CHARS'

interface FlashbackState {
  flashback: Character | null
  interrupted: Character | null
  resumeLesson: () => void
  startFlashback: (destination: string, interrupted?: Character) => void
}

export const useFlashback = create<FlashbackState>(set => ({
  flashback: null,
  interrupted: null,
  resumeLesson: () => set({ flashback: null, interrupted: null }),
  startFlashback: (destination: string, interrupted?: Character) => {
    const foundFlashback = findFlashbackChar(destination)

    if (!foundFlashback) {
      return
    }

    set(state => ({
      flashback: foundFlashback,
      interrupted: state.interrupted ?? interrupted,
    }))
  },
}))

function findFlashbackChar(constituent: string): Character | null {
  const charInLesson = CHARS.find(char => char.charChinese === constituent)

  if (charInLesson) {
    return charInLesson
  }

  // To-Do: if the char is not in the lesson, fetch it from the server.

  return null
}
