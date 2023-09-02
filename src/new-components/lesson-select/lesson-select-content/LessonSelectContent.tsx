import Typography from '@mui/material/Typography'
import { Box, Divider, Stack, useTheme } from '@mui/material'
import { useLargeScreen } from '../../shared/hooks/useLargeScreen'
import { When } from 'react-if'
import { useLoaderData, useLocation } from 'react-router-dom'
import { LoadLessonSelect } from '../../shared/logic/loadLessonSelect'
import { PrevNextLinks } from '../../shared/components/PrevNextLinks'
import { LESSON_SELECT_PATH } from '../../shared/paths'
import { TierStatusIcons } from '../lesson-picker/TierStatusIcons'
import { CHARACTER_AMOUNT_LABEL } from '../../shared/strings'
import { LearnReviewButton } from '../lesson-start/LearnReviewButton'
import { ReactNode, useEffect } from 'react'
import { AssembledLesson } from '../../shared/interfaces'

export default function LessonSelectContent({
  navigation,
  selectedLesson,
}: {
  navigation: ReactNode
  selectedLesson: AssembledLesson
}) {
  const isLargeScreen = useLargeScreen()
  const { constants, spacing } = useTheme()
  const { characters, lessonNumber, preface, tierStatuses, title } = selectedLesson

  return (
    <>
      <Box p={{ xs: 2, md: 4 }} boxShadow={constants.boxShadow} borderRadius={spacing(2)}>
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
      </Box>

      {navigation}
    </>
  )
}
