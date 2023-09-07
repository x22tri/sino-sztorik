import { Params } from 'react-router-dom'
import { LESSON_ENTRY, SortedOccurrence } from '../MOCK_DATABASE_ENTRIES'
import { CharacterEntryV3 } from '../MOCK_DATABASE_ENTRIES'
import { CHAR_ENTRY_V3 } from '../MOCK_DATABASE_ENTRIES'

export type CharFormData = Omit<CharacterEntryV3, 'occurrences'>

export type TimelineData = [SortedOccurrence, SortedOccurrence, SortedOccurrence, SortedOccurrence]

export type CalculatedIndexes = [number, number, number, number]

export type LoadAdminChar = {
  calculatedIndexes: CalculatedIndexes
  charFormData: CharFormData
  timelineData: TimelineData
}

export function loadAdminChar({ params }: { params: Params }): LoadAdminChar {
  const characterEntry = CHAR_ENTRY_V3 // To-Do: Fetch from database.

  if (!characterEntry) {
    throw new Response('Character not found in the database', { status: 404 })
  }

  const { occurrences, ...charFormData } = characterEntry

  const timelineData = new Array(1, 2, 3, 4).map(tier => occurrences.find(occurrence => occurrence.tier === tier) ?? { tier })

  const calculatedIndexes = calculateIndexesInLesson(characterEntry)

  return {
    charFormData: { ...charFormData, productivePinyin: charFormData.productivePinyin ?? false } as CharFormData,
    timelineData: timelineData as TimelineData,
    calculatedIndexes,
  }
}

function calculateIndexesInLesson(character: CharacterEntryV3) {
  const lesson = LESSON_ENTRY // To-Do: Fetch from database by lessonNumber.

  return new Array(1, 2, 3, 4).map(
    tier =>
      lesson.characters.filter(c => c.tier === tier || c.glyph === character.glyph).findIndex(c => c.glyph === character.glyph) +
      1
  ) as CalculatedIndexes
}
