import { CHARS } from './MOCK_CHARS'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import LearnContent from './LearnContent'
import { LearnAppbar } from './learn-appbar/LearnAppbar'
import { useEffect, useState } from 'react'
import { CharPickerContent } from './char-picker/CharPickerContent'
import { CharPickerTitle } from './char-picker/CharPickerTitle'
import { useStore } from '../shared/logic/useStore'
import { useLoaderData } from 'react-router-dom'
import { AssembledLesson } from '../shared/interfaces'
import { SwiperGrid } from '../shared/components/SwiperGrid'

export default function Learn() {
  const lesson = useLoaderData() as AssembledLesson
  const [toolbarHeight, setToolbarHeight] = useState(0)
  const [contentType, setContentType] = useState<'characters' | 'preface'>('characters')
  const { selectCharIndex, selectedCharIndex } = useStore('learn')
  const { swiperInstance } = useStore('swiper')

  useEffect(() => {
    setTimeout(() => {
      if (swiperInstance?.params) {
        swiperInstance.updateAutoHeight()
      }
    }, 0)
  }, [swiperInstance])

  return !lesson.characters.length ? null : (
    <SwiperGrid
      keyboardControls={[
        { on: 'ArrowLeft', do: () => swiperInstance?.slidePrev() },
        { on: 'ArrowRight', do: () => swiperInstance?.slideNext() },
      ]}
      sideNav={{
        title: <CharPickerTitle {...{ contentType, setContentType }} />,
        content: <CharPickerContent {...{ contentType }} />,
        selected: selectedCharIndex,
      }}
      swiperProps={{ onActiveIndexChange: ({ activeIndex }) => selectCharIndex(activeIndex) }}
    >
      <LearnAppbar lessonLength={CHARS.length} {...{ toolbarHeight, setToolbarHeight }} />

      {lesson.characters.map((char, index) => (
        <SwiperSlide key={index}>
          <LearnContent lessonChar={char} {...{ index, toolbarHeight }} />
        </SwiperSlide>
      ))}
    </SwiperGrid>
  )
}
