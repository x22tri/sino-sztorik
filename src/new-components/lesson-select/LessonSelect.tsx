import { useState, Dispatch, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Grow from '@mui/material/Grow'
import LessonSelectCard from './LessonSelectCard'
import LessonDetails from './LessonDetails'
import { LESSONS } from '../shared/MOCK_LESSONS'
import { AssembledLesson, LessonStatuses } from '../shared/interfaces'
import { LESSON_SELECT_TITLE } from '../shared/strings'
import {
  CardSwiperWrapper,
  CardSwiperContent,
  BackButton,
  sharedSwiperProps,
  LessonSwiper,
} from '../shared/basic-components'
import { ContentContainer } from '../shared-components/ContentContainer'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useTheme } from '@mui/material'
import { TierStatusCircle } from './tier-status-circle/TierStatusCircle'
import { PreviewRow } from './preview-row/PreviewRow'
import { Display } from '../shared/utility-components'
import { scrollToTop, useSmallScreen } from '../shared/utility-functions'
import SwiperInstance, { EffectCreative } from 'swiper'

export default function LessonSelect() {
  const { constants } = useTheme()

  const hasUpcomingTier = LESSONS.find(({ tierStatuses }) =>
    tierStatuses.includes(LessonStatuses.UPCOMING)
  )?.lessonNumber

  if (!hasUpcomingTier) {
    throw new Error('Current lesson is undefined.')
  }

  const [selectedLessonNumber, setSelectedLessonNumber] = useState<
    number | null
  >(null)

  const [upcomingLessonNumber] = useState<number>(hasUpcomingTier)

  const [isLessonDetailsVisible, setIsLessonDetailsVisible] = useState(false)

  function closeLessonDetails() {
    setIsLessonDetailsVisible(false)
    setTimeout(() => {
      setSelectedLessonNumber(null)
    }, constants.animationDuration)
  }

  return (
    <Display
      if={selectedLessonNumber !== null}
      else={<PreviewRow lessons={LESSONS} {...{ setSelectedLessonNumber }} />}
    >
      {/* <Box
        maxWidth={constants.maxContentWidth}
        position='relative'
        margin='auto'
      > */}
      <BackButton onClick={closeLessonDetails} text={LESSON_SELECT_TITLE} />

      <LessonDetailsSwiper
        lessons={LESSONS}
        selectedLessonNumber={selectedLessonNumber!}
        {...{ upcomingLessonNumber }}
      />
      {/* </Box> */}
    </Display>
  )
}

function LessonDetailsSwiper({
  upcomingLessonNumber,
  lessons,
  selectedLessonNumber,
}: {
  upcomingLessonNumber: number
  lessons: AssembledLesson[]
  selectedLessonNumber: number
}) {
  // let swiperInstance: SwiperInstance | undefined

  return (
    // initialSlide is zero-indexed.
    // <CardSwiperWrapper initialSlide={selectedLessonNumber - 1}>
    //   {lessons.map(({ lessonNumber }) => (
    //     <SwiperSlide key={lessonNumber}>
    //       <CardSwiperContent>
    //         <LessonDetails
    //           isCurrentLesson={lessonNumber === upcomingLessonNumber}
    //           lesson={lessons[lessonNumber - 1]}
    //         />
    //       </CardSwiperContent>
    //     </SwiperSlide>
    //   ))}
    // </CardSwiperWrapper>
    // <Swiper
    // autoHeight
    // effect={useSmallScreen() ? 'creative' : 'slide'}
    // modules={[EffectCreative]}
    // onSlideChange={scrollToTop}
    // onSlideChangeTransitionEnd={scrollToTop}
    // // onSwiper={swiper => (swiperInstance = swiper)}
    // simulateTouch={false}
    // spaceBetween={0}
    // style={{ display: 'flex', flexDirection: 'column-reverse' }}
    // {...{ creativeEffect }}
    // {...sharedSwiperProps}
    // >
    <LessonSwiper>
      {/* <LearnAppbar lessonLength={CHARS.length} /> */}
      {lessons.map(({ lessonNumber }) => (
        <SwiperSlide key={lessonNumber}>
          <LessonDetails
            isCurrentLesson={lessonNumber === upcomingLessonNumber}
            lesson={lessons[lessonNumber - 1]}
          />
        </SwiperSlide>
      ))}
      {/* </Swiper> */}
    </LessonSwiper>
  )
}

const creativeEffect = {
  prev: {
    opacity: 0,
    translate: ['-20%', 0, -1],
  },
  next: {
    opacity: 1,
    translate: ['100%', 0, 1],
  },
}
