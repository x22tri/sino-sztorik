import { redirect } from 'react-router-dom'
import { LESSONS } from '../MOCK_LESSONS'
import { LessonStatuses } from '../interfaces'
import {
  CHAR_ENTRY,
  CHAR_ENTRY_V2,
  CHAR_ENTRY_V3,
  CharacterEntry,
  CharacterEntryV2,
  CharacterEntryV3,
  CharacterEntryVariant,
  FullOccurrence,
  Occurrence,
  OccurrenceV3,
  ReminderOccurrence,
  WithheldConstituentsOccurrence,
  WithheldKeywordOccurrence,
  WithheldPrimitiveOccurrence,
} from '../MOCK_DATABASE_ENTRIES'

export interface DiffInfo {
  newInfo: (keyof CharacterEntryVariant)[]
  modifiedInfo: (keyof CharacterEntryVariant)[]
}

export interface DiffInfoTier {
  newInfo: (keyof CharacterEntryVariant)[]
  modifiedInfo: (keyof CharacterEntryVariant)[]
  // previousInfo: (keyof CharacterEntryVariant)[]
  tier: number
}

export type DiffedCharacterEntryVariant = CharacterEntryVariant & DiffInfo

export interface DiffedCharacterEntry extends CharacterEntry {
  variants: [DiffedCharacterEntryVariant, DiffedCharacterEntryVariant, DiffedCharacterEntryVariant, DiffedCharacterEntryVariant]
}

export type SortedOccurrence = OccurrenceV3 | UnsetOccurrence

export type UnsetOccurrence = { tier: number }

// export type Unset = { tier: number; type: 'unset' }

// export type PotentialOccurrence = OccurrenceV3 | Unset

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

export function isUnset(occurrence: SortedOccurrence): occurrence is UnsetOccurrence {
  return !('index' in occurrence)
}

export function isReminder(occurrence: SortedOccurrence): occurrence is ReminderOccurrence {
  return !('story' in occurrence) && 'index' in occurrence
}

export function isFullOccurrence(occurrence: SortedOccurrence): occurrence is FullOccurrence {
  return !('withhold' in occurrence) && 'story' in occurrence
}

export function isWithheldOccurrence(
  occurrence: SortedOccurrence
): occurrence is WithheldKeywordOccurrence | WithheldPrimitiveOccurrence | WithheldConstituentsOccurrence {
  return 'withhold' in occurrence
}

export function isWithheldKeywordOccurrence(occurrence: SortedOccurrence): occurrence is WithheldConstituentsOccurrence {
  return 'withhold' in occurrence && occurrence.withhold === 'keyword'
}

export function isWithheldPrimitiveOccurrence(occurrence: SortedOccurrence): occurrence is WithheldPrimitiveOccurrence {
  return 'withhold' in occurrence && occurrence.withhold === 'primitive'
}

export function isWithheldConstituentsOccurrence(occurrence: SortedOccurrence): occurrence is WithheldConstituentsOccurrence {
  return 'withhold' in occurrence && occurrence.withhold === 'constituents'
}
