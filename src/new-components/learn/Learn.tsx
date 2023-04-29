import { CHARS } from './MOCK_CHARS'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import LearnContent from './LearnContent'
import { LearnAppbar } from './learn-appbar/LearnAppbar'
import { LessonSwiper } from '../shared/components/LessonSwiper'
import { Box, useTheme } from '@mui/material'
import { useState } from 'react'
import { CharPicker } from './char-picker/CharPicker'

const lessonSelectMaxWidth = '1600px'

export default function Learn() {
  const lesson = CHARS
  const [toolbarHeight, setToolbarHeight] = useState(0)
  const { constants } = useTheme()

  return (
    <Box
      display='grid'
      height='100vh'
      margin='auto'
      maxWidth={lessonSelectMaxWidth}
      position='relative'
      gridTemplateRows={`${toolbarHeight}px auto`}
      sx={{
        bgcolor: 'background.paper',
        gridTemplateColumns: { xs: '1fr', md: `${constants.drawerWidth}px auto` },
        gridTemplateAreas: { xs: `"nav" "content"`, md: `"drawer nav" "drawer content"` },
      }}
    >
      <CharPicker {...{ lesson }} />

      <LearnAppbar lessonLength={CHARS.length} {...{ toolbarHeight, setToolbarHeight }} />

      <LessonSwiper style={{ gridArea: 'content', height: '100%', width: '100%' }}>
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
