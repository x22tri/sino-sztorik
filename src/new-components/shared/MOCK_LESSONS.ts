import { LessonStatuses, AssembledLesson } from './interfaces'

export const LESSONS: AssembledLesson[] = [
  {
    lessonNumber: 1,
    title: 'Első lépések',
    preface:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut tristique ex. Nullam commodo mollis libero, eget sodales ex fringilla eget. Fusce eu odio sit amet ex condimentum rutrum id quis lectus. Cras mattis dui ac finibus gravida. Nam eget tempus tortor. In non bibendum ligula. Quisque eget nunc vitae nisl ultrices fringilla. Curabitur id tempor nisi. Aliquam ac ante scelerisque odio porta pretium et et massa. Vivamus rutrum, neque pellentesque sollicitudin facilisis, tortor nisl semper dolor, eu efficitur nunc turpis dignissim urna. Integer eleifend consectetur dui a laoreet. ',
    tierStatuses: [LessonStatuses.COMPLETED, LessonStatuses.COMPLETED, LessonStatuses.NOT_IN_TIER, LessonStatuses.NOT_IN_TIER],
    characters: ['一', '二', '三', '四', '五'],
  },
  {
    lessonNumber: 2,
    title: 'Több, mint a részek összege',
    preface:
      'Aliquam erat volutpat. Integer tellus sem, maximus sit amet ullamcorper vehicula, mattis egestas lectus. Duis vitae congue neque. Fusce vulputate mauris quis nisl aliquet convallis. Nunc placerat nunc non suscipit aliquet. Aenean vel tellus non ipsum fermentum molestie. Vivamus egestas dictum enim eget dignissim. Vivamus lacinia facilisis odio, sed fermentum est. Proin aliquet eleifend arcu. Aenean efficitur eros sit amet neque ornare tincidunt. Aliquam erat volutpat. Integer tellus sem, maximus sit amet ullamcorper vehicula, mattis egestas lectus. Duis vitae congue neque. Fusce vulputate mauris quis nisl aliquet convallis. Nunc placerat nunc non suscipit aliquet. Aenean vel tellus non ipsum fermentum molestie. Vivamus egestas dictum enim eget dignissim. Vivamus lacinia facilisis odio, sed fermentum est. Proin aliquet eleifend arcu. Aenean efficitur eros sit amet neque ornare tincidunt.',
    tierStatuses: [LessonStatuses.COMPLETED, LessonStatuses.COMPLETED, LessonStatuses.NOT_IN_TIER, LessonStatuses.NOT_IN_TIER],
    characters: ['朋', '明', '昌', '唱', '晶', '品'],
  },
  {
    lessonNumber: 3,
    title: 'lesson3',
    preface:
      'Sed molestie facilisis velit, id feugiat lacus. Pellentesque eget leo in turpis dapibus volutpat a sed nisl. Aliquam a nibh faucibus, semper turpis quis, iaculis purus. Nam posuere vitae nulla et egestas. Proin tincidunt ex non volutpat tempus. Fusce hendrerit ex id diam placerat maximus. Sed pretium diam non metus pulvinar, et tempus diam tempus. Nam molestie risus in pellentesque facilisis. Quisque nulla mi, congue quis elementum vitae, tempus at elit. Nam enim ipsum, pharetra id metus nec, porttitor varius nibh. Etiam scelerisque pretium odio, vitae consectetur augue interdum et. In sit amet justo egestas ligula mattis lobortis ac vel velit. Etiam hendrerit massa venenatis, ornare urna quis, congue ipsum. ',
    tierStatuses: [LessonStatuses.COMPLETED, LessonStatuses.UPCOMING, LessonStatuses.NOT_IN_TIER, LessonStatuses.NOT_IN_TIER],
    characters: [],
  },
  {
    lessonNumber: 4,
    title: 'lesson4',
    preface: 'teszt2',
    tierStatuses: [LessonStatuses.COMPLETED, LessonStatuses.LOCKED, LessonStatuses.NOT_IN_TIER, LessonStatuses.NOT_IN_TIER],
    characters: [],
  },
  {
    lessonNumber: 5,
    title: 'lesson5',
    preface: 'teszt2',
    tierStatuses: [LessonStatuses.COMPLETED, LessonStatuses.LOCKED, LessonStatuses.NOT_IN_TIER, LessonStatuses.NOT_IN_TIER],
    characters: [],
  },
  {
    lessonNumber: 6,
    title: 'lesson6',
    preface: 'teszt2',
    tierStatuses: [LessonStatuses.COMPLETED, LessonStatuses.LOCKED, LessonStatuses.NOT_IN_TIER, LessonStatuses.NOT_IN_TIER],
    characters: [],
  },
  {
    lessonNumber: 7,
    title: 'lesson7',
    preface: 'teszt2',
    tierStatuses: [LessonStatuses.LOCKED, LessonStatuses.LOCKED, LessonStatuses.LOCKED, LessonStatuses.LOCKED],
    characters: [],
  },
  {
    lessonNumber: 8,
    title: 'lesson8',
    preface: 'teszt2',
    tierStatuses: [LessonStatuses.LOCKED, LessonStatuses.LOCKED, LessonStatuses.LOCKED, LessonStatuses.LOCKED],
    characters: [],
  },
  {
    lessonNumber: 9,
    title: 'lesson9',
    preface: 'teszt2',
    tierStatuses: [LessonStatuses.LOCKED, LessonStatuses.LOCKED, LessonStatuses.LOCKED, LessonStatuses.LOCKED],
    characters: [],
  },
  {
    lessonNumber: 10,
    title: 'lesson10',
    preface: 'teszt2',
    tierStatuses: [LessonStatuses.LOCKED, LessonStatuses.LOCKED, LessonStatuses.LOCKED, LessonStatuses.LOCKED],
    characters: [],
  },
]
