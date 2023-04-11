import Box from '@mui/material/Box'
import { useEffect } from 'react'
import { useTheme } from '@mui/material'
import LessonPicker from './lesson-picker/LessonPicker'
import { useSmallScreen } from '../shared/hooks/useSmallScreen'
import { LessonStatuses } from '../shared/interfaces'
import { useLessonSelect } from './logic/useLessonSelect'
import { LessonSelectAppbar } from './appbar/LessonSelectAppbar'
import { LessonPrefaceSwiper } from './lesson-preface/LessonPrefaceSwiper'
import { LessonStart } from './lesson-start/LessonStart'
import { useLargeScreen } from '../shared/hooks/useLargeScreen'
import 'swiper/css'
import { CharacterPreviews } from './lesson-start/CharacterPreviews'
import { When } from 'react-if'

// const stylesDesktop = { display: 'grid', gridTemplateColumns: '3fr 1fr', justifyItems: 'center' }
const stylesMobile = { display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between' }

export default function LessonSelect() {
  const isSmallScreen = useSmallScreen()
  const isLargeScreen = useLargeScreen()
  const { lessons, selected, select, setUpcoming } = useLessonSelect()
  const { constants, palette } = useTheme()

  useEffect(() => {
    const upcoming = lessons.find(({ tierStatuses }) => tierStatuses.includes(LessonStatuses.UPCOMING))?.lessonNumber
    setUpcoming(upcoming)
    select(upcoming)
  }, [lessons, select])

  return !selected ? null : (
    <Box
      display='flex'
      height='100vh'
      justifyContent='center'
      margin='auto'
      maxWidth={constants.lessonSelectMaxWidth}
      position='relative'
    >
      <LessonPicker />

      <Box
        marginLeft={isSmallScreen ? 0 : `${constants.drawerWidth}px`}
        width={isSmallScreen ? '100%' : `calc(100% - ${constants.drawerWidth}px)`}
      >
        <LessonSelectAppbar />

        {/* <Box
          boxSizing='border-box'
          component='main'
          position='relative'
          // {...(isLargeScreen ? stylesDesktop : stylesMobile)}
          sx={{
            height: { xs: `calc(100% - ${constants.toolbarHeightMobile})`, sm: `calc(100% - ${constants.toolbarHeight})` },
          }}
        > */}
        <Box
          sx={{
            backgroundColor: palette.background.paper,
            display: 'grid',
            gridTemplateColumns: !isLargeScreen ? '1fr' : '3fr 1fr',
            height: {
              xs: `calc(100% - ${constants.toolbarHeightMobile} - ${constants.lessonStartMobileHeight})`,
              sm: `calc(100% - ${constants.toolbarHeight} - ${constants.lessonStartMobileHeight})`,
            },
            // zIndex: 9000,
          }}
        >
          <LessonPrefaceSwiper />
          <When condition={isLargeScreen}>
            <CharacterPreviews characters={lessons[selected - 1].characters} />
          </When>
          {/* <Box>aa</Box> */}
        </Box>
        <LessonStart isLargeScreen={false} lesson={lessons[selected - 1]} />
      </Box>
      {/* </Box> */}
    </Box>
  )
}
