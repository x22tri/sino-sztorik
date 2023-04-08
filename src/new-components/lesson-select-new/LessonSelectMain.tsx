import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'
import { useLargeScreen } from '../shared/hooks/useLargeScreen'
import { LessonDetailsSwiper } from '../lesson-select/LessonDetailsSwiper'
import { useLessonSelect } from '../lesson-select/logic/useLessonSelect'
import { LessonStart } from './lesson-start/LessonStart'

export function LessonSelectMain() {
  const isLargeScreen = useLargeScreen()
  const { lessons, selected } = useLessonSelect()
  const { constants } = useTheme()

  const stylesDesktop = { display: 'grid', gridTemplateColumns: '3fr 1fr', justifyItems: 'center' }
  const stylesMobile = { display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between' }

  return (
    <Box component='main' height={`calc(100% - ${constants.toolbarHeight})`} {...(isLargeScreen ? stylesDesktop : stylesMobile)}>
      <LessonDetailsSwiper />
      <LessonStart {...{ isLargeScreen }} lesson={lessons[selected! - 1]} />
    </Box>
  )
}
