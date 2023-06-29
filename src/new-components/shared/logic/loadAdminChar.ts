import { CHAR_ENTRY_V3, CharacterEntryV3, OccurrenceV3 } from '../MOCK_DATABASE_ENTRIES'

export type SortedOccurrence = OccurrenceV3 | UnsetOccurrence

export type UnsetOccurrence = { tier: number }

export type SortedOccurrences = [SortedOccurrence, SortedOccurrence, SortedOccurrence, SortedOccurrence]

export type SortedCharacterEntry = Omit<CharacterEntryV3, 'occurrences'> & {
  occurrences: SortedOccurrences
}

export function loadAdminChar(): { character: SortedCharacterEntry } {
  const characterEntry = CHAR_ENTRY_V3 // To-Do: Fetch from database.

  if (!characterEntry) {
    throw new Response('Character not found in the database', { status: 404 })
  }

  const sorted = new Array(1, 2, 3, 4).map(
    x => characterEntry.occurrences.find(({ tier }) => tier === x) ?? { tier: x }
  ) as SortedOccurrences

  return { character: { ...characterEntry, occurrences: sorted } }
}
