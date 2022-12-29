import { KeyboardEvent, useState } from 'react'
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { ContentContainer } from '../shared/basic-components'
import { Character } from '../shared/interfaces'
import { CHARS } from './MOCK_CHARS'
import Swiper from 'swiper'
import 'swiper/css'
import LearnCharCardDetails from './LearnCharCardDetails'
import { LearnAppbar } from '../toolbar/AppbarWrapper'
import useEventListener from '@use-it/event-listener'

export default function Learn() {
  const { constants } = useTheme()

  const lessonDataSource = CHARS

  const [charToReturnToFromFlashback, setCharToReturnToFromFlashback] =
    useState<Character | null>(null)

  const [activeIndex, setActiveIndex] = useState(2)

  const currentChar = lessonDataSource[activeIndex]

  function moveToPreviousCharacter() {
    if (activeIndex === 0) {
      return
    }

    setActiveIndex(prev => prev - 1)
    window.scrollTo(0, 0)
  }

  function moveToNextCharacter() {
    if (activeIndex === lessonDataSource.length - 1) {
      return
    }

    setActiveIndex(prev => prev + 1)
    window.scrollTo(0, 0)
  }

  useEventListener('keydown', event => {
    const key = (event as unknown as KeyboardEvent).key

    if (key === 'ArrowLeft') {
      moveToPreviousCharacter()
    }

    if (key === 'ArrowRight') {
      moveToNextCharacter()
    }
  })

  return (
    <>
      <LearnAppbar
        lessonLength={CHARS.length}
        isLocked={!!charToReturnToFromFlashback}
        {...{ activeIndex }}
      />
      <ContentContainer>
        <Box
          maxWidth={constants.maxContentWidth}
          height='100%'
          position='relative'
          margin='auto'
          display='flex'
          minWidth={0}
        >
          <LearnCharCardDetails
            lessonChar={currentChar}
            {...{
              charToReturnToFromFlashback,
              setCharToReturnToFromFlashback,
            }}
          />
        </Box>
      </ContentContainer>
    </>
  )
}
