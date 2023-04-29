import { create } from 'zustand'
import { AssembledLesson, Slice } from '../../shared/interfaces'
import { LESSONS } from '../../shared/MOCK_LESSONS'

interface LessonsSlice {
  lessons: AssembledLesson[]
  selected: number | undefined
  select: (index: number) => void
  setUpcoming: (index: number) => void
  upcoming: number | undefined
}

const createLessonsSlice: Slice<LessonsSlice, MobileDrawerSlice> = set => ({
  lessons: LESSONS,
  selected: undefined,
  select: index => set({ selected: index }),
  setUpcoming: index => set({ upcoming: index }),
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
