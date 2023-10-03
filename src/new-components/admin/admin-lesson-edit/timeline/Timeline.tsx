import { useState } from 'react'
import { LessonFormData, LessonTimelineData } from '../../../shared/route-loaders/loadLessonEdit'
import { AssembledLesson, Character, LessonStatuses, TierStatuses } from '../../../shared/interfaces'
import LessonSelectContent from '../../../lesson-select/lesson-select-content/LessonSelectContent'
import { FinalCheckPrevNextLinks } from '../../admin-char-edit/admin-content/final-check/FinalCheck'
import { useParams } from 'react-router-dom'
import { Stack, Typography, useTheme } from '@mui/material'
import { TierHeading } from '../../shared/TierHeading'
import { LessonEditStorySection } from '../story-section/LessonEditStorySection'

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
      <TierHeading tier={selectedTierIndex + 1} />

      <LessonSelectContent
        customPrefaceSection={<LessonEditStorySection {...{ selectedLesson }} />}
        navigation={<FinalCheckPrevNextLinks {...{ selectTierIndex, selectedTierIndex }} />}
        {...{ selectedLesson }}
      />
    </>
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
