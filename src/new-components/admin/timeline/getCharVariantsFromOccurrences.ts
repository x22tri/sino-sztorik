import { CharacterEntryV3, OccurrenceType } from '../../shared/MOCK_DATABASE_ENTRIES'
import { CharFormData, SortedOccurrence, TimelineData } from '../../shared/logic/loadAdminChar'
import { getOccurrenceType } from '../utils/occurrence-utils'
import { isUnset } from '../utils/occurrence-utils'

export function mergePreviousTiers(variants: SortedOccurrence[], tierToStopAt: number) {
  return variants.slice(0, tierToStopAt).reduce((previousInfo, newInfo) => Object.assign(previousInfo, newInfo), {})
}

export function getCharVariantsFromOccurrences(character: CharFormData, occurrences: TimelineData) {
  const occurrencePropertyMap: Partial<Record<OccurrenceType, (keyof CharFormData)[]>> = {
    withheldKeyword: ['explanation', 'frequency', 'keyword', 'otherUses', 'pinyin', 'phrases', 'similars'],
    withheldPrimitive: ['primitive'],
    withheldConstituents: ['constituents', 'explanation', 'otherUses', 'phrases', 'similars'],
  }

  const noUnsets = occurrences.filter(occurrence => !isUnset(occurrence))

  let res: (CharFormData & SortedOccurrence)[] = []

  noUnsets.forEach((noUnsetOccurrence, index) => {
    const baseChar = structuredClone(character)
    const occurrence = structuredClone(noUnsetOccurrence)

    const type = getOccurrenceType(occurrence)

    if (type === 'reminder') {
      res.push(Object.assign({ ...res[index - 1] }, occurrence))
      return
    }

    if ('withhold' in occurrence) {
      delete (occurrence as any)['withhold']
    }

    const fullChar = Object.assign(baseChar, occurrence)

    occurrencePropertyMap[type]?.forEach(key => delete fullChar[key])

    delete (fullChar as any)['occurrences']

    res.push(fullChar)
  })

  console.log(res)
  return res
}
