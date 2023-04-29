import { create } from 'zustand'
import { Character, ThreeWaySlice } from '../../shared/interfaces'
import { CHARS } from '../MOCK_CHARS'

interface LessonSlice {
  lesson: Character[]
  selected: number
  select: (index: number) => void
}

const createLessonSlice: ThreeWaySlice<LessonSlice, FlashbackSlice, MobileDrawerSlice> = set => ({
  lesson: CHARS,
  selected: 0,
  select: index => set({ selected: index }),
})

interface FlashbackSlice {
  flashback: Character | null
  interrupted: Character | null
  resumeLesson: () => void
  startFlashback: (destination: string, interrupted?: Character) => void
}

const createFlashbackSlice: ThreeWaySlice<FlashbackSlice, LessonSlice, MobileDrawerSlice> = set => ({
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
})

interface MobileDrawerSlice {
  isOpen: boolean
  toggle: () => void
}

const createMobileDrawerSlice: ThreeWaySlice<MobileDrawerSlice, LessonSlice, FlashbackSlice> = set => ({
  isOpen: false,
  toggle: () => set(({ isOpen }) => ({ isOpen: !isOpen })),
})

export const useLearn = create<LessonSlice & FlashbackSlice & MobileDrawerSlice>()((...a) => ({
  ...createLessonSlice(...a),
  ...createFlashbackSlice(...a),
  ...createMobileDrawerSlice(...a),
}))

function findFlashbackChar(constituent: string): Character | null {
  const charInLesson = CHARS.find(char => char.charChinese === constituent)

  if (charInLesson) {
    return charInLesson
  }

  // To-Do: if the char is not in the lesson, fetch it from the server.

  return null
}
