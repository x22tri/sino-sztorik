import { Fragment } from 'react'
import { LessonOccurrence, LessonTimelineData } from '../../../shared/route-loaders/loadLessonEdit'
import { Stack } from '@mui/material'
import { Occurrence } from '../occurrence/Occurrence'

export function Timeline({ timelineData }: { timelineData: LessonTimelineData }) {
  return (
    <Stack marginTop={2} gap={2}>
      {timelineData.map((occurrence: LessonOccurrence, index: number) => {
        return (
          <Fragment key={index}>
            <Occurrence tier={index + 1} {...{ occurrence }} />
          </Fragment>
        )
      })}
    </Stack>
  )
}
