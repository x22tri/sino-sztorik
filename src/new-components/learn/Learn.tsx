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
  const [content, setContent] = useState<'characters' | 'preface'>('characters')
  const { selectCharIndex, selectedCharIndex } = useStore('learn')
  const { constants, palette } = useTheme()

  return !lesson.characters.length ? null : (
    <Box
      // display='grid'
      // height='100vh'
      // margin='auto'
      // maxWidth={constants.maxContentWidth}
      // position='relative'
      // gridTemplateRows={`${toolbarHeight}px auto`}
      // sx={{
      //   gridTemplateColumns: { xs: '1fr', md: `${constants.drawerWidth}px auto`, lg: `${constants.drawerWidth}px 3fr 1fr` },
      //   gridTemplateAreas: {
      //     xs: `"nav" "content"`,
      //     md: `"drawer nav" "drawer content"`,
      //     lg: `"drawer nav nav" "drawer content content"`,
      //   },
      // }}
      display='grid'
      position='relative'
      margin='auto'
      maxWidth={constants.maxContentWidth}
      sx={{
        gridTemplateColumns: { xs: 'auto', md: `${constants.drawerWidth}px auto` },
        gridTemplateAreas: `"drawer main"`,
      }}
    >
      <SideNav
        title={<CharPickerTitle {...{ content, setContent }} />}
        content={<CharPickerContent {...{ content }} />}
        selected={selectedCharIndex}
      />

      <SwiperWrapper
        onActiveIndexChange={({ activeIndex }) => selectCharIndex(activeIndex)}
        style={{ gridArea: 'main', width: '100%' }}
      >
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
