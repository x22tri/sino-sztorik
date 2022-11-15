import { LessonStatuses, AssembledLesson } from './interfaces'

export const LESSONS: AssembledLesson[] = [
  {
    lessonNumber: 1,
    title: 'Első lépések',
    preface: 'teszt',
    tierStatuses: [
      LessonStatuses.COMPLETED,
      LessonStatuses.UPCOMING,
      LessonStatuses.NOT_IN_TIER,
      LessonStatuses.NOT_IN_TIER,
    ],
    characters: ['x', 'y'],
  },
  {
    lessonNumber: 2,
    title: 'Több, mint a részek összege',
    preface: 'teszt2',
    tierStatuses: [
      LessonStatuses.COMPLETED,
      LessonStatuses.LOCKED,
      LessonStatuses.NOT_IN_TIER,
      LessonStatuses.NOT_IN_TIER,
    ],
    characters: [],
  },
  {
    lessonNumber: 3,
    title: 'lesson3',
    preface: 'teszt2',
    tierStatuses: [
      LessonStatuses.COMPLETED,
      LessonStatuses.LOCKED,
      LessonStatuses.NOT_IN_TIER,
      LessonStatuses.NOT_IN_TIER,
    ],
    characters: [],
  },
  {
    lessonNumber: 4,
    title: 'lesson4',
    preface: 'teszt2',
    tierStatuses: [
      LessonStatuses.COMPLETED,
      LessonStatuses.LOCKED,
      LessonStatuses.NOT_IN_TIER,
      LessonStatuses.NOT_IN_TIER,
    ],
    characters: [],
  },
  {
    lessonNumber: 5,
    title: 'lesson5',
    preface: 'teszt2',
    tierStatuses: [
      LessonStatuses.COMPLETED,
      LessonStatuses.LOCKED,
      LessonStatuses.NOT_IN_TIER,
      LessonStatuses.NOT_IN_TIER,
    ],
    characters: [],
  },
  {
    lessonNumber: 6,
    title: 'lesson6',
    preface: 'teszt2',
    tierStatuses: [
      LessonStatuses.COMPLETED,
      LessonStatuses.LOCKED,
      LessonStatuses.NOT_IN_TIER,
      LessonStatuses.NOT_IN_TIER,
    ],
    characters: [],
  },
]
