import { redirect } from 'react-router-dom'
import { LESSONS } from '../MOCK_LESSONS'
import { LessonStatuses } from '../interfaces'
import {
  CHAR_ENTRY,
  CHAR_ENTRY_V2,
  CharacterEntry,
  CharacterEntryV2,
  CharacterEntryVariant,
  Occurrence,
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

export type Unset = { tier: number; type: 'unset' }

export type PotentialOccurrence = Occurrence | Unset

export type SortedOccurrences = [PotentialOccurrence, PotentialOccurrence, PotentialOccurrence, PotentialOccurrence]

export type SortedCharacterEntry = Omit<CharacterEntryV2, 'occurrences'> & {
  occurrences: SortedOccurrences
}

export function loadAdminChar(): { character: SortedCharacterEntry } {
  const characterEntry = CHAR_ENTRY_V2 // To-Do: Fetch from database.

  if (!characterEntry) {
    throw new Response('Character not found in the database', { status: 404 })
  }

  const sorted = new Array(1, 2, 3, 4).map(
    tier => characterEntry.occurrences.find(occurrence => occurrence.tier === tier) ?? { tier, type: 'unset' }
  ) as SortedOccurrences

  return { character: { ...characterEntry, occurrences: sorted } }
}
