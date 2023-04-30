import { create } from 'zustand'
import { LESSONS } from '../MOCK_LESSONS'
import { CHARS } from '../../learn/MOCK_CHARS'
import { AssembledLesson, Character } from '../interfaces'

export const useBoundStore = create<Store>(set => ({
  flashbackSlice: {
    exitFlashback: () =>
      set(({ flashbackSlice }) => ({ flashbackSlice: { ...flashbackSlice, flashback: null, interrupted: null } })),
    flashbackChar: null,
    interruptedChar: null,
    startFlashback: (destination: string, interrupted?: Character) => {
      const foundFlashback = findFlashbackChar(destination)

      if (!foundFlashback) {
        return
      }

      set(({ flashbackSlice }) => ({
        flashbackSlice: {
          ...flashbackSlice,
          flashbackChar: foundFlashback,
          interruptedChar: flashbackSlice.interruptedChar ?? interrupted!,
        },
      }))
    },
  },
  mobileDrawerSlice: {
    isOpen: false,
    toggle: () =>
      set(({ mobileDrawerSlice }) => ({ mobileDrawerSlice: { ...mobileDrawerSlice, isOpen: !mobileDrawerSlice.isOpen } })),
  },
  learnSlice: {
    currentLesson: undefined,
    selectedCharIndex: 0,
    selectCharIndex: (index: number) => set(({ learnSlice }) => ({ learnSlice: { ...learnSlice, selectedCharIndex: index } })),
    setCurrentLesson: (lesson: AssembledLesson) =>
      set(({ learnSlice }) => ({ learnSlice: { ...learnSlice, currentLesson: lesson } })),
  },
  lessonSelectSlice: {
    lessons: LESSONS,
    selectedLessonIndex: undefined,
    selectLessonIndex: (index: number) =>
      set(({ lessonSelectSlice }) => ({ lessonSelectSlice: { ...lessonSelectSlice, selectedLessonIndex: index } })),
    setUpcomingLessonIndex: (index: number) =>
      set(({ lessonSelectSlice }) => ({ lessonSelectSlice: { ...lessonSelectSlice, upcomingLessonIndex: index } })),
    upcomingLessonIndex: undefined,
  },
}))

type Store = {
  flashbackSlice: FlashbackSlice
  mobileDrawerSlice: MobileDrawerSlice
  learnSlice: LearnSlice
  lessonSelectSlice: LessonSelectSlice
}

interface LessonSelectSlice {
  lessons: AssembledLesson[]
  selectedLessonIndex: number | undefined
  selectLessonIndex: (index: number) => void
  setUpcomingLessonIndex: (index: number) => void
  upcomingLessonIndex: number | undefined
}

interface LearnSlice {
  currentLesson: AssembledLesson | undefined
  selectedCharIndex: number
  selectCharIndex: (index: number) => void
  setCurrentLesson: (lesson: AssembledLesson) => void
}

interface FlashbackSlice {
  exitFlashback: () => void
  flashbackChar: Character | null
  interruptedChar: Character | null
  startFlashback: (destination: string, interrupted?: Character) => void
}

interface MobileDrawerSlice {
  isOpen: boolean
  toggle: () => void
}

function findFlashbackChar(constituent: string): Character | null {
  const charInLesson = CHARS.find(({ charChinese }) => charChinese === constituent)

  if (charInLesson) {
    return charInLesson
  }

  // To-Do: if the char is not in the lesson, fetch it from the server.

  return null
}
