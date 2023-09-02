import Typography from '@mui/material/Typography'
import { Divider, Stack } from '@mui/material'
import { useLargeScreen } from '../../shared/hooks/useLargeScreen'
import { When } from 'react-if'
import { TierStatusIcons } from '../lesson-picker/TierStatusIcons'
import { CHARACTER_AMOUNT_LABEL } from '../../shared/strings'
import { LearnReviewButton } from '../lesson-start/LearnReviewButton'
import { ReactNode } from 'react'
import { AssembledLesson } from '../../shared/interfaces'
import { ContentWrapper } from '../../shared/components/ContentWrapper'

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
      <ContentWrapper>
        <Typography color='text.secondary' textAlign='center' variant='h6' mt={{ xs: 2, md: 0 }}>
          {lessonNumber}. lecke
        </Typography>

        <Typography textAlign='center' variant='h4' fontSize='175% !important'>
          {title}
        </Typography>

        <When condition={!isLargeScreen}>
          <Stack
            alignItems='center'
            justifyContent='center'
            direction='row'
            divider={<Divider flexItem orientation='vertical' sx={{ mx: 2 }} />}
            mt={1}
          >
            <TierStatusIcons {...{ tierStatuses }} />

            <Typography color='text.secondary' variant='h6'>
              {characters.length} {CHARACTER_AMOUNT_LABEL}
            </Typography>
          </Stack>
        </When>

        <Typography component='p' gridArea='preface' marginY={3}>
          {preface}
        </Typography>

        <LearnReviewButton />
      </ContentWrapper>

      {navigation}
    </>
  )
}
