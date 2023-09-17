import { useParams } from 'react-router-dom'
import { LessonOccurrence } from '../../../shared/route-loaders/loadLessonEdit'
import { CourseLocation } from '../course-location/CourseLocation'
import { Box, SxProps, useTheme } from '@mui/material'
import { Actions } from '../actions/Actions'
import { Unless } from 'react-if'

export function Occurrence({ occurrence, tier }: { occurrence: LessonOccurrence; tier: number }) {
  const params = useParams()
  const { spacing } = useTheme()

  const isEmptyTier = !occurrence.variantInTier

  const sx = useLessonOccurrenceStyles(isEmptyTier)

  return (
    <Box
      borderRadius={spacing(6)}
      display='grid'
      minHeight={spacing(10)}
      pr={3}
      pl={2}
      sx={{
        grid: `"location content actions" auto / 1fr 7fr 1fr`,
        ...sx,
      }}
    >
      <Unless condition={isEmptyTier}>
        <CourseLocation lessonNumber={Number(params.lessonNumber)} {...{ tier }} />
      </Unless>

      <Box
        alignItems='center'
        display='flex'
        margin='auto'
        gridArea='content'
        textAlign='center'
        typography={isEmptyTier ? 'body2' : 'body'}
      >
        {isEmptyTier
          ? 'A kör létrehozásához adj hozzá karaktereket a Karakterszerkesztőben'
          : `${occurrence.charactersInTier.length} karakter`}
      </Box>

      <Actions {...{ occurrence }} />
    </Box>
  )
}

function useLessonOccurrenceStyles(isEmptyTier: boolean): SxProps {
  const { palette } = useTheme()

  return isEmptyTier
    ? {
        background: palette.grey[50],
        color: palette.text.disabled,
        outline: `2px dashed ${palette.text.disabled}`,
        outlineOffset: '-6px',
      }
    : { background: palette.primary[200], color: palette.primary.main }
}
