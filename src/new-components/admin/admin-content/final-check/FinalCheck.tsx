import { Dispatch, SetStateAction, useState } from 'react'
import LearnContent from '../../../learn/LearnContent'
import { CharFormData, TimelineData } from '../../../shared/logic/loadAdminChar'
import { Character, Phrase, ReferencedChar, SimilarAppearance, SimilarMeaning } from '../../../shared/interfaces'
import {
  isReminder,
  isSet,
  isUnset,
  isWithheldConstituentsOccurrence,
  isWithheldKeywordOccurrence,
  isWithheldPrimitiveOccurrence,
} from '../../utils/occurrence-utils'
import { PrevNextLinks } from '../../../shared/components/PrevNextLinks'
import { findLastIndex } from '../../../shared/utility-functions'
import {
  FullOccurrence,
  SortedOccurrence,
  WithheldConstituentsOccurrence,
  WithheldKeywordOccurrence,
  WithheldPrimitiveOccurrence,
} from '../../../shared/MOCK_DATABASE_ENTRIES'
import { CHARS } from '../../../shared/MOCK_CHARS'

export type UnsubmittedCharacter = Omit<Character, 'id'>

export function FinalCheck({ charFormData, timelineData }: { charFormData: CharFormData; timelineData: TimelineData }) {
  const [selectedTierIndex, selectTierIndex] = useState(0)

  function assembleEntry(): (UnsubmittedCharacter | null)[] {
    const result: (UnsubmittedCharacter | null)[] = []
    const constituents = getConstituents(charFormData)

    new Array(1, 2, 3, 4).forEach(tier => {
      const occurrence = timelineData[tier - 1]

      const variant = {
        ...charFormData,
        constituents,
        otherUses: charFormData.otherUses,
        phrases: [] as Phrase[], // To-Do: make query or handle on backend
        similarAppearance: [] as SimilarAppearance[], // To-Do: make query or handle on backend
        similarMeaning: [] as SimilarMeaning[], // To-Do: make query or handle on backend
        story: 'story' in occurrence ? occurrence.story : [],
      } as UnsubmittedCharacter

      if (isSet(occurrence)) {
        if (isWithheldConstituentsOccurrence(occurrence)) {
          delete variant.constituents
        }

        if (isWithheldKeywordOccurrence(occurrence)) {
          delete variant.keyword
        }

        if (isWithheldPrimitiveOccurrence(occurrence)) {
          delete variant.primitive
        }

        if (isReminder(occurrence)) {
          variant.reminder = true

          const lastContentVariantIndex = findLastIndex(
            timelineData,
            (occurrence: SortedOccurrence) => isSet(occurrence) && !isReminder(occurrence)
          )

          if (!lastContentVariantIndex) {
            throw new Error('Reminder is set without a previous variant')
          } else {
            const lastContentVariant = timelineData[lastContentVariantIndex] as
              | FullOccurrence
              | WithheldKeywordOccurrence
              | WithheldPrimitiveOccurrence
              | WithheldConstituentsOccurrence

            variant.story = lastContentVariant.story
          }
        }

        result.push(variant)
      }

      if (isUnset(occurrence)) {
        result.push(null)
      }
    })

    return result
  }

  const lesson = { characters: assembleEntry() }

  const selectedChar = lesson.characters[selectedTierIndex]

  if (selectedChar === null) {
    return (
      <>
        <div>Ebben a körben nem jelenik meg.</div>

        <FinalCheckPrevNextLinks {...{ selectTierIndex, selectedTierIndex }} />
      </>
    )
  }

  return (
    <LearnContent
      lessonChar={selectedChar as Character}
      navigation={<FinalCheckPrevNextLinks {...{ selectTierIndex, selectedTierIndex }} />}
    />
  )
}

function FinalCheckPrevNextLinks({
  selectTierIndex,
  selectedTierIndex,
}: {
  selectTierIndex: Dispatch<SetStateAction<number>>
  selectedTierIndex: number
}) {
  return (
    <PrevNextLinks
      prevTitle={selectedTierIndex !== 0 ? `${selectedTierIndex + 1}. kör` : undefined}
      prevOnClick={() => selectTierIndex(selectedTierIndex - 1)}
      nextTitle={selectedTierIndex !== 3 ? `${selectedTierIndex + 2}. kör` : undefined}
      nextOnClick={() => selectTierIndex(selectedTierIndex + 1)}
    />
  )
}

function getConstituents(charFormData: CharFormData) {
  const referencedConstituents: ReferencedChar[] = []

  charFormData.constituents?.forEach(constituent => {
    const foundChar = CHARS.find(char => char.glyph === constituent)

    if (!foundChar) {
      console.log(`${constituent} not found in the character database.`)
      return
    } else {
      const { glyph, keyword, primitive } = foundChar
      referencedConstituents.push({ glyph, keyword, primitive })
    }
  })

  return referencedConstituents
}
