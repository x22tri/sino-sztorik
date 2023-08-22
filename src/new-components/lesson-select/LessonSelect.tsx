import { LessonPickerContent } from './lesson-picker/LessonPickerContent'
import { LessonPickerTitle } from './lesson-picker/LessonPickerTitle'
import { LessonSelectAppbar } from './appbar/LessonSelectAppbar'
import LessonSelectContent from './lesson-select-content/LessonSelectContent'
import { useLoaderData, useParams } from 'react-router-dom'
import { useDrawer } from '../shared/hooks/useDrawer'
import { Box, Stack, useTheme } from '@mui/material'
import { SideNav } from '../shared/components/SideNav'
import { When } from 'react-if'
import { CharacterPreviews } from './lesson-start/CharacterPreviews'
import { useLargeScreen } from '../shared/hooks/useLargeScreen'
import { LoadLessonSelect } from '../shared/logic/loadLessonSelect'

export default function LessonSelect() {
  const { constants } = useTheme()
  const isLargeScreen = useLargeScreen()
  const params = useParams<{ lessonNumber: string }>()
  const lessonNumber = Number(params.lessonNumber)
  const { isDrawerOpen, toggleDrawer } = useDrawer()
  const { selectedLesson } = useLoaderData() as LoadLessonSelect
  const { characters, tierStatuses } = selectedLesson

  return (
    <>
      <LessonSelectAppbar {...{ toggleDrawer }} />

      <Box
        display='grid'
        margin='auto'
        sx={{
          maxWidth: constants.maxContentWidth,
          gridTemplate: {
            xs: `"main" / auto`,
            md: `"nav main" / ${constants.drawerWidth}px auto`,
            lg: `"nav main aside" / ${constants.drawerWidth}px 3fr 1fr`,
          },
        }}
      >
        <Box component='nav' gridArea='nav'>
          <SideNav
            content={<LessonPickerContent {...{ toggleDrawer }} />}
            title={<LessonPickerTitle />}
            selected={lessonNumber - 1}
            {...{ isDrawerOpen, toggleDrawer }}
          />
        </Box>

        <Stack component='main' gridArea='main' p={2}>
          <LessonSelectContent />
        </Stack>

        <When condition={isLargeScreen && characters.length}>
          <Stack
            component='aside'
            gridArea='aside'
            height='fit-content'
            p={1.5}
            gap={1}
            sx={{ overflowY: 'auto', top: 64, position: 'sticky' }}
          >
            <CharacterPreviews {...{ characters, tierStatuses }} />
          </Stack>
        </When>
      </Box>
    </>
  )
}
