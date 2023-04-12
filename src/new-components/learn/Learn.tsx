import { CHARS } from './MOCK_CHARS'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import LearnContent from './LearnContent'
import { LearnAppbar } from './learn-appbar/LearnAppbar'
import { LessonSwiper } from '../shared/components/LessonSwiper'

export default function Learn() {
  const lesson = CHARS

  return (
    <LessonSwiper style={{ display: 'flex', flexDirection: 'column-reverse' }}>
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
  )
}
