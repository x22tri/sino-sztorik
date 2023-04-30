import { create } from 'zustand'
import { LESSONS } from '../MOCK_LESSONS'
import { CHARS } from '../../learn/MOCK_CHARS'
import { AssembledLesson, Character } from '../interfaces'

const useBoundStore = create<Store>(set => ({
  flashback: {
    exitFlashback: () => set(({ flashback }) => ({ flashback: { ...flashback, flashback: null, interrupted: null } })),
    flashbackChar: null,
    interruptedChar: null,
    startFlashback: (destination: string, interrupted?: Character) => {
      const foundFlashback = findFlashbackChar(destination)

      if (!foundFlashback) {
        return
      }

      set(({ flashback }) => ({
        flashback: {
          ...flashback,
          flashbackChar: foundFlashback,
          interruptedChar: flashback.interruptedChar ?? interrupted!,
        },
      }))
    },
  },

  mobileDrawer: {
    isOpen: false,
    toggleDrawer: () => set(({ mobileDrawer }) => ({ mobileDrawer: { ...mobileDrawer, isOpen: !mobileDrawer.isOpen } })),
  },

  learn: {
    currentLesson: LESSONS[0],
    selectedCharIndex: 0,
    selectCharIndex: (index: number) => set(({ learn }) => ({ learn: { ...learn, selectedCharIndex: index } })),
    setCurrentLesson: (lesson: AssembledLesson) => set(({ learn }) => ({ learn: { ...learn, currentLesson: lesson } })),
  },

  lessonSelect: {
    lessons: LESSONS,
    selectedLessonIndex: undefined,
    selectLessonIndex: (index: number) =>
      set(({ lessonSelect }) => ({ lessonSelect: { ...lessonSelect, selectedLessonIndex: index } })),
    setUpcomingLessonIndex: (index: number) =>
      set(({ lessonSelect }) => ({ lessonSelect: { ...lessonSelect, upcomingLessonIndex: index } })),
    upcomingLessonIndex: undefined,
  },
}))

export function useStore<SliceType extends keyof Store>(slice: SliceType): Store[SliceType] {
  return useBoundStore(state => state[slice])
}

type Store = {
  flashback: FlashbackSlice
  mobileDrawer: MobileDrawerSlice
  learn: LearnSlice
  lessonSelect: LessonSelectSlice
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
  toggleDrawer: () => void
}

function findFlashbackChar(constituent: string): Character | null {
  const charInLesson = CHARS.find(({ charChinese }) => charChinese === constituent)

  if (charInLesson) {
    return charInLesson
  }

  // To-Do: if the char is not in the lesson, fetch it from the server.

  return null
}
