import { useState } from 'react'
import LearnContent from '../../../learn/LearnContent'
import { CharFormData, TimelineData } from '../../../shared/logic/loadAdminChar'
import { Character, OtherUse, Phrase, ReferencedChar, SimilarAppearance, SimilarMeaning } from '../../../shared/interfaces'
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

export type UnsubmittedCharacter = Omit<Character, 'id'>

export function FinalCheck({ charFormData, timelineData }: { charFormData: CharFormData; timelineData: TimelineData }) {
  const [selectedTierIndex, selectTierIndex] = useState(0)

  function assembleEntry(): (UnsubmittedCharacter | null)[] {
    const result: (UnsubmittedCharacter | null)[] = []

    new Array(1, 2, 3, 4).forEach(tier => {
      const occurrence = timelineData[tier - 1]

      const variant = {
        ...charFormData,
        constituents: [] as ReferencedChar[], // To-Do: make query or handle on backend
        otherUses: [] as OtherUse[], // To-Do: make query or handle on backend
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

        <PrevNextLinks
          prevTitle={selectedTierIndex !== 0 ? `${selectedTierIndex + 1}. kör` : undefined}
          prevOnClick={() => selectTierIndex(selectedTierIndex - 1)}
          nextTitle={selectedTierIndex !== 3 ? `${selectedTierIndex + 2}. kör` : undefined}
          nextOnClick={() => selectTierIndex(selectedTierIndex + 1)}
        />
      </>
    )
  }

  return (
    <LearnContent
      lessonChar={selectedChar as Character}
      prevChar={selectedTierIndex !== 0 ? `${selectedTierIndex + 1}. kör` : undefined}
      nextChar={selectedTierIndex !== 3 ? `${selectedTierIndex + 2}. kör` : undefined}
      selectCharIndex={(index: number) => selectTierIndex(index)}
      selectedCharIndex={selectedTierIndex}
    />
  )
}
