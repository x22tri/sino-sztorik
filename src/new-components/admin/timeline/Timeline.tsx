import { Fragment, useState } from 'react'
import { Box, Button, Stack } from '@mui/material'
import { OccurrenceType } from '../../shared/MOCK_DATABASE_ENTRIES'
import { Occurrence } from './Occurrence'
import { SortedCharacterEntry, SortedOccurrence, SortedOccurrences } from '../../shared/logic/loadAdminChar'
import { isWithheldPrimitiveOccurrence } from '../utils/occurrence-utils'
import { isWithheldKeywordOccurrence } from '../utils/occurrence-utils'
import { isFullOccurrence } from '../utils/occurrence-utils'
import { isUnset } from '../utils/occurrence-utils'
import { Unless, When } from 'react-if'
import { ReorderButtonRow } from './ReorderButtonRow'
import { ADMIN_CANCEL_SAVE, ADMIN_SAVE_CHANGES } from '../../shared/strings'
import { getCharVariantsFromOccurrences } from './getCharVariantsFromOccurrences'

export function Timeline({ character }: { character: SortedCharacterEntry }) {
  const [occurrences, setOccurrences] = useState(character.occurrences)
  const [savedOccurrences, saveOccurrences] = useState<SortedOccurrences>([...character.occurrences])

  function deleteEntry(atIndex: number) {
    const result = Array.from(occurrences) as SortedOccurrences

    result.splice(atIndex, 1, { tier: atIndex + 1 })

    setOccurrences(result)
  }

  function switchEntries(topIndex: number) {
    const result = Array.from(occurrences) as SortedOccurrences

    result[topIndex + 1] = { ...result[topIndex + 1], tier: topIndex + 1 }

    const [moved] = result.splice(topIndex, 1)

    result.splice(topIndex + 1, 0, { ...moved, tier: topIndex + 2 })

    setOccurrences(result)
  }

  function addEntry(atIndex: number, type: OccurrenceType) {
    const result = Array.from(occurrences) as SortedOccurrences
    const tier = atIndex + 1

    switch (type) {
      case 'full':
        result[atIndex] = { index: 0, story: [], tier }
        break
      case 'reminder':
        result[atIndex] = { index: 0, tier }
        break
      case 'withheldKeyword':
        result[atIndex] = { index: 0, story: [], tier, withhold: 'keyword' }
        break
      case 'withheldPrimitive':
        result[atIndex] = { index: 0, story: [], tier, withhold: 'primitive' }
        break
      case 'withheldConstituents':
        result[atIndex] = { index: 0, story: [], tier, withhold: 'constituents' }
        break
      default:
        return
    }

    setOccurrences(result)
  }

  return (
    <Box width={1}>
      <Stack marginTop={2} width={1}>
        {occurrences.map((occurrence: SortedOccurrence, index: number) => (
          <Fragment key={index}>
            <Occurrence {...{ addEntry, character, deleteEntry, index, occurrence, occurrences }} />

            <Unless condition={index === occurrences.length - 1}>
              <ReorderButtonRow {...{ index, occurrences, switchEntries }} />
            </Unless>
          </Fragment>
        ))}

        <Box alignItems='center' display='flex' gap={2} justifyContent='flex-end' marginTop={10}>
          <Button onClick={() => setOccurrences(savedOccurrences)} variant='text'>
            {ADMIN_CANCEL_SAVE}
          </Button>

          <Button onClick={() => saveOccurrences(occurrences)} type='submit' variant='contained'>
            {ADMIN_SAVE_CHANGES}
          </Button>

          <Button onClick={() => getCharVariantsFromOccurrences(character, occurrences)} color='secondary' variant='contained'>
            Változatok vizualizálása
          </Button>
        </Box>
      </Stack>
      Problémák:
      <When condition={occurrences.some(occurrence => 'story' in occurrence && occurrence.story.length === 0)}>
        Egy vagy több előfordulásnál nincs történet
      </When>
      <When
        condition={
          'keyword' in character &&
          !occurrences.some(occurrence => isFullOccurrence(occurrence) || isWithheldPrimitiveOccurrence(occurrence))
        }
      >
        Kulcsszó nincs bevezetve
      </When>
      <When
        condition={
          'primitive' in character &&
          !occurrences.some(occurrence => isFullOccurrence(occurrence) || isWithheldKeywordOccurrence(occurrence))
        }
      >
        Alapelem nincs bevezetve
      </When>
      <When condition={occurrences.some(occurrence => 'index' in occurrence && occurrence.index === 0)}>
        Egy vagy több előfordulás nincs elhelyezve a leckében (Teendő: a kezelőközpont megnyitásakor a szerver lekéri, hogy az
        adott körben hanyadik a karakter az adott körbe tartozó karakterek szűrésével, így ennek nem kellene előfordulnia)
      </When>
    </Box>
  )
}
