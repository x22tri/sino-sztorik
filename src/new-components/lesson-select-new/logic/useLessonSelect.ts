import { create } from 'zustand'
import { AssembledLesson, Slice } from '../../shared/interfaces'
import { LESSONS } from '../../shared/MOCK_LESSONS'

interface LessonsSlice {
  lessons: AssembledLesson[]
  selected: number | undefined
  select: (lesson: number | undefined) => void
  setUpcoming: (lesson: number | undefined) => void
  upcoming: number | undefined
}

const createLessonsSlice: Slice<LessonsSlice, MobileDrawerSlice> = set => ({
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

const createMobileDrawerSlice: Slice<MobileDrawerSlice, LessonsSlice> = set => ({
  isOpen: false,
  toggle: () => set(({ isOpen }) => ({ isOpen: !isOpen })),
})

export const useLessonSelect = create<LessonsSlice & MobileDrawerSlice>()((...a) => ({
  ...createMobileDrawerSlice(...a),
  ...createLessonsSlice(...a),
}))
