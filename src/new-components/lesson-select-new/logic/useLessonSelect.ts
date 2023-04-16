import { StateCreator, create } from 'zustand'
import { AssembledLesson } from '../../shared/interfaces'
import { LESSONS } from '../../shared/MOCK_LESSONS'

type Slice<A, B> = StateCreator<A & B, [], [], A>

interface LessonSlice {
  lessons: AssembledLesson[]
  selected: number | undefined
  select: (lesson: number | undefined) => void
  setUpcoming: (lesson: number | undefined) => void
  upcoming: number | undefined
}

const createLessonSlice: Slice<LessonSlice, MobileDrawerSlice> = set => ({
  lessons: LESSONS,
  selected: undefined,
  select: lesson => set({ selected: lesson }),
  setUpcoming: lesson => set({ upcoming: lesson }),
  upcoming: undefined,
})

interface MobileDrawerSlice {
  isOpen: boolean
  toggle: () => void
}

const createMobileDrawerSlice: Slice<MobileDrawerSlice, LessonSlice> = set => ({
  isOpen: false,
  toggle: () => set(({ isOpen }) => ({ isOpen: !isOpen })),
})

export const useLessonSelect = create<LessonSlice & MobileDrawerSlice>()((...a) => ({
  ...createMobileDrawerSlice(...a),
  ...createLessonSlice(...a),
}))