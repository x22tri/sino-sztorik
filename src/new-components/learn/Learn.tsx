import { CHARS } from './MOCK_CHARS'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import LearnContent from './LearnContent'
import { LearnAppbar } from './learn-appbar/LearnAppbar'
import { LessonSwiper } from '../shared/components/LessonSwiper'
import { Box, useTheme } from '@mui/material'
import { useState } from 'react'
import { useSmallScreen } from '../shared/hooks/useSmallScreen'
import { CharPicker } from './char-picker/CharPicker'

const lessonSelectMaxWidth = '1600px'

export default function Learn() {
  const lesson = CHARS
  const [toolbarHeight, setToolbarHeight] = useState(0)
  const { constants } = useTheme()
  const isSmallScreen = useSmallScreen()

  return (
    <Box
      display='grid'
      height='100vh'
      margin='auto'
      maxWidth={lessonSelectMaxWidth}
      gridTemplateRows={`${toolbarHeight}px auto`}
      sx={{
        gridTemplateColumns: { xs: '1fr', md: `${constants.drawerWidth}px 1fr` },
        gridTemplateAreas: {
          xs: `"nav" "content`,
          md: `"nav nav" "drawer content"`,
        },
      }}
      // gridTemplateColumns='1fr'
      // gridTemplateAreas={`
      // "nav"
      // "content"`}
      // sx={{
      //   gridTemplateColumns: { xs: 'repeat(4, 1fr)', md: `${constants.drawerWidth}px repeat(4, 1fr)` },
      //   gridTemplateAreas: {
      //     xs: `"nav nav nav nav" "main main main main" "start start start start"`,
      //     md: `"drawer nav nav nav nav" "drawer main main main main" "drawer start start start start"`,
      //     lg: `"drawer nav nav nav nav" "drawer main main main chars" "drawer start start start start"`,
      //   },
      // }}
    >
      <LearnAppbar lessonLength={CHARS.length} {...{ toolbarHeight, setToolbarHeight }} />

      <CharPicker {...{ lesson }} />

      <LessonSwiper style={{ width: '100%', gridArea: 'content', marginBottom: isSmallScreen ? 0 : '16px' }}>
        {lesson.map((char, index) => (
          <SwiperSlide key={index}>
            <LearnContent
              lessonChar={char}
              prevChar={lesson[index - 1]?.charChinese ?? null}
              nextChar={lesson[index + 1]?.charChinese ?? null}
              {...{ index }}
            />
          </SwiperSlide>
        ))}
      </LessonSwiper>
    </Box>
  )
}
