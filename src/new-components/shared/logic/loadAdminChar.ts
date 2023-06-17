import { redirect } from 'react-router-dom'
import { LESSONS } from '../MOCK_LESSONS'
import { LessonStatuses } from '../interfaces'
import { CHAR_ENTRY, CharacterEntry, CharacterEntryVariant } from '../MOCK_DATABASE_ENTRIES'

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

export function loadAdminChar() {
  const characterEntry = CHAR_ENTRY // To-Do: Fetch from database.

  if (!characterEntry) {
    throw new Response('Character not found in the database', { status: 404 })
  }

  const sorted = new Array(1, 2, 3, 4).map(
    tier => characterEntry.variants.find(variant => variant.tier === tier) ?? {}
  ) as DiffedCharacterEntryVariant[]

  const diffInfos: DiffInfoTier[] = []

  const hashMap: Partial<Record<keyof CharacterEntryVariant, number>> = {}

  for (const [index, variant] of sorted.entries()) {
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

    // let previousInfo: (keyof CharacterEntryVariant)[] = []
    // if (variant.tier - 1) {
    //   previousInfo = [...sorted[variant.tier - 2].newInfo, ...sorted[variant.tier - 2].modifiedInfo]
    // }

    Object.assign(variant, { newInfo, modifiedInfo })
    // Object.assign(diffInfo, { newInfo, modifiedInfo })
    diffInfos.push({ newInfo, modifiedInfo, tier: variant.tier })
  }

  return { character: { ...characterEntry, variants: sorted }, diffInfos }
}
