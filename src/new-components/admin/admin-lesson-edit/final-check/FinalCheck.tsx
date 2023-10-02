import { useState } from 'react'
import { LessonFormData, LessonTimelineData } from '../../../shared/route-loaders/loadLessonEdit'
import { AssembledLesson, Character, LessonStatuses, TierStatuses } from '../../../shared/interfaces'
import LessonSelectContent from '../../../lesson-select/lesson-select-content/LessonSelectContent'
import { FinalCheckPrevNextLinks } from '../../admin-char-edit/admin-content/final-check/FinalCheck'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { TierHeading } from '../../shared/TierHeading'

export function FinalCheck({
  lessonFormData,
  timelineData,
}: {
  lessonFormData: LessonFormData
  timelineData: LessonTimelineData
}) {
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
        <TierHeading tier={selectedTierIndex + 1} />

        <Box mb={4}>Ebben a körben nem jelenik meg.</Box>

        <FinalCheckPrevNextLinks {...{ selectTierIndex, selectedTierIndex }} />
      </>
    )
  }

  return (
    <>
      <TierHeading tier={selectedTierIndex + 1} />

      <LessonSelectContent
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
