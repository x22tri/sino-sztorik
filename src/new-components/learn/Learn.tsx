import { CHARS } from './MOCK_CHARS'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import LearnContent from './LearnContent'
import { LearnAppbar } from './learn-appbar/LearnAppbar'
import { LessonSwiper } from '../shared/components/LessonSwiper'
import { Box, useTheme } from '@mui/material'
import { useState } from 'react'
import { SideNav } from '../shared/components/SideNav'
import { CharPickerContent } from './char-picker/CharPickerContent'
import { useLearn } from './logic/useLearn'
import { CharPickerTitle } from './char-picker/CharPickerTitle'

const lessonSelectMaxWidth = '1600px'

export default function Learn() {
  const { lesson, select, selected } = useLearn()
  const [toolbarHeight, setToolbarHeight] = useState(0)
  const { constants, palette } = useTheme()

  const [content, setContent] = useState<'characters' | 'preface'>('characters')

  const lessonNumber = 99
  const lessonTitle = 'Lecke címe'
  const preface = 'Teszt teszt teszt'

  return (
    <Box
      display='grid'
      height='100vh'
      margin='auto'
      maxWidth={lessonSelectMaxWidth}
      position='relative'
      gridTemplateRows={`${toolbarHeight}px auto`}
      sx={{
        gridTemplateColumns: { xs: '1fr', md: `${constants.drawerWidth}px auto` },
        gridTemplateAreas: { xs: `"nav" "content"`, md: `"drawer nav" "drawer content"` },
      }}
    >
      <SideNav
        title={<CharPickerTitle {...{ content, lessonNumber, lessonTitle, setContent }} />}
        content={<CharPickerContent {...{ content }} />}
        {...{ selected }}
      />

      <LearnAppbar lessonLength={CHARS.length} {...{ toolbarHeight, setToolbarHeight }} />

      <LessonSwiper
        onActiveIndexChange={({ activeIndex }) => select(activeIndex)}
        style={{ backgroundColor: palette.background.paper, gridArea: 'content', height: '100%', width: '100%' }}
      >
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
