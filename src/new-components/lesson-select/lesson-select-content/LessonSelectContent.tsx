import Typography from '@mui/material/Typography'
import { Box, Chip, Divider, Stack } from '@mui/material'
import { useLargeScreen } from '../../shared/hooks/useLargeScreen'
import { Case, Default, Switch, When } from 'react-if'
import { TierStatusIcons, iconDictionary } from '../lesson-picker/TierStatusIcons'
import { CHARACTER_AMOUNT_LABEL } from '../../shared/strings'
import { LearnReviewButton } from '../lesson-start/LearnReviewButton'
import { ReactNode } from 'react'
import { AssembledLesson, LessonStatuses } from '../../shared/interfaces'
import { isCompletedLesson, isDisabledLesson, isUpcomingLesson } from '../../shared/utility-functions'

export default function LessonSelectContent({
  navigation,
  selectedLesson,
}: {
  navigation: ReactNode
  selectedLesson: AssembledLesson
}) {
  const isLargeScreen = useLargeScreen()
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

        <Typography color='text.secondary' mb={5} variant='body2'>
          {lessonNumber}. lecke
        </Typography>

        <Divider sx={{ mb: 5 }} />

        <Typography component='p' gridArea='preface' mb={3}>
          {preface}
        </Typography>
      </Box>

      {navigation}
    </>
  )
}
