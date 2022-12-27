import {
  Dispatch,
  SetStateAction,
  MouseEvent,
  KeyboardEvent,
  useState,
  forwardRef,
} from 'react'
import {
  Badge,
  Drawer,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Box from '@mui/material/Box'
import {
  CardSwiperWrapper,
  CardSwiperContent,
  BackButton,
  ContentContainer,
} from '../shared/basic-components'
import { Character } from '../shared/interfaces'
import {
  BACK_TO_LESSON_FROM_FLASHBACK,
  BOTTOM_NAVIGATION_FREQUENCY,
  BOTTOM_NAVIGATION_NEXT_CHARACTER,
  BOTTOM_NAVIGATION_PREVIOUS_CHARACTER,
  BOTTOM_NAVIGATION_SUPPLEMENTS,
} from '../shared/strings'
import { CHARS } from './MOCK_CHARS'
import Swiper from 'swiper'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import LearnCharCardDetails from './LearnCharCardDetails'
import { LearnAppbar } from '../toolbar/AppbarWrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  IconDefinition,
  faChartColumn,
  faChevronCircleLeft,
  faChevronLeft,
  faGraduationCap,
  faSquare,
  faSquareCaretLeft,
  faSquareCaretRight,
} from '@fortawesome/free-solid-svg-icons'
import { BottomNavigationButton } from './BottomNavigationButton'
import { getFrequencyText } from './getFrequencyText'
import useEventListener from '@use-it/event-listener'
import { useNavButtonStyling } from './useNavButtonStyling'

export default function Learn() {
  const { breakpoints, constants, spacing } = useTheme()

  const lessonDataSource = CHARS

  const [charToReturnToFromFlashback, setCharToReturnToFromFlashback] =
    useState<Character | null>(null)

  const [swiperInstance, setSwiperInstance] = useState<Swiper | null>(null) // Outside of Swiper, useSwiper() can't be used.

  const [activeIndex, setActiveIndex] = useState(0)

  const currentChar = lessonDataSource[activeIndex]

  function returnFromFlashback() {
    setCharToReturnToFromFlashback(null)
    swiperInstance!.enable()
  }

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

  function switchToSupplementsView() {}

  useEventListener('keydown', event => {
    const key = (event as unknown as KeyboardEvent).key

    if (key === 'ArrowLeft') {
      moveToPreviousCharacter()
    }

    if (key === 'ArrowRight') {
      moveToNextCharacter()
    }
  })

  const navButtonStyling = useNavButtonStyling()

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

function getTotalSupplementAmount(char: Character) {
  return char.otherUses?.length
}

// function RightIconButton

const FrequencyIcon = ({ frequency }: { frequency: number }) => {
  // const { re } = props;

  return (
    <>
      <FontAwesomeIcon icon={faChartColumn} transform='grow-10' />
      75
    </>
    // <IconButton
    //   sx={{
    //     // ...navButtonStyling,
    //     position: 'fixed',
    //     top: '50%',
    //     ml: -7.5,
    //   }}
    //   // disabled={activeIndex === lessonDataSource.length - 1}
    //   // onClick={props.onClick}
    //   {...props}
    // >
    //   {/* <FontAwesomeIcon icon={faSquareCaretRight} size='2x' forwardedRef={ref} /> */}
    // </IconButton>
  )
}
