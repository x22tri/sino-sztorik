import { SortedOccurrence } from '../MOCK_DATABASE_ENTRIES'
import { CharacterEntryV3 } from '../MOCK_DATABASE_ENTRIES'
import { CHAR_ENTRY_V3 } from '../MOCK_DATABASE_ENTRIES'

export type CharFormData = Omit<CharacterEntryV3, 'occurrences'>

export type TimelineData = [SortedOccurrence, SortedOccurrence, SortedOccurrence, SortedOccurrence]

export function loadAdminChar(): { charFormData: CharFormData; timelineData: TimelineData } {
  const characterEntry = CHAR_ENTRY_V3 // To-Do: Fetch from database.

  if (!characterEntry) {
    throw new Response('Character not found in the database', { status: 404 })
  }

  const { occurrences, ...charFormData } = characterEntry

  const timelineData = new Array(1, 2, 3, 4).map(tier => occurrences.find(occurrence => occurrence.tier === tier) ?? { tier })

  return { charFormData: charFormData as CharFormData, timelineData: timelineData as TimelineData }
}
