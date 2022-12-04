import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useState, MouseEvent } from 'react'
import LessonCard from './LessonCard'
import LessonDetails from './LessonDetails'
import { LESSONS } from '../shared/MOCK_LESSONS'
import { Grow, useTheme } from '@mui/material'
import { LessonStatuses, SideNavigationItem } from '../shared/interfaces'
import { LESSON_SELECT_TITLE } from '../shared/strings'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import WestIcon from '@mui/icons-material/West'
import { LightenOnHoverButton } from '../shared/basic-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const maxContentWidth = '48rem'
const lessonDetailsTimeout = 150
const fadeOverlayZIndex = 9000

export default function LessonSelect() {
  const hasUpcomingTier = LESSONS.find(({ tierStatuses }) =>
    tierStatuses.includes(LessonStatuses.UPCOMING)
  )?.lessonNumber

  if (!hasUpcomingTier) {
    throw new Error('Current lesson is undefined.')
  }

  const [selectedNavigationItem, setSelectedNavigationItem] =
    useState<SideNavigationItem>(LESSON_SELECT_TITLE)

  const [selectedLessonNumber, setSelectedLessonNumber] = useState<
    number | null
  >(null)

  const [currentLessonNumber] = useState<number>(hasUpcomingTier)

  const [isLessonDetailsVisible, setIsLessonDetailsVisible] = useState(false)

  function closeLessonDetails() {
    setIsLessonDetailsVisible(false)
    setTimeout(() => {
      setSelectedLessonNumber(null)
    }, lessonDetailsTimeout)
  }

  return (
    <Container component='main' maxWidth='lg' sx={{ pt: '2em', px: 0 }}>
      {selectedLessonNumber === null ? (
        <Grid
          container
          sx={{ height: 'fit-content', maxWidth: maxContentWidth }}
        >
          {LESSONS.map(({ lessonNumber, title, tierStatuses }) => (
            <LessonCard
              key={lessonNumber}
              {...{
                lessonNumber,
                title,
                tierStatuses,
                setSelectedLessonNumber,
                currentLessonNumber,
                setIsLessonDetailsVisible,
              }}
            />
          ))}
        </Grid>
      ) : null}

      <Grow in={isLessonDetailsVisible} timeout={lessonDetailsTimeout}>
        {selectedLessonNumber !== null ? (
          <Box maxWidth={maxContentWidth} position='relative'>
            <BackToLessonSelectButton onClick={closeLessonDetails} />

            <div>
              <FadeOverlay />

              <Swiper
                spaceBetween={10}
                slidesPerView={1.2}
                centeredSlides={true}
                initialSlide={selectedLessonNumber - 1}
                onTouchStart={swiper => swiper.setGrabCursor()}
                onTouchEnd={swiper => swiper.unsetGrabCursor()}
              >
                {LESSONS.map(({ lessonNumber }) => (
                  <SwiperSlide key={lessonNumber}>
                    <LessonDetails
                      lesson={LESSONS[lessonNumber - 1]}
                      isCurrentLesson={lessonNumber === currentLessonNumber}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Box>
        ) : (
          <></>
        )}
      </Grow>
    </Container>
  )
}

function FadeOverlay() {
  const { palette } = useTheme()

  return (
    <Box
      position='absolute'
      width='100%'
      height='100%'
      zIndex={fadeOverlayZIndex}
      sx={{
        pointerEvents: 'none',
        background: `linear-gradient(to right, ${palette.background.default}ff 0%, ${palette.background.default}00 10%, ${palette.background.default}00 90%, ${palette.background.default}ff 100%)`,
      }}
    />
  )
}

function BackToLessonSelectButton({
  onClick,
}: {
  onClick: (event: MouseEvent<HTMLElement>) => void
}) {
  return (
    <LightenOnHoverButton
      {...{ onClick }}
      startIcon={<WestIcon fontSize='small' />}
      sx={{ ml: 1.5 }}
    >
      <Typography component='span' textTransform='none'>
        {LESSON_SELECT_TITLE}
      </Typography>
    </LightenOnHoverButton>
  )
}
