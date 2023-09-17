import Typography from '@mui/material/Typography'
import { Box, Chip, Divider, Stack } from '@mui/material'
import { Case, Default, Switch } from 'react-if'
import { iconDictionary } from '../lesson-picker/TierStatusIcons'
import { ReactNode } from 'react'
import { AssembledLesson, LessonStatuses } from '../../shared/interfaces'
import { isCompletedLesson, isUpcomingLesson } from '../../shared/utility-functions'

export default function LessonSelectContent({
  navigation,
  selectedLesson,
}: {
  navigation: ReactNode
  selectedLesson: AssembledLesson
}) {
  const { characters, lessonNumber, preface, tierStatuses, title } = selectedLesson

  return (
    <>
      <Box display='flex' flexDirection='column' mt={2}>
        <Stack alignItems='center' direction='row' gap={1} mb={2}>
          <Switch>
            <Case condition={isUpcomingLesson(tierStatuses)}>
              <Chip
                icon={iconDictionary[LessonStatuses.UPCOMING]}
                label={LessonStatuses.UPCOMING}
                sx={{ backgroundColor: 'primary.100' }}
              />
            </Case>

            <Case condition={isCompletedLesson(tierStatuses)}>
              <Chip
                icon={iconDictionary[LessonStatuses.COMPLETED]}
                label={LessonStatuses.COMPLETED}
                sx={{ backgroundColor: 'success.100' }}
              />
            </Case>

            <Default></Default>
          </Switch>

          <Chip label={`${characters.length} karakter`} />
        </Stack>

        <Typography variant='h3' fontWeight='bold' mb={1}>
          {title}
        </Typography>

        <Typography color='text.secondary' mb={4} variant='body2'>
          {lessonNumber}. lecke
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Typography component='p' gridArea='preface' mb={4}>
          {preface}
        </Typography>
      </Box>

      {navigation}
    </>
  )
}
