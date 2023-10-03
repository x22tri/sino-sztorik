import { Dispatch, SetStateAction, useState } from 'react'
import { LessonFormData, LessonTimelineData } from '../../../shared/route-loaders/loadLessonEdit'
import { AssembledLesson, Character, LessonStatuses, TierStatuses } from '../../../shared/interfaces'
import LessonSelectContent from '../../../lesson-select/lesson-select-content/LessonSelectContent'
import { useParams } from 'react-router-dom'
import { Stack, Typography, useTheme } from '@mui/material'
import { LessonEditStorySection } from '../sections/LessonEditStorySection'
import { PrevNextLinks } from '../../../shared/components/PrevNextLinks'

export function Timeline({ lessonFormData, timelineData }: { lessonFormData: LessonFormData; timelineData: LessonTimelineData }) {
  const { palette, spacing } = useTheme()
  const [selectedTierIndex, selectTierIndex] = useState(0)
  const params = useParams()

  function assembleEntry() {
    const result: (AssembledLesson | null)[] = []

    const tiersWhereLessonIsPresent = [1, 2, 3, 4].filter(tier =>
      timelineData.find(occurrence => occurrence.variantInTier?.tier === tier)
    )

    for (const tier of [1, 2, 3, 4]) {
      const occurrence = timelineData[tier - 1]

      if (!occurrence.variantInTier) {
        result.push(null)
        continue
      }

      result.push({
        lessonNumber: Number(params.lessonNumber),
        title: lessonFormData.title,
        characters: occurrence.charactersInTier as unknown as Character[],
        preface: occurrence.variantInTier!.preface,
        tierStatuses: getMockTierStatuses(tier, tiersWhereLessonIsPresent),
      })
    }

    return result
  }

  const lessons = assembleEntry()

  const selectedLesson = lessons[selectedTierIndex]

  if (selectedLesson === null) {
    return (
      <>
        <Typography alignItems='center' display='flex' variant='h6' fontWeight='bold'>
          {selectedTierIndex + 1}. kör – Nem jelenik meg
        </Typography>

        <Stack
          alignItems='center'
          bgcolor={'grey.50'}
          color='text.secondary'
          borderRadius={spacing(2)}
          justifyContent='center'
          minHeight='200px'
          my={3}
          gap={1}
          sx={{ border: `1px solid ${palette.grey[300]}`, outline: `2px dashed ${palette.text.disabled}`, outlineOffset: '-6px' }}
        >
          A kör létrehozásához adj hozzá karaktereket a Karakterszerkesztőben
        </Stack>

        <FinalCheckPrevNextLinks {...{ selectTierIndex, selectedTierIndex }} />
      </>
    )
  }

  return (
    <>
      <Typography alignItems='center' display='flex' variant='h6' fontWeight='bold'>
        {selectedTierIndex + 1}. kör
      </Typography>

      <LessonSelectContent
        customPrefaceSection={<LessonEditStorySection {...{ selectedLesson }} />}
        navigation={<FinalCheckPrevNextLinks {...{ selectTierIndex, selectedTierIndex }} />}
        {...{ selectedLesson }}
      />
    </>
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

function getMockTierStatuses(atTier: number, tiersWhereLessonIsPresent: number[]): TierStatuses {
  return new Array<number>(1, 2, 3, 4).map(tier =>
    !tiersWhereLessonIsPresent.includes(tier)
      ? LessonStatuses.NOT_IN_TIER
      : tier < atTier
      ? LessonStatuses.COMPLETED
      : tier === atTier
      ? LessonStatuses.UPCOMING
      : LessonStatuses.LOCKED
  ) as TierStatuses
}
