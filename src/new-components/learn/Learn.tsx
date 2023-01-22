import { CHARS } from './MOCK_CHARS'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import LearnContent from './LearnContent'
import { LearnAppbar } from './learn-appbar/LearnAppbar'
import SwiperInstance from 'swiper'
import { useKeydown } from '../shared/utility-functions'
import { LessonSwiper } from '../shared/basic-components'

export default function Learn() {
  const lesson = CHARS

  // let swiperInstance: SwiperInstance | undefined

  // useKeydown([
  //   { on: 'ArrowLeft', do: () => swiperInstance?.slidePrev() },
  //   { on: 'ArrowRight', do: () => swiperInstance?.slideNext() },
  // ])

  return (
    // <>
    <LessonSwiper>
      <LearnAppbar lessonLength={CHARS.length} />
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
    // </>
  )
}
