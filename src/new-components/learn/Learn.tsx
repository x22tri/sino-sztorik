import { CHARS } from './MOCK_CHARS'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import LearnContent from './LearnContent'
import { LearnAppbar } from './learn-appbar/LearnAppbar'
import { SwiperWrapper } from '../shared/components/SwiperWrapper'
import { Box, useTheme } from '@mui/material'
import { useState } from 'react'
import { SideNav } from '../shared/components/SideNav'
import { CharPickerContent } from './char-picker/CharPickerContent'
import { CharPickerTitle } from './char-picker/CharPickerTitle'
import { useStore } from '../shared/logic/useStore'
import { useLoaderData } from 'react-router-dom'
import { AssembledLesson } from '../shared/interfaces'

export default function Learn() {
  const lesson = useLoaderData() as AssembledLesson
  const [toolbarHeight, setToolbarHeight] = useState(0)
  const [contentType, setContentType] = useState<'characters' | 'preface'>('characters')
  const { selectCharIndex, selectedCharIndex } = useStore('learn')
  const { constants } = useTheme()

  return !lesson.characters.length ? null : (
    <Box
      display='grid'
      position='relative'
      margin='auto'
      maxWidth={constants.maxContentWidth}
      sx={{ gridTemplate: { xs: `"main" / auto`, md: `"drawer main" / ${constants.drawerWidth}px auto` } }}
    >
      <SideNav
        title={<CharPickerTitle {...{ contentType, setContentType }} />}
        content={<CharPickerContent {...{ contentType }} />}
        selected={selectedCharIndex}
      />

      <SwiperWrapper onActiveIndexChange={({ activeIndex }) => selectCharIndex(activeIndex)}>
        <LearnAppbar lessonLength={CHARS.length} {...{ toolbarHeight, setToolbarHeight }} />

        {lesson.characters.map((char, index) => (
          <SwiperSlide key={index}>
            <LearnContent
              lessonChar={char}
              prevChar={lesson.characters[index - 1]?.charChinese ?? null}
              nextChar={lesson.characters[index + 1]?.charChinese ?? null}
              {...{ index, toolbarHeight }}
            />
          </SwiperSlide>
        ))}
      </SwiperWrapper>
    </Box>
  )
}
