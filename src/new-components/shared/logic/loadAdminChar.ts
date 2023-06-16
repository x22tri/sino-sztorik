import { redirect } from 'react-router-dom'
import { LESSONS } from '../MOCK_LESSONS'
import { LessonStatuses } from '../interfaces'
import { CHAR_ENTRY, CharacterEntry, CharacterEntryVariant } from '../MOCK_DATABASE_ENTRIES'

export interface DiffedCharacterEntryVariant extends CharacterEntryVariant {
  newInfo: (keyof CharacterEntryVariant)[]
  modifiedInfo: (keyof CharacterEntryVariant)[]
}

export interface DiffedCharacterEntry extends CharacterEntry {
  variants: [DiffedCharacterEntryVariant, DiffedCharacterEntryVariant, DiffedCharacterEntryVariant, DiffedCharacterEntryVariant]
}

export function loadAdminChar() {
  const characterEntry = CHAR_ENTRY // To-Do: Fetch from database.

  if (!characterEntry) {
    throw new Response('Character not found in the database', { status: 404 })
  }

  const sorted = new Array(1, 2, 3, 4).map(
    tier => characterEntry.variants.find(variant => variant.tier === tier) ?? {}
  ) as DiffedCharacterEntryVariant[]

  const hashMap: Partial<Record<keyof CharacterEntryVariant, number>> = {}

  sorted.forEach((variant: any) => {
    const newInfo: any[] = []
    const modifiedInfo: any[] = []

    Object.keys(variant).forEach(key => {
      if (['tier', 'index', 'newInfo', 'modifiedInfo'].includes(key)) {
        return
      }

      if (!(key in hashMap)) {
        hashMap[key as keyof CharacterEntryVariant] = variant.tier
        newInfo.push(key)
      } else {
        modifiedInfo.push(key)
      }
    })

    Object.assign(variant, { newInfo, modifiedInfo })
  })

  return { ...characterEntry, variants: sorted }
}
