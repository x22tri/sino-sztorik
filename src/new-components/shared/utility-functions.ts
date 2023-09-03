import { LessonStatuses, TierStatuses } from './interfaces'

const { UPCOMING, COMPLETED } = LessonStatuses

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function isDisabledLesson(tierStatuses: TierStatuses) {
  return !(tierStatuses.includes(UPCOMING) || tierStatuses.includes(COMPLETED))
}

export function isUpcomingLesson(tierStatuses: TierStatuses) {
  return tierStatuses.includes(UPCOMING)
}

export function isCompletedLesson(tierStatuses: TierStatuses) {
  return tierStatuses.includes(COMPLETED) && !tierStatuses.includes(UPCOMING)
}

/**
 * Returns the index of the last element in the array where predicate is true, -1 otherwise.
 * @param array The source array to search in
 * @param predicate The function calls predicate once for each element of the array, in descending
 * order, until it finds one where predicate returns true. If such an element is found,
 * findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.
 */
export function findLastIndex<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number {
  let l = array.length
  while (l--) {
    if (predicate(array[l], l, array)) return l
  }
  return -1
}

/**
 * Returns the indexes of all elements in the array where predicate is true, [] otherwise.
 * @param array The source array to search in
 * @param predicate The function calls predicate once for each element of the array, in descending
 * order, until it finds one where predicate returns true. If such an element is found,
 * it is added to indexes and the function continues.
 */
export function findAllIndexes<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number[] {
  const indexes = []
  let l = -1

  while (l++ < array.length - 1) {
    if (predicate(array[l], l, array)) {
      indexes.push(l)
    }
  }

  return indexes
}

export function isShallowEqual(object1: object, object2: object) {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (object1[key as keyof typeof object1] !== object2[key as keyof typeof object2]) {
      return false
    }
  }

  return true
}
