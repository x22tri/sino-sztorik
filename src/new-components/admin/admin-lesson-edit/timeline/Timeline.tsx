import { LessonOccurrence, LessonTimelineData } from '../../../shared/route-loaders/loadLessonEdit'
import { Divider, Stack } from '@mui/material'
import { Occurrence } from '../occurrence/Occurrence'
import { Fragment } from 'react'
import { TierIndicator } from '../../admin-char-edit/timeline/ReorderButtonRow'
import { Unless } from 'react-if'

export function Timeline({ timelineData }: { timelineData: LessonTimelineData }) {
  return (
    <>
      {/* <Divider>
        <TierIndicator index={-1} />
      </Divider> */}

      <Stack>
        {timelineData.map((occurrence: LessonOccurrence, index: number) => (
          <Fragment key={index}>
            <Occurrence key={index} tier={index + 1} {...{ occurrence }} />

            {/* <Unless condition={index === timelineData.length - 1}>
              <Divider>
                <TierIndicator {...{ index }} />
              </Divider>
            </Unless> */}
          </Fragment>
        ))}
      </Stack>
    </>
  )
}
