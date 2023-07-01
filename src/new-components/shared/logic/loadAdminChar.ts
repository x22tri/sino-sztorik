import { CHAR_ENTRY_V3, CharacterEntryV3, OccurrenceV3 } from '../MOCK_DATABASE_ENTRIES'

export type UnsetOccurrence = { tier: number }

export type SortedOccurrence = OccurrenceV3 | UnsetOccurrence

export type CharFormData = Omit<CharacterEntryV3, 'occurrences'>

export type TimelineData = [SortedOccurrence, SortedOccurrence, SortedOccurrence, SortedOccurrence]

export function loadAdminChar(): { charFormData: CharFormData; timelineData: TimelineData } {
  const characterEntry = CHAR_ENTRY_V3 // To-Do: Fetch from database.

  if (!characterEntry) {
    throw new Response('Character not found in the database', { status: 404 })
  }

  const timelineData = new Array(1, 2, 3, 4).map(
    x => characterEntry.occurrences.find(({ tier }) => tier === x) ?? { tier: x }
  ) as TimelineData

  const { occurrences, ...charFormData } = characterEntry

  return { charFormData: charFormData as CharFormData, timelineData }
}
