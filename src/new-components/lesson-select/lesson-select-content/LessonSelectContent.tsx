import Typography from '@mui/material/Typography'
import { Box, Divider, Stack, useTheme } from '@mui/material'
import { useLargeScreen } from '../../shared/hooks/useLargeScreen'
import { When } from 'react-if'
import { CharacterPreviews } from '../lesson-start/CharacterPreviews'
import { useLoaderData } from 'react-router-dom'
import { LoadLessonSelect } from '../../shared/logic/loadLessonSelect'
import { PrevNextLinks } from '../../shared/components/PrevNextLinks'
import { LESSON_SELECT_PATH } from '../../shared/paths'
import { TierStatusIcons } from '../lesson-picker/TierStatusIcons'
import { CHARACTER_AMOUNT_LABEL } from '../../shared/strings'

export default function LessonSelectContent({ toolbarHeight }: { toolbarHeight: number }) {
  const isLargeScreen = useLargeScreen()
  const { constants } = useTheme()
  const { nextLesson, prevLesson, selectedLesson } = useLoaderData() as LoadLessonSelect
  const { characters, tierStatuses, title, preface } = selectedLesson

  return (
    <Box display='grid' gridTemplateColumns={{ xs: 'auto', lg: '3fr 1fr' }}>
      <Stack
        boxSizing='border-box'
        component='main'
        columnGap={6}
        // display='grid'
        // marginTop={`${toolbarHeight}px`}
        marginBottom={constants.bottomToolbarHeight}
        minHeight={`calc(100vh - ${toolbarHeight}px - ${constants.bottomToolbarHeight})`}
        padding={2}
        sx={{
          bgcolor: 'background.paper',
          // grid: {
          //   xs: `"title" max-content
          //        "preface" auto
          //        "prev-next" max-content
          //        / auto`,
          //   lg: `"title chars-title" max-content
          //        "preface chars" auto
          //        "prev-next ." max-content
          //        / 3fr 1fr`,
          // },
        }}
      >
        <Typography gridArea='title' textAlign='center' variant='h4' fontSize='175% !important'>
          {title}
        </Typography>

        <When condition={!isLargeScreen}>
          <Stack
            alignItems='center'
            direction='row'
            divider={<Divider flexItem orientation='vertical' sx={{ mx: 2 }} />}
            mx='auto'
            mt={1}
          >
            <TierStatusIcons {...{ tierStatuses }} />

            <Typography color='text.secondary' variant='h6'>
              {characters.length} {CHARACTER_AMOUNT_LABEL}
            </Typography>
          </Stack>
        </When>

        <Typography component='p' gridArea='preface' marginTop={3}>
          {preface}
        </Typography>

        <PrevNextLinks
          prevTitle={prevLesson?.title}
          prevTo={`${LESSON_SELECT_PATH}/${prevLesson?.lessonNumber}`}
          nextTitle={nextLesson?.title}
          nextTo={`${LESSON_SELECT_PATH}/${nextLesson?.lessonNumber}`}
        />
      </Stack>
      <Box>
        <When condition={isLargeScreen && characters.length}>
          <CharacterPreviews {...{ characters, tierStatuses }} />
        </When>
      </Box>
    </Box>
  )
}
