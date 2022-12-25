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

  function openFrequencyPopup(frequency: number | undefined) {
    console.log(getFrequencyText(frequency))
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

  const navButtonStyling = useNavButtonStyling()

  return (
    <>
      <LearnAppbar
        lessonLength={CHARS.length}
        isLocked={!!charToReturnToFromFlashback}
        {...{ activeIndex }}
      />
      <ContentContainer>
        {useMediaQuery(breakpoints.down('md')) ? null : (
          <Box
            display='flex'
            alignItems='center'
            // height='calc(100vh - 102px)'
            zIndex={9000}
            position='relative'
          >
            <Tooltip
              disableTouchListener
              leaveTouchDelay={3000}
              enterTouchDelay={50}
              title={BOTTOM_NAVIGATION_PREVIOUS_CHARACTER}
              // placement='top-end'
            >
              <Box component='span' position='relative'>
                <IconButton
                  sx={{
                    ...navButtonStyling,
                    position: 'fixed',
                    top: '50%',
                    // ml: -7.5,
                  }}
                  disabled={activeIndex === 0}
                  onClick={moveToPreviousCharacter}
                >
                  <FontAwesomeIcon icon={faSquareCaretLeft} size='2x' />
                </IconButton>
              </Box>
            </Tooltip>
          </Box>
        )}

        <Box margin='auto' display='flex'>
          <Box
            maxWidth={constants.maxContentWidth}
            height='100%'
            position='relative'
          >
            {/* <Box sx={{ minHeight: constants.backButtonStripHeight }}>
            {charToReturnToFromFlashback !== null ? (
              <BackButton
                onClick={() => returnFromFlashback()}
                text={`${BACK_TO_LESSON_FROM_FLASHBACK} 
              (${charToReturnToFromFlashback!.charChinese})
              `}
              />
            ) : null}
          </Box> */}

            {/* <LearnCharCardSwiper
            chars={lessonDataSource}
            {...{
              charToReturnToFromFlashback,
              setCharToReturnToFromFlashback,
              swiperInstance,
              setSwiperInstance,
              setActiveIndex,
            }}
          /> */}
            {/* {lessonDataSource.map(char => ( */}
            <LearnCharCardDetails
              lessonChar={currentChar}
              {...{
                charToReturnToFromFlashback,
                setCharToReturnToFromFlashback,
              }}
            />
            {/* ))} */}

            <Drawer
              anchor='bottom'
              variant='permanent'
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                mx: 'auto',
                pt: 7, // Needed so that the drawer doesn't cover the bottom of the content.
                '.MuiPaper-root': {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mx: 'auto',
                  borderTop: '2px solid rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              <Box
                maxWidth='lg'
                display='flex'
                width='100%'
                justifyContent='space-between'
                alignItems='center'
                sx={{ px: 2 }}
              >
                <BottomNavigationButton
                  disabled={activeIndex === 0}
                  icon={faSquareCaretLeft}
                  onClick={moveToPreviousCharacter}
                  tooltipText={BOTTOM_NAVIGATION_PREVIOUS_CHARACTER}
                />

                <BottomNavigationButton
                  bottomText={String(currentChar.frequency)}
                  icon={faChartColumn}
                  onClick={() => openFrequencyPopup(currentChar.frequency)}
                  tooltipText={BOTTOM_NAVIGATION_FREQUENCY}
                />

                <BottomNavigationButton
                  badgeContent={getTotalSupplementAmount(currentChar)}
                  icon={faGraduationCap}
                  onClick={switchToSupplementsView}
                  tooltipText={BOTTOM_NAVIGATION_SUPPLEMENTS}
                />

                <BottomNavigationButton
                  disabled={activeIndex === lessonDataSource.length - 1}
                  icon={faSquareCaretRight}
                  onClick={moveToNextCharacter}
                  tooltipText={BOTTOM_NAVIGATION_NEXT_CHARACTER}
                />
              </Box>
            </Drawer>
          </Box>
        </Box>

        {useMediaQuery(breakpoints.down('md')) ? null : (
          // <Box
          //   display='flex'
          //   alignItems='center'
          //   // height='calc(100vh - 102px)'
          // >
          //   <Tooltip
          //     disableTouchListener
          //     leaveTouchDelay={3000}
          //     enterTouchDelay={50}
          //     title={BOTTOM_NAVIGATION_NEXT_CHARACTER}
          //   >
          //     <Box component='div' width='fit-content'>
          //       <IconButton
          //         sx={{
          //           ...navButtonStyling,
          //           position: 'fixed',
          //           top: '50%',
          //           ml: -7.5,
          //         }}
          //         disabled={activeIndex === lessonDataSource.length - 1}
          //         onClick={moveToNextCharacter}
          //       >
          //         <FontAwesomeIcon icon={faSquareCaretRight} size='2x' />
          //       </IconButton>
          //     </Box>
          //     {/* <FrequencyIcon onClick={moveToNextCharacter} /> */}
          //   </Tooltip>
          // </Box>
          <></>
        )}
      </ContentContainer>
    </>
  )
}

function getTotalSupplementAmount(char: Character) {
  return char.otherUses?.length
}

// function RightIconButton

const FrequencyIcon = forwardRef((props: { onClick: () => void }, ref) => {
  // const { re } = props;

  return (
    // <FontAwesomeIcon
    //   {...props}
    //   forwardedRef={ref}
    //   icon={faChartColumn}
    //   transform='grow-10'
    // />
    <IconButton
      sx={{
        // ...navButtonStyling,
        position: 'fixed',
        top: '50%',
        ml: -7.5,
      }}
      // disabled={activeIndex === lessonDataSource.length - 1}
      // onClick={props.onClick}
      {...props}
    >
      <FontAwesomeIcon icon={faSquareCaretRight} size='2x' forwardedRef={ref} />
    </IconButton>
  )
})
