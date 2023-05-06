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
import { CharPickerTitle } from './char-picker/CharPickerTitle'
import { useStore } from '../shared/logic/useStore'

const lessonSelectMaxWidth = '1600px'

export default function Learn() {
  const [toolbarHeight, setToolbarHeight] = useState(0)
  const [content, setContent] = useState<'characters' | 'preface'>('characters')
  const { currentLesson, selectCharIndex, selectedCharIndex } = useStore('learn')
  const { constants, palette } = useTheme()

  return !currentLesson?.characters.length ? null : (
    <Box
      display='grid'
      height='100vh'
      margin='auto'
      maxWidth={lessonSelectMaxWidth}
      position='relative'
      gridTemplateRows={`${toolbarHeight}px auto`}
      sx={{
        gridTemplateColumns: { xs: '1fr', md: `${constants.drawerWidth}px auto`, lg: `${constants.drawerWidth}px 3fr 1fr` },
        gridTemplateAreas: {
          xs: `"nav" "content"`,
          md: `"drawer nav" "drawer content"`,
          lg: `"drawer nav nav" "drawer content content"`,
        },
      }}
    >
      <SideNav
        title={<CharPickerTitle {...{ content, setContent }} />}
        content={<CharPickerContent {...{ content }} />}
        selected={selectedCharIndex}
      />

      <LearnAppbar lessonLength={CHARS.length} {...{ toolbarHeight, setToolbarHeight }} />

      <LessonSwiper
        onActiveIndexChange={({ activeIndex }) => selectCharIndex(activeIndex)}
        style={{ backgroundColor: palette.background.paper, gridArea: 'content', height: '100%', width: '100%' }}
      >
        {currentLesson?.characters.map((char, index) => (
          <SwiperSlide key={index}>
            <LearnContent
              lessonChar={char}
              prevChar={currentLesson.characters[index - 1]?.charChinese ?? null}
              nextChar={currentLesson.characters[index + 1]?.charChinese ?? null}
              {...{ index }}
            />
          </SwiperSlide>
        ))}
      </LessonSwiper>
    </Box>
  )
}
