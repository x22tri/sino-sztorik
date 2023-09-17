import { LessonOccurrence, LessonTimelineData } from '../../../shared/route-loaders/loadLessonEdit'
import { Stack } from '@mui/material'
import { Occurrence } from '../occurrence/Occurrence'

export function Timeline({ timelineData }: { timelineData: LessonTimelineData }) {
  return (
    <Stack marginTop={2} gap={3}>
      {timelineData.map((occurrence: LessonOccurrence, index: number) => {
        return <Occurrence key={index} tier={index + 1} {...{ occurrence }} />
      })}
    </Stack>
  )
}
