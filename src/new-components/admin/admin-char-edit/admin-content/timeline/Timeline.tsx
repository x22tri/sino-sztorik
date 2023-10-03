import { Dispatch, SetStateAction, useState } from 'react'
import LearnContent from '../../../../learn/LearnContent'
import { CalculatedIndexes, CharFormData, CharTimelineData } from '../../../../shared/route-loaders/loadCharEdit'
import { Character, Phrase, ReferencedChar, SimilarAppearance, SimilarMeaning } from '../../../../shared/interfaces'
import {
  getOccurrenceType,
  isReminder,
  isSet,
  isUnset,
  isWithheldConstituentsOccurrence,
  isWithheldKeywordOccurrence,
  isWithheldPrimitiveOccurrence,
} from '../../utils/occurrence-utils'
import { PrevNextLinks } from '../../../../shared/components/PrevNextLinks'
import { findLastIndex } from '../../../../shared/utility-functions'
import {
  FullOccurrence,
  OccurrenceType,
  OccurrenceV3,
  SortedOccurrence,
  WithheldConstituentsOccurrence,
  WithheldKeywordOccurrence,
  WithheldPrimitiveOccurrence,
} from '../../../../shared/MOCK_DATABASE_ENTRIES'
import { CHARS } from '../../../../shared/MOCK_CHARS'
import { Box, Button, Stack, Typography, useTheme } from '@mui/material'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { noOrphanedRemindersIfTierWasDeleted } from '../../timeline/getReminderContentType'
import { AddOccurrenceOptions } from '../../timeline/AddOccurrenceOptions'
import { CharEditStorySection } from '../story-section/CharEditStorySection'

export type UnsubmittedCharacter = Omit<Character, 'id'>

const occurrenceTypeMap: Record<OccurrenceType, string> = {
  reminder: 'Emlékeztető',
  full: 'Teljes karakter',
  withheldKeyword: 'Csak az alapelem bevezetése',
  withheldPrimitive: 'Csak a kulcsszó bevezetése',
  withheldConstituents: 'Kulcsszó felületes bevezetése',
}

export function Timeline({
  calculatedIndexes,
  charFormData,
  timelineData,
  setTimelineData,
}: {
  calculatedIndexes: CalculatedIndexes
  charFormData: CharFormData
  timelineData: CharTimelineData
  setTimelineData: Dispatch<SetStateAction<CharTimelineData>>
}) {
  const { palette, spacing } = useTheme()

  const [selectedTierIndex, selectTierIndex] = useState(0)

  const lesson = { characters: assembleEntry(timelineData) }

  const selectedChar = lesson.characters[selectedTierIndex]

  function assembleEntry(timelineData: CharTimelineData): (UnsubmittedCharacter | null)[] {
    const result: (UnsubmittedCharacter | null)[] = []
    const constituents = getConstituents(charFormData)

    new Array<number>(1, 2, 3, 4).forEach(tier => {
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

      // To-Do: Add "new primitive" flag

      if (isSet(occurrence)) {
        if (isReminder(occurrence)) {
          variant.reminder = true

          const lastContentVariantIndex = findLastIndex(
            timelineData,
            (occurrence: SortedOccurrence) => isSet(occurrence) && !isReminder(occurrence)
          )

          if (lastContentVariantIndex === -1) {
            throw new Error('Reminder is set without a previous variant')
          } else {
            const lastContentVariant = timelineData[lastContentVariantIndex] as
              | FullOccurrence
              | WithheldKeywordOccurrence
              | WithheldPrimitiveOccurrence
              | WithheldConstituentsOccurrence

            variant.story = lastContentVariant.story

            if ('withhold' in lastContentVariant) {
              deleteWithheld(lastContentVariant, variant)
            }
          }
        }

        deleteWithheld(occurrence, variant)

        result.push(variant)
      }

      if (isUnset(occurrence)) {
        result.push(null)
      }
    })

    return result
  }

  function addEntry(atIndex: number, type: OccurrenceType) {
    const result = Array.from(timelineData) as CharTimelineData
    const tier = atIndex + 1
    const calculatedIndex = calculatedIndexes[atIndex]

    switch (type) {
      case 'full':
        result[atIndex] = { index: calculatedIndex, story: [], tier }
        break
      case 'reminder':
        result[atIndex] = { index: calculatedIndex, tier }
        break
      case 'withheldKeyword':
        result[atIndex] = { index: calculatedIndex, story: [], tier, withhold: 'keyword' }
        break
      case 'withheldPrimitive':
        result[atIndex] = { index: calculatedIndex, story: [], tier, withhold: 'primitive' }
        break
      case 'withheldConstituents':
        result[atIndex] = { index: calculatedIndex, story: [], tier, withhold: 'constituents' }
        break
      default:
        throw new Error('Tried to add unknown entry type.')
    }

    setTimelineData(result)
  }

  function deleteEntry(atIndex: number) {
    const result = Array.from(timelineData) as CharTimelineData

    result.splice(atIndex, 1, { tier: atIndex + 1 })

    setTimelineData(result)

    lesson.characters = assembleEntry(result)
  }

  if (selectedChar === null) {
    return (
      <>
        <Typography alignItems='center' display='flex' variant='h6' fontWeight='bold'>
          {selectedTierIndex + 1}. kör – Nem jelenik meg
        </Typography>

        <Stack
          alignItems='center'
          bgcolor={'grey.50'}
          borderRadius={spacing(2)}
          justifyContent='center'
          minHeight='200px'
          my={3}
          gap={1}
          sx={{ border: `1px solid ${palette.grey[300]}`, outline: `2px dashed ${palette.text.disabled}`, outlineOffset: '-6px' }}
        >
          <AddOccurrenceOptions index={selectedTierIndex} {...{ addEntry, charFormData, timelineData }} />
        </Stack>

        <FinalCheckPrevNextLinks {...{ selectTierIndex, selectedTierIndex }} />
      </>
    )
  }

  const canBeDeleted = noOrphanedRemindersIfTierWasDeleted(timelineData, selectedTierIndex)

  const occurrenceType = occurrenceTypeMap[getOccurrenceType(timelineData[selectedTierIndex])]

  return (
    <>
      <Box alignItems='center' display='flex' justifyContent='space-between'>
        <Typography alignItems='center' display='flex' variant='h6' fontWeight='bold'>
          {selectedTierIndex + 1}. kör – {occurrenceType}
        </Typography>

        {canBeDeleted ? (
          <Button
            color='error'
            startIcon={<FontAwesomeIcon icon={faXmark} />}
            onClick={() => deleteEntry(selectedTierIndex)}
            sx={{ '.MuiButton-startIcon': { marginBottom: '-3px' } }}
          >
            Törlés a körből
          </Button>
        ) : (
          <Button disabled>Nem törölhető</Button>
        )}
      </Box>

      <LearnContent
        customStorySection={<CharEditStorySection {...{ selectedChar }} />}
        lessonChar={selectedChar as Character}
        navigation={<FinalCheckPrevNextLinks {...{ selectTierIndex, selectedTierIndex }} />}
      />
    </>
  )
}

export function FinalCheckPrevNextLinks({
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

function deleteWithheld(occurrence: OccurrenceV3, variant: UnsubmittedCharacter): void {
  if (isWithheldConstituentsOccurrence(occurrence)) {
    delete variant.constituents
  }

  if (isWithheldKeywordOccurrence(occurrence)) {
    delete variant.keyword
  }

  if (isWithheldPrimitiveOccurrence(occurrence)) {
    delete variant.primitive
  }
}
